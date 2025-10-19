import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import MemberCard from '../components/members/MemberCard';
import EventCard from '../components/events/EventCard';
import styles from './ClubDetailPage.module.css';
import { FiUsers, FiCalendar, FiArrowLeft } from 'react-icons/fi';

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const { allData, isLoading, error } = useGoogleSheet();

  // THE FIX IS HERE: We memoize all derived data and handle the initial undefined state.
  const { club, members, events } = useMemo(() => {
    if (!allData) {
      // If data isn't ready, return empty objects to prevent crashes
      return { club: null, members: [], events: [] };
    }

    const currentClub = allData.find(item => item.Type === 'Club' && item.ID === clubId);
    const clubMembers = allData.filter(item => item.Type === 'Member' && item.ClubID === clubId);
    const clubEvents = allData.filter(item => item.Type === 'Event' && item.ClubID === clubId)
                              .sort((a,b) => new Date(b.Date) - new Date(a.Date));
                              
    return { club: currentClub, members: clubMembers, events: clubEvents };
  }, [allData, clubId]);

  if (isLoading) {
    return (
      <div className={styles.stateContainer}>
        <Spinner />
        <p>Loading Club Details...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.stateContainer}>Error: {error.message}</div>;
  }

  // Handle case where club is not found after loading
  if (!club) {
    return (
      <div className={styles.stateContainer}>
        <h2>Club Not Found</h2>
        <p>The club you're looking for doesn't exist.</p>
        <Link to="/clubs" className={styles.backLink}>
          <FiArrowLeft /> Back to All Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <header className={styles.clubHeader}>
        <img src={club.LogoURL} alt={`${club.Name} Logo`} className={styles.clubLogo} />
        <div className={styles.headerText}>
          <span className={styles.clubCategory}>{club.Category}</span>
          <h1 className={styles.clubName}>{club.Name}</h1>
          <p className={styles.clubDescription}>{club.Description}</p>
        </div>
      </header>

      <main className={styles.clubContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><FiUsers /> Members ({members.length})</h2>
          {members.length > 0 ? (
            <div className={styles.membersGrid}>
              {members.map(member => (
                <MemberCard key={member.ID} member={member} />
              ))}
            </div>
          ) : (
            <p className={styles.emptySectionText}>This club has not listed any members yet.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><FiCalendar /> Recent Events ({events.length})</h2>
          {events.length > 0 ? (
            <div className={styles.eventsList}>
              {events.map(event => (
                <EventCard key={event.ID} event={event} />
              ))}
            </div>
          ) : (
            <p className={styles.emptySectionText}>This club has no recent events.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClubDetailPage;