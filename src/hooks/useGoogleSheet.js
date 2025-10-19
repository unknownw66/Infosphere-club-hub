import { useQueries } from '@tanstack/react-query';
import { fetchAndParseSheet } from '../services/googleSheetsAPI';
import { useMemo } from 'react';

// --- Transformation Functions ---

// This is the SINGLE, CORRECT version of the function.
// It can handle columns from BOTH the master event sheet and the club-specific sheets.
function transformEvent(item, index, defaultClubId) {
  const clubId = item.category?.toLowerCase() || item.Sport_Type?.toLowerCase() || item.Event_Type?.toLowerCase() || defaultClubId;
  
  return {
    Type: 'Event',
    ID: item.event_id || item.File_Id || `evt-${index}`,
    Name: item.title || item.Event_Name,
    Description: item.description || item.Description,
    Date: item.start || item.Event_Date,
    PhotoURL: item.poster_url || item.File_URL || item.URL,
    Venue: item.venue || item.Venue,
    ClubID: clubId,
  };
}

// Placeholder for Member data transformation
function transformMember(item, index, defaultClubId) {
  return {
    Type: 'Member',
    ID: item.File_Id || `mem-${item.MemberName}-${index}`,
    Name: item.MemberName || 'Unknown Member',
    USN: item.USN,
    ClubID: defaultClubId,
    PhotoURL: item.File_URL || item.URL,
  };
}

// Placeholder for Achievement data transformation
function transformAchievement(item, index, defaultClubId) {
  return {
    Type: 'Achievement',
    ID: `ach-${item.AchievementTitle}-${index}`,
    Name: item.AchievementTitle || 'Unnamed Achievement',
    Description: item.Description,
    ClubID: defaultClubId,
    PhotoURL: item.File_URL || item.URL,
  };
}

// Placeholder for Project data transformation
function transformProject(item, index) {
  return {
    Type: 'Project',
    ID: `proj-${item.ProjectName}-${index}`,
    Name: item.ProjectName || 'Unnamed Project',
    Description: item.Project_Abstract,
    ClubID: 'technical',
    PhotoURL: item.File_URL || item.URL,
  };
}


// --- Configuration for all data sources ---
const DATA_SOURCES = [
  { key: 'masterEvents', url: import.meta.env.VITE_EVENT_URL, transform: (item, index) => transformEvent(item, index, 'general') },
  { key: 'culturalEvents', url: import.meta.env.VITE_CULTURAL_EVENT_URL, transform: (item, index) => transformEvent(item, index, 'cultural') },
  { key: 'sportsEvents', url: import.meta.env.VITE_SPORTS_EVENT_URL, transform: (item, index) => transformEvent(item, index, 'sports') },
  { key: 'technicalEvents', url: import.meta.env.VITE_TECHNICAL_EVENT_URL, transform: (item, index) => transformEvent(item, index, 'technical') },
  { key: 'culturalTeam', url: import.meta.env.VITE_CULTURAL_TEAM_URL, transform: (item, index) => transformMember(item, index, 'cultural') },
  { key: 'sportsTeam', url: import.meta.env.VITE_SPORTS_TEAM_URL, transform: (item, index) => transformMember(item, index, 'sports') },
  { key: 'technicalTeam', url: import.meta.env.VITE_TECHNICAL_TEAM_URL, transform: (item, index) => transformMember(item, index, 'technical') },
  { key: 'culturalAchievements', url: import.meta.env.VITE_CULTURAL_ACHIEVEMENT_URL, transform: (item, index) => transformAchievement(item, index, 'cultural') },
  { key: 'sportsAchievements', url: import.meta.env.VITE_SPORTS_ACHIEVEMENT_URL, transform: (item, index) => transformAchievement(item, index, 'sports') },
  { key: 'technicalAchievements', url: import.meta.env.VITE_TECHNICAL_ACHIEVEMENT_URL, transform: (item, index) => transformAchievement(item, index, 'technical') },
  { key: 'technicalProjects', url: import.meta.env.VITE_TECHNICAL_PROJECT_URL, transform: (item, index) => transformProject(item, index) },
];


const useGoogleSheet = () => {
  const queryResults = useQueries({
    queries: DATA_SOURCES.map(source => ({
      queryKey: ['sheet', source.key],
      queryFn: () => fetchAndParseSheet(source.url),
      enabled: !!source.url,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    })),
  });

  const isLoading = queryResults.some(query => query.isLoading);
  const error = queryResults.find(query => query.error)?.error;

  const allData = useMemo(() => {
    if (isLoading || error) {
      return undefined;
    }

    let combinedData = [];
    queryResults.forEach((query, i) => {
      if (query.data) {
        const { transform } = DATA_SOURCES[i];
        const validRows = query.data.filter(item => Object.values(item).some(val => val && val.trim() !== ''));
        const transformedData = validRows.map((item, index) => transform(item, index));
        combinedData = [...combinedData, ...transformedData];
      }
    });

    const staticClubs = [
        { ID: 'technical', Name: 'Technical Club', Category: 'Technical', Type: 'Club', Description: 'Events and projects related to technology.', LogoURL: '/images/technical-club.webp' },
        { ID: 'sports', Name: 'Sports Club', Category: 'Sports', Type: 'Club', Description: 'All about sports, matches, and tournaments.', LogoURL: '/images/sports-club.webp' },
        { ID: 'cultural', Name: 'Cultural Club', Category: 'Cultural', Type: 'Club', Description: 'Celebrating arts, music, and cultural events.', LogoURL: '/images/cultural-club.webp' },
    ];

    return [...combinedData, ...staticClubs];

  }, [queryResults, isLoading, error]);

  return { allData, isLoading, error };
};

export default useGoogleSheet;

