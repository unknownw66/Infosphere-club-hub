import React from 'react';
import styles from './ClubFilter.module.css';

const ClubFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className={styles.filterContainer}>
      {['All', ...categories].map(category => (
        <button
          key={category}
          className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ClubFilter;
