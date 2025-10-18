// import React, { useState, useMemo } from 'react';
// import  useGoogleSheet from '../../hooks/useGoogleSheet';
// import Spinner from '../ui/Spinner';
// import ClubCard from './ClubCard';
// import ClubFilter from './ClubFilter';
// import styles from './ClubList.module.css';

// const ClubList = () => {
//   const { clubs, isLoading, isError, error } = useGoogleSheet();
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const categories = useMemo(() => {
//     return [...new Set(clubs.map(club => club.Category))];
//   }, [clubs]);

//   const filteredClubs = useMemo(() => {
//     if (selectedCategory === 'All') return clubs;
//     return clubs.filter(club => club.Category === selectedCategory);
//   }, [clubs, selectedCategory]);

//   if (isLoading) return <Spinner />;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <ClubFilter 
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />
//       <div className={styles.grid}>
//         {filteredClubs.map(club => (
//           <ClubCard key={club.ID} club={club} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClubList;

import { motion } from 'framer-motion';
import ClubCard from './ClubCard';
import styles from './ClubList.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// The FIX is in this line: clubs = []
// This provides a default empty array if the `clubs` prop is undefined.
const ClubList = ({ clubs = [], memberCounts = {} }) => {
  if (clubs.length === 0) {
    return (
      <div className={styles.noClubsFound}>
        <p>No clubs match the current filter.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.clubsGrid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {clubs.map((club) => (
        <ClubCard
          key={club.ID}
          club={club}
          memberCount={memberCounts[club.ID] || 0}
        />
      ))}
    </motion.div>
  );
};

export default ClubList;

