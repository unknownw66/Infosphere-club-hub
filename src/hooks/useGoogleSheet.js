// import { useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchSheetData } from '../services/googleSheetsAPI';

// // The URL is retrieved from the .env file
// const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

// /**
//  * Custom hook to fetch and process data from the main Google Sheet.
//  * It uses React Query for robust data fetching, caching, and state management.
//  * The raw data is then memoized and organized into specific categories based on the 'Type' column.
//  *
//  * @returns {Object} An object containing:
//  * - isLoading, isError, error: Booleans and error object from React Query.
//  * - clubs, members, coordinators, events, announcements: Memoized arrays of data for each type.
//  */
// export function useGoogleSheet() {
//   const {
//     data: rawData = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['googleSheetData', sheetUrl],
//     queryFn: () => fetchSheetData(sheetUrl),
//     // This query is only enabled if the sheetUrl is present.
//     enabled: !!sheetUrl,
//   });

//   // useMemo ensures that we only re-process the data when the rawData from useQuery changes.
//   // This is a crucial performance optimization.
//   const processedData = useMemo(() => {
//     const dataByType = {
//       clubs: [],
//       members: [],
//       coordinators: [],
//       events: [],
//       announcements: [],
//     };

//     if (rawData && rawData.length > 0) {
//       for (const row of rawData) {
//         // Normalize the 'Type' field for consistent matching
//         const type = (row.Type || '').trim().toLowerCase();
//         switch (type) {
//           case 'club':
//             dataByType.clubs.push(row);
//             break;
//           case 'member':
//             dataByType.members.push(row);
//             break;
//           case 'coordinator':
//             dataByType.coordinators.push(row);
//             break;
//           case 'event':
//             dataByType.events.push(row);
//             break;
//           case 'announcement':
//             dataByType.announcements.push(row);
//             break;
//           default:
//             // You can log unknown types for debugging your Google Sheet
//             // console.warn(`Unknown data type found in sheet: "${row.Type}"`);
//             break;
//         }
//       }
//     }

//     return dataByType;
//   }, [rawData]);

//   return {
//     isLoading,
//     isError,
//     error,
//     ...processedData,
//   };
// }

import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchAndParseSheet } from '../services/googleSheetsAPI';

// --- Configuration for all data sources ---
// We map each environment variable to a data type.
const dataSources = [
  // Clubs (assuming each team URL also defines a club)
  { queryKey: 'culturalClubs', url: import.meta.env.VITE_CULTURAL_TEAM_URL, type: 'Club', category: 'Cultural' },
  { queryKey: 'sportsClubs', url: import.meta.env.VITE_SPORTS_TEAM_URL, type: 'Club', category: 'Sports' },
  { queryKey: 'technicalClubs', url: import.meta.env.VITE_TECHNICAL_TEAM_URL, type: 'Club', category: 'Technical' },

  // Members
  { queryKey: 'culturalMembers', url: import.meta.env.VITE_CULTURAL_TEAM_URL, type: 'Member' },
  { queryKey: 'sportsMembers', url: import.meta.env.VITE_SPORTS_TEAM_URL, type: 'Member' },
  { queryKey: 'technicalMembers', url: import.meta.env.VITE_TECHNICAL_TEAM_URL, type: 'Member' },

  // Events
  { queryKey: 'generalEvents', url: import.meta.env.VITE_EVENT_URL, type: 'Event' },
  { queryKey: 'culturalEvents', url: import.meta.env.VITE_CULTURAL_EVENT_URL, type: 'Event' },
  { queryKey: 'sportsEvents', url: import.meta.env.VITE_SPORTS_EVENT_URL, type: 'Event' },
  { queryKey: 'technicalEvents', url: import.meta.env.VITE_TECHNICAL_EVENT_URL, type: 'Event' },

  // Achievements/Announcements (mapped to Announcement type)
  { queryKey: 'culturalAchievements', url: import.meta.env.VITE_CULTURAL_ACHIEVEMENT_URL, type: 'Announcement' },
  { queryKey: 'sportsAchievements', url: import.meta.env.VITE_SPORTS_ACHIEVEMENT_URL, type: 'Announcement' },
  { queryKey: 'technicalAchievements', url: import.meta.env.VITE_TECHNICAL_ACHIEVEMENT_URL, type: 'Announcement' },
  
  // You can add Coordinators, Projects etc. here in the same way
  // { queryKey: 'technicalProjects', url: import.meta.env.VITE_TECHNICAL_PROJECT_URL, type: 'Project' },
].filter(source => source.url); // Filter out any undefined URLs


/**
 * A custom hook to fetch and aggregate data from multiple Google Sheet sources.
 * It uses `useQueries` to fetch all sources in parallel.
 * It manually adds a 'Type' to each record based on its source.
 */
const useGoogleSheet = () => {
  const queryResults = useQueries({
    queries: dataSources.map(({ queryKey, url }) => {
      return {
        queryKey: [queryKey],
        queryFn: () => fetchAndParseSheet(url),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000,
      };
    }),
  });

  // Check the overall loading and error status
  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);
  const error = queryResults.find(query => query.isError)?.error;

  // useMemo will prevent this complex data processing on every re-render
  const allData = useMemo(() => {
    if (isLoading || isError) {
      return [];
    }

    const aggregatedData = [];
    
    queryResults.forEach((query, index) => {
      if (query.isSuccess && Array.isArray(query.data)) {
        const sourceType = dataSources[index].type;
        const sourceCategory = dataSources[index].category;

        const processedData = query.data.map(row => ({
          ...row,
          // IMPORTANT: Manually add the Type and Category to each row
          Type: sourceType,
          // For clubs, we infer category from the source. This is a simplification.
          // A better backend would provide this in the data.
          ...(sourceType === 'Club' && { Category: sourceCategory }),
          // Ensure a unique ID if IDs might overlap between sheets
          ID: `${sourceType.toLowerCase()}-${row.ID || index}-${Math.random()}` 
        }));

        aggregatedData.push(...processedData);
      }
    });

    // A simple de-duplication step (can be improved if IDs are more reliable)
    const uniqueData = Array.from(new Map(aggregatedData.map(item => [item.ID, item])).values());
    
    // Create club entries from team data if they don't exist
    const clubs = new Map();
    uniqueData.forEach(item => {
        if(item.Type === 'Club') {
            const clubId = item.ClubID || item.Name; // Use ClubID or Name
            if(!clubs.has(clubId)) {
                clubs.set(clubId, {
                    Type: 'Club',
                    ID: clubId,
                    Name: item.Name,
                    Description: item.Description || `${item.Category} club focused on various activities.`,
                    Category: item.Category,
                    LogoURL: item.LogoURL
                });
            }
        }
    });

    return [...clubs.values(), ...uniqueData.filter(item => item.Type !== 'Club')];


  }, [queryResults, isLoading, isError]);

  return { allData, isLoading, error: isError ? error : null };
};

export default useGoogleSheet;

