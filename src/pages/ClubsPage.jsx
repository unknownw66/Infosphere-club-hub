import React from 'react';
import ClubList from '../components/clubs/ClubList';

const ClubsPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Student Clubs</h1>
      <ClubList />
    </div>
  );
};

export default ClubsPage;
