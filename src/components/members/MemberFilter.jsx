import { useMemo } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import styles from './MemberFilter.module.css';

// The FIX is in this line: clubs = []
// This provides a default empty array if the `clubs` prop is undefined.
const MemberFilter = ({ clubs = [], activeFilters, onFilterChange, membersCount }) => {

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    // Assuming a 4-year course, generate past few years based on current year
    for (let i = 0; i < 4; i++) {
        // This is a simplified logic. You might need to adjust based on USN format.
        // E.g., for '4MT21IS001', the year prefix is '21'.
        const yearPrefix = (currentYear - i).toString().slice(-2);
        years.push({ value: `4MT${yearPrefix}`, label: `${currentYear - i}` });
    }
    return years;
  }, []);

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <FiFilter />
          <select 
            value={activeFilters.club}
            onChange={(e) => onFilterChange('club', e.target.value)}
          >
            <option value="all">All Clubs</option>
            {clubs.map(club => (
              <option key={club.ID} value={club.ID}>{club.Name}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <FiFilter />
          <select
            value={activeFilters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            <option value="all">All Years</option>
             {/* Note: This year logic is a placeholder. You'll need to adjust it
                 to match the actual format of your USNs (e.g., '21', '22'). */}
            <option value="4MT21">2021 Batch</option>
            <option value="4MT22">2022 Batch</option>
            <option value="4MT23">2023 Batch</option>
            <option value="4MT24">2024 Batch</option>
          </select>
        </div>

        <div className={`${styles.filterGroup} ${styles.searchGroup}`}>
          <FiSearch />
          <input 
            type="text"
            placeholder="Search by name or USN..."
            value={activeFilters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
      </div>
      <div className={styles.resultsCount}>
        Showing <strong>{membersCount}</strong> member(s)
      </div>
    </div>
  );
};

export default MemberFilter;

