import { useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet'; // Corrected import
import Spinner from '../components/ui/Spinner';
import styles from './AnnouncementsPage.module.css';
import { FiRss } from 'react-icons/fi';

const AnnouncementsPage = () => {
  const { allData, isLoading, error } = useGoogleSheet();

  // THE FIX IS HERE: We check if allData exists before filtering.
  const announcements = useMemo(() => {
    if (!allData) return []; // Return an empty array if data is not ready

    return allData
      .filter(item => item.Type === 'Announcement')
      .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by most recent
  }, [allData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.stateContainer}>
          <Spinner />
          <p>Loading Announcements...</p>
        </div>
      );
    }
  
    if (error) {
      return <div className={styles.stateContainer}>Error: {error.message}</div>;
    }
  
    if (announcements.length === 0) {
      return (
        <div className={styles.stateContainer}>
          <p>No announcements have been posted yet. Please check back later.</p>
        </div>
      );
    }

    return (
      <div className={styles.announcementsList}>
        {announcements.map(item => (
          <a
            key={item.ID}
            href={item.Link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.announcementCard}
          >
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{item.Name}</h2>
              <p className={styles.cardDescription}>{item.Description}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardDate}>{new Date(item.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className={styles.cardLink}>View Details &rarr;</span>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.announcementsPage}>
      <header className={styles.pageHeader}>
        <FiRss className={styles.headerIcon} />
        <h1 className={styles.title}>Announcements</h1>
        <p className={styles.subtitle}>
          The latest news, updates, and notices from the department and its clubs.
        </p>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default AnnouncementsPage;