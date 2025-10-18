import React from 'react';
import styles from './MemberFilter.module.css';

const MemberFilter = ({ clubs, members, filters, setFilters }) => {
    const years = [...new Set(members.map(m => m.Year))].sort();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.filterContainer}>
            <select name="club" value={filters.club} onChange={handleFilterChange} className={styles.select}>
                <option value="All">All Clubs</option>
                {clubs.map(club => <option key={club.ID} value={club.Name}>{club.Name}</option>)}
            </select>
            <select name="year" value={filters.year} onChange={handleFilterChange} className={styles.select}>
                <option value="All">All Years</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
        </div>
    );
};

export default MemberFilter;
