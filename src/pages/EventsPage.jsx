import { useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import EventCalendar from '../components/events/EventCalendar';
import styles from './EventsPage.module.css'; // We'll create this file
import { FiCalendar } from 'react-icons/fi';

const EventsPage = () => {
  // 1. The page component fetches the data
  const { allData, isLoading, error } = useGoogleSheet();

  // 2. It processes the data it needs (events and clubs)
  const { events, clubs } = useMemo(() => {
    if (!allData) return { events: [], clubs: [] };
    const events = allData.filter(item => item.Type === 'Event')
                         .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by most recent
    const clubs = allData.filter(item => item.Type === 'Club');
    return { events, clubs };
  }, [allData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
          <p>Loading Events...</p>
        </div>
      );
    }

    if (error) {
      return <div className={styles.stateContainer}>Error: {error.message}</div>;
    }
    
    // 3. It passes the prepared data down as props
    return <EventCalendar events={events} clubs={clubs} />;
  };

  return (
    <div className={styles.eventsPage}>
      <header className={styles.pageHeader}>
        <FiCalendar className={styles.headerIcon} />
        <h1 className={styles.title}>Club Events</h1>
        <p className={styles.subtitle}>
          Discover upcoming workshops, competitions, and gatherings from all our clubs.
        </p>
      </header>
      {renderContent()}
    </div>
  );
};

export default EventsPage;

