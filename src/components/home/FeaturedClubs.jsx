import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedClubs.module.css';
import useGoogleSheet from '../../hooks/useGoogleSheet'; // Corrected import
import ClubCard from '../clubs/ClubCard';
import Spinner from '../ui/Spinner';
import { FiArrowRight } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly slower stagger for a smoother effect
    },
  },
};

const FeaturedClubs = () => {
  const { allData, isLoading, error } = useGoogleSheet();

  const { clubs, memberCounts } = useMemo(() => {
    if (!allData) return { clubs: [], memberCounts: {} };
    
    // Get all clubs and then slice the first 3 to feature them
    const allClubs = allData.filter(item => item.Type === 'Club');
    const featuredClubs = allClubs.slice(0, 3);
    
    const memberCounts = {};
    const allMembers = allData.filter(item => item.Type === 'Member');

    featuredClubs.forEach(club => {
      memberCounts[club.ID] = allMembers.filter(member => member.ClubID === club.ID).length;
    });

    return { clubs: featuredClubs, memberCounts };
  }, [allData]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  // Don't render the section at all if there's an error or no clubs to show
  if (error || clubs.length === 0) {
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

