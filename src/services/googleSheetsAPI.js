// import Papa from 'papaparse';

// /**
//  * Fetches and parses CSV data from a given Google Sheet URL.
//  * @param {string} sheetUrl - The public URL of the Google Sheet, published as a CSV.
//  * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the rows.
//  */
// export const fetchSheetData = async (sheetUrl) => {
//   if (!sheetUrl) {
//     throw new Error("Google Sheet URL is not provided. Please check your .env file.");
//   }

//   return new Promise((resolve, reject) => {
//     Papa.parse(sheetUrl, {
//       download: true,
//       header: true,
//       skipEmptyLines: true,
//       complete: (results) => {
//         if (results.errors.length) {
//           console.error("PapaParse Errors:", results.errors);
//           reject(new Error("Failed to parse the Google Sheet CSV."));
//         } else {
//           // Filter out rows that are completely empty or lack a 'Type'
//           const cleanData = results.data.filter(row => row.Type && Object.values(row).some(val => val.trim() !== ''));
//           resolve(cleanData);
//         }
//       },
//       error: (error) => {
//         console.error("Network or PapaParse Error:", error);
//         reject(new Error("Failed to fetch or download the Google Sheet data."));
//       },
//     });
//   });
// };


import Papa from 'papaparse';

/**
 * Fetches and parses a single CSV file from a given URL.
 * @param {string} csvUrl - The public URL of the Google Sheet CSV.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the rows.
 */
export const fetchAndParseSheet = (csvUrl) => {
  if (!csvUrl) {
    // Return a resolved promise with an empty array if URL is missing
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error(`CSV parsing error for URL ${csvUrl}:`, results.errors);
          // Resolve with empty array on parsing error to avoid breaking all data
          resolve([]); 
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        console.error(`Failed to fetch CSV from ${csvUrl}:`, error);
        // Reject the promise on network error
        reject(new Error(`Failed to fetch CSV: ${error.message}`));
      },
    });
  });
};

