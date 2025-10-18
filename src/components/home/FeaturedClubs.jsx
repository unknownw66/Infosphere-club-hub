import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleSheet } from '../../hooks/useGoogleSheet';
import Spinner from '../ui/Spinner';
import ClubCard from '../clubs/ClubCard';
import { Link } from 'react-router-dom';
import styles from './FeaturedClubs.module.css';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedClubs = () => {
  const { clubs, members, isLoading, isError } = useGoogleSheet();

  if (isLoading) return <Spinner />;
  if (isError || !clubs || clubs.length === 0) return null;

  // Get first 3 clubs to feature
  const featuredClubs = clubs.slice(0, 3);

  return (
    <section className={styles.section}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Clubs
      </motion.h2>
      <div className={styles.grid}>
        {featuredClubs.map((club) => {
          const memberCount = members.filter(m => m.ClubID === club.ID).length;
          return <ClubCard key={club.ID} club={club} memberCount={memberCount} />;
        })}
      </div>
       <Link to="/clubs" className={styles.viewAllLink}>
        See All Clubs <FiArrowRight />
      </Link>
    </section>
  );
};

export default FeaturedClubs;

