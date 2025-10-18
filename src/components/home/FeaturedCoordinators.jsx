import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleSheet } from '../../hooks/useGoogleSheet';
import Spinner from '../ui/Spinner';
import { Link } from 'react-router-dom';
import styles from './FeaturedCoordinators.module.css';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedCoordinators = () => {
  const { coordinators, isLoading, isError } = useGoogleSheet();

  if (isLoading) return <Spinner />;
  // Don't render the section if there's an error or no data
  if (isError || !coordinators || coordinators.length === 0) return null;

  // Take the first few coordinators to feature
  const featured = coordinators.slice(0, 3);

  return (
    <section className={styles.section}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Meet Our Mentors
      </motion.h2>
      <div className={styles.grid}>
        {featured.map((coordinator, index) => (
          <motion.div
            key={coordinator.ID}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={coordinator.PhotoURL} alt={coordinator.Name} className={styles.photo} />
            <h3 className={styles.name}>{coordinator.Name}</h3>
            <p className={styles.department}>{coordinator.Department}</p>
          </motion.div>
        ))}
      </div>
      <Link to="/coordinators" className={styles.viewAllLink}>
        View All Coordinators <FiArrowRight />
      </Link>
    </section>
  );
};

export default FeaturedCoordinators;

