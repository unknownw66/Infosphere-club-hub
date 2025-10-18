// import React from 'react';
// import  useGoogleSheet  from '../hooks/useGoogleSheet';
// import Spinner from '../components/ui/Spinner';
// import Card from '../components/ui/Card';
// import styles from './CoordinatorsPage.module.css';

// const CoordinatorsPage = () => {
//   const { coordinators, isLoading, isError, error } = useGoogleSheet();

//   if (isLoading) return <Spinner />;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Faculty Coordinators</h1>
//       <p className={styles.subtitle}>Meet the mentors guiding our student clubs.</p>
//       <div className={styles.grid}>
//         {coordinators.map(coordinator => (
//           <Card key={coordinator.ID} className={styles.card}>
//             <img src={coordinator.PhotoURL} alt={coordinator.Name} className={styles.photo} />
//             <div className={styles.info}>
//               <h2 className={styles.name}>{coordinator.Name}</h2>
//               <p className={styles.department}>{coordinator.Department}</p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoordinatorsPage;


import { useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import styles from './CoordinatorsPage.module.css';
import { FiAward } from 'react-icons/fi';

const CoordinatorsPage = () => {
  const { allData, isLoading, error } = useGoogleSheet();

  // THE FIX IS HERE: We check if allData exists before filtering.
  const coordinators = useMemo(() => {
    if (!allData) return []; // Return an empty array if data is not ready

    return allData
      .filter(item => item.Type === 'Coordinator')
      .sort((a, b) => a.Name.localeCompare(b.Name)); // Sort alphabetically
  }, [allData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
          <p>Loading Coordinators...</p>
        </div>
      );
    }

    if (error) {
      return <div className={styles.stateContainer}>Error: {error.message}</div>;
    }

    if (coordinators.length === 0) {
      return (
        <div className={styles.stateContainer}>
          <p>Coordinator information is not available at this time.</p>
        </div>
      );
    }

    return (
      <div className={styles.coordinatorsGrid}>
        {coordinators.map(coordinator => (
          <div key={coordinator.ID} className={styles.coordinatorCard}>
            <img 
              src={coordinator.PhotoURL || 'https://placehold.co/400x400/eef2ff/64748b?text=Photo'} 
              alt={`Photo of ${coordinator.Name}`} 
              className={styles.coordinatorPhoto}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.coordinatorName}>{coordinator.Name}</h2>
              <p className={styles.coordinatorDept}>{coordinator.Department}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.coordinatorsPage}>
      <header className={styles.pageHeader}>
        <FiAward className={styles.headerIcon} />
        <h1 className={styles.title}>Faculty Coordinators</h1>
        <p className={styles.subtitle}>
          Meet the dedicated faculty members who guide and support our student clubs.
        </p>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default CoordinatorsPage;
// ```

// ### Summary of the Fix:

// In `CoordinatorsPage.jsx`, I have updated the `useMemo` hook:

// ```javascript
// const coordinators = useMemo(() => {
//   if (!allData) return []; // This is the fix!
  
//   return allData
//     .filter(item => item.Type === 'Coordinator')
//     // ...
// }, [allData]);

