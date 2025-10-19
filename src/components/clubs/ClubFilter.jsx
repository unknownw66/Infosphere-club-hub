import { motion } from 'framer-motion';
import styles from './ClubFilter.module.css';

const ClubFilter = ({ categories = [], selectedCategory, onSelectCategory }) => {
  // Ensure 'All' is always the first option
  const allCategories = ['All', ...categories];

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.filterList}>
        {allCategories.map(category => (
          <li key={category} className={styles.filterItem}>
            <button
              className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
              {/* This motion.div creates the animated sliding pill */}
              {selectedCategory === category && (
                <motion.div 
                  className={styles.activePill} 
                  layoutId="activeCategoryPill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubFilter;

