import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSheetData } from '../services/googleSheetsAPI';

// The URL is retrieved from the .env file
const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

/**
 * Custom hook to fetch and process data from the main Google Sheet.
 * It uses React Query for robust data fetching, caching, and state management.
 * The raw data is then memoized and organized into specific categories based on the 'Type' column.
 *
 * @returns {Object} An object containing:
 * - isLoading, isError, error: Booleans and error object from React Query.
 * - clubs, members, coordinators, events, announcements: Memoized arrays of data for each type.
 */
export function useGoogleSheet() {
  const {
    data: rawData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['googleSheetData', sheetUrl],
    queryFn: () => fetchSheetData(sheetUrl),
    // This query is only enabled if the sheetUrl is present.
    enabled: !!sheetUrl,
  });

  // useMemo ensures that we only re-process the data when the rawData from useQuery changes.
  // This is a crucial performance optimization.
  const processedData = useMemo(() => {
    const dataByType = {
      clubs: [],
      members: [],
      coordinators: [],
      events: [],
      announcements: [],
    };

    if (rawData && rawData.length > 0) {
      for (const row of rawData) {
        // Normalize the 'Type' field for consistent matching
        const type = (row.Type || '').trim().toLowerCase();
        switch (type) {
          case 'club':
            dataByType.clubs.push(row);
            break;
          case 'member':
            dataByType.members.push(row);
            break;
          case 'coordinator':
            dataByType.coordinators.push(row);
            break;
          case 'event':
            dataByType.events.push(row);
            break;
          case 'announcement':
            dataByType.announcements.push(row);
            break;
          default:
            // You can log unknown types for debugging your Google Sheet
            // console.warn(`Unknown data type found in sheet: "${row.Type}"`);
            break;
        }
      }
    }

    return dataByType;
  }, [rawData]);

  return {
    isLoading,
    isError,
    error,
    ...processedData,
  };
}
