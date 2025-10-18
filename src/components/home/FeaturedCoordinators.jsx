import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedCoordinators.module.css';
// FIX: Changed from { useGoogleSheet } to useGoogleSheet
import useGoogleSheet from '../../hooks/useGoogleSheet'; 
import { FiArrowRight } from 'react-icons/fi';
import Spinner from '../ui/Spinner';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturedCoordinators = () => {
  const { allData, isLoading, error } = useGoogleSheet();

  const coordinators = useMemo(() => {
    if (!allData) return [];
    // Assuming 'Coordinators' will be a Type in your new data structure
    return allData.filter(item => item.Type === 'Coordinator').slice(0, 4); 
  }, [allData]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Loading Coordinators...</p>
      </div>
    );
  }

  if (error) {
    // It's better not to render a broken section on the homepage.
    // console.error("Error loading coordinators:", error);
    return null; 
  }
  
  if (coordinators.length === 0) {
    return null; // Don't render the section if there are no coordinators
  }

  return (
    <section className={styles.coordinatorsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Faculty Coordinators</h2>
        <p className={styles.subtitle}>Meet the mentors guiding our student clubs.</p>
      </div>
      <motion.div 
        className={styles.coordinatorsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {coordinators.map((coordinator) => (
          <motion.div key={coordinator.ID} className={styles.coordinatorCard} variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <img 
                src={coordinator.PhotoURL || `https://placehold.co/400x400/eef2ff/64748b?text=${coordinator.Name.charAt(0)}`} 
                alt={coordinator.Name} 
                className={styles.coordinatorImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.coordinatorName}>{coordinator.Name}</h3>
              <p className={styles.coordinatorDept}>{coordinator.Department || 'Dept. of ISE'}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className={styles.viewAllLinkContainer}>
        <Link to="/coordinators" className={styles.viewAllLink}>
          <span>View All Coordinators</span>
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCoordinators;

