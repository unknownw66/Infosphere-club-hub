import { useState, useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import ClubFilter from '../components/clubs/ClubFilter';
import ClubList from '../components/clubs/ClubList';
import styles from './ClubsPage.module.css';
import { FiGrid } from 'react-icons/fi';

const ClubsPage = () => {
  const { allData, isLoading, error } = useGoogleSheet();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useMemo will re-calculate only when allData changes, improving performance
  const { clubs, members, categories, memberCounts } = useMemo(() => {
    if (!allData) {
      return { clubs: [], members: [], categories: [], memberCounts: {} };
    }

    const allClubs = allData.filter(item => item.Type === 'Club');
    const allMembers = allData.filter(item => item.Type === 'Member');
    
    // Get a unique list of categories from the clubs
    const uniqueCategories = [...new Set(allClubs.map(club => club.Category))];

    // Calculate member count for each club
    const counts = allClubs.reduce((acc, club) => {
      acc[club.ID] = allMembers.filter(member => member.ClubID === club.ID).length;
      return acc;
    }, {});

    return { 
      clubs: allClubs, 
      members: allMembers, 
      categories: uniqueCategories,
      memberCounts: counts 
    };
  }, [allData]);

  // Filter the clubs based on the selected category
  const filteredClubs = useMemo(() => {
    if (selectedCategory === 'All') {
      return clubs;
    }
    return clubs.filter(club => club.Category === selectedCategory);
  }, [clubs, selectedCategory]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
          <p>Loading Clubs...</p>
        </div>
      );
    }

    if (error) {
      return <div className={styles.stateContainer}>Error: {error.message}</div>;
    }

    return (
      <>
        <ClubFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ClubList clubs={filteredClubs} memberCounts={memberCounts} />
      </>
    );
  };

  return (
    <div className={styles.clubsPage}>
      <header className={styles.pageHeader}>
        <FiGrid className={styles.headerIcon} />
        <h1 className={styles.title}>Our Student Clubs</h1>
        <p className={styles.subtitle}>
          Explore the diverse range of technical, sports, and cultural clubs in our department.
        </p>
      </header>
      {renderContent()}
    </div>
  );
};

export default ClubsPage;

