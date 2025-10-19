import { motion, AnimatePresence } from 'framer-motion';
import ClubCard from './ClubCard';
import styles from './ClubList.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ClubList = ({ clubs = [], memberCounts = {} }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={clubs.length > 0 ? 'list' : 'empty'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {clubs.length === 0 ? (
          <div className={styles.noClubsFound}>
            <p>No clubs match the current filter.</p>
          </div>
        ) : (
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
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ClubList;

