import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedClubs.module.css';
// FIX: Changed from { useGoogleSheet } to useGoogleSheet
import useGoogleSheet from '../../hooks/useGoogleSheet';
import ClubCard from '../clubs/ClubCard';
import Spinner from '../ui/Spinner';
import { FiArrowRight } from 'react-icons/fi';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FeaturedClubs = () => {
  const { allData, isLoading, error } = useGoogleSheet();

  const { clubs, memberCounts } = useMemo(() => {
    if (!allData) return { clubs: [], memberCounts: {} };
    
    const clubs = allData.filter(item => item.Type === 'Club').slice(0, 3);
    const memberCounts = {};

    clubs.forEach(club => {
      const count = allData.filter(member => member.Type === 'Member' && member.ClubID === club.ID).length;
      memberCounts[club.ID] = count;
    });

    return { clubs, memberCounts };
  }, [allData]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Loading Clubs...</p>
      </div>
    );
  }

  if (error || clubs.length === 0) {
    // console.error("Error loading clubs:", error);
    return null;
  }

  return (
    <section className={styles.clubsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Explore Our Clubs</h2>
        <p className={styles.subtitle}>Find your passion in our technical, cultural, and sports communities.</p>
      </div>
      <motion.div 
        className={styles.clubsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {clubs.map((club) => (
            <ClubCard 
              key={club.ID} 
              club={club} 
              memberCount={memberCounts[club.ID] || 0} 
            />
        ))}
      </motion.div>
      <div className={styles.viewAllLinkContainer}>
        <Link to="/clubs" className={styles.viewAllLink}>
          <span>View All Clubs</span>
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedClubs;

