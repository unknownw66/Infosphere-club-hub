import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import Spinner from '../components/ui/Spinner';
import MemberCard from '../components/members/MemberCard';
import MemberFilter from '../components/members/MemberFilter';

const MembersPage = () => {
    const [filters, setFilters] = React.useState({ club: 'All', year: 'All' });
    const { members, clubs, isLoading, isError, error } = useGoogleSheet();

    if (isLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    const filteredMembers = members.filter(member => {
        const clubMatch = filters.club === 'All' || clubs.find(c => c.ID === member.ClubID)?.Name === filters.club;
        const yearMatch = filters.year === 'All' || member.Year === filters.year;
        return clubMatch && yearMatch;
    });

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Members</h1>
            <MemberFilter
                clubs={clubs}
                members={members}
                filters={filters}
                setFilters={setFilters}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                {filteredMembers.map(member => (
                    <MemberCard key={member.ID} member={member} club={clubs.find(c => c.ID === member.ClubID)} />
                ))}
            </div>
        </div>
    );
};

export default MembersPage;
