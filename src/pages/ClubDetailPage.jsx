import React from 'react';
import { useParams } from 'react-router-dom';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import Spinner from '../components/ui/Spinner';
import { FaUser, FaInfoCircle, FaCalendarAlt, FaImage } from 'react-icons/fa';
import styles from './ClubDetailPage.module.css'; // We'll create this file

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const { clubs, members, events, isLoading, isError, error } = useGoogleSheet();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading data: {error.message}</div>;
  }

  const club = clubs.find((c) => c.ID === clubId);

  if (!club) {
    return <div>Club not found.</div>;
  }

  const clubMembers = members.filter((m) => m.ClubID === club.ID);
  const clubEvents = events.filter((e) => e.ClubID === club.ID);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={club.LogoURL} alt={`${club.Name} logo`} className={styles.logo} />
        <div>
          <h1 className={styles.clubName}>{club.Name}</h1>
          <p className={styles.clubCategory}>{club.Category}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><FaInfoCircle /> About Us</h2>
        <p>{club.Description}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><FaUser /> Members ({clubMembers.length})</h2>
        <div className={styles.memberGrid}>
          {clubMembers.map((member) => (
            <div key={member.ID} className={styles.memberCard}>
              <p>{member.Name}</p>
              <p className={styles.memberDetails}>{member.Year} Year</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><FaCalendarAlt /> Events</h2>
        {clubEvents.length > 0 ? (
          <ul className={styles.eventList}>
            {clubEvents.map((event) => (
              <li key={event.ID} className={styles.eventItem}>{event.Name} - {event.Date}</li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled yet.</p>
        )}
      </div>
      
       <div className={styles.section}>
        <h2 className={styles.sectionTitle}><FaImage /> Gallery</h2>
         <p>Gallery section coming soon!</p>
      </div>
    </div>
  );
};

export default ClubDetailPage;
