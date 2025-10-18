import React, { useState, useMemo } from 'react';
import { useGoogleSheet } from '../../hooks/useGoogleSheet';
import Spinner from '../ui/Spinner';
import ClubCard from './ClubCard';
import ClubFilter from './ClubFilter';
import styles from './ClubList.module.css';

const ClubList = () => {
  const { clubs, isLoading, isError, error } = useGoogleSheet();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return [...new Set(clubs.map(club => club.Category))];
  }, [clubs]);

  const filteredClubs = useMemo(() => {
    if (selectedCategory === 'All') return clubs;
    return clubs.filter(club => club.Category === selectedCategory);
  }, [clubs, selectedCategory]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ClubFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className={styles.grid}>
        {filteredClubs.map(club => (
          <ClubCard key={club.ID} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
