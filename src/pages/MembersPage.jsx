import { useState, useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import MemberCard from '../components/members/MemberCard';
import MemberFilter from '../components/members/MemberFilter';
import styles from './MembersPage.module.css'; // We'll create this file
import { FiUsers } from 'react-icons/fi';

const MembersPage = () => {
  const { allData, isLoading, error } = useGoogleSheet();
  const [activeFilters, setActiveFilters] = useState({
    club: 'all',
    year: 'all',
    search: '',
  });

  // THE FIX IS HERE: We check if allData exists before filtering.
  // We use useMemo for performance, so this calculation only runs when data changes.
  const { members, clubs } = useMemo(() => {
    if (!allData) return { members: [], clubs: [] }; // Return empty arrays if data is not ready

    const filteredMembers = allData.filter(item => item.Type === 'Member');
    const allClubs = allData.filter(item => item.Type === 'Club');
    return { members: filteredMembers, clubs: allClubs };
  }, [allData]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const { club, year, search } = activeFilters;
      const searchLower = search.toLowerCase();
      
      const clubMatch = club === 'all' || member.ClubID === club;
      const yearMatch = year === 'all' || (member.USN && member.USN.startsWith(year));
      const searchMatch = search === '' || 
                          (member.Name && member.Name.toLowerCase().includes(searchLower)) ||
                          (member.USN && member.USN.toLowerCase().includes(searchLower));

      return clubMatch && yearMatch && searchMatch;
    });
  }, [members, activeFilters]);
  
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
          <p>Loading Members...</p>
        </div>
      );
    }
  
    if (error) {
      return <div className={styles.stateContainer}>Error: {error.message}</div>;
    }
  
    return (
      <>
        <MemberFilter
          clubs={clubs}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          membersCount={filteredMembers.length}
        />
        {filteredMembers.length > 0 ? (
          <div className={styles.membersGrid}>
            {filteredMembers.map(member => (
              <MemberCard key={member.ID || member.USN} member={member} clubName={clubs.find(c => c.ID === member.ClubID)?.Name || ''} />
            ))}
          </div>
        ) : (
          <div className={styles.stateContainer}>
            <p>No members found matching your criteria.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.membersPage}>
      <header className={styles.pageHeader}>
        <FiUsers className={styles.headerIcon} />
        <h1 className={styles.title}>Club Members</h1>
        <p className={styles.subtitle}>
          Meet the talented students who form our vibrant club community.
        </p>
      </header>
      {renderContent()}
    </div>
  );
};

export default MembersPage;

