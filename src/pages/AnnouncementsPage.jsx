import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';
import styles from './AnnouncementsPage.module.css';

const AnnouncementsPage = () => {
  const { announcements, isLoading, isError, error } = useGoogleSheet();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Announcements</h1>
      <div className={styles.list}>
        {announcements.map(announcement => (
          <Card key={announcement.ID} className={styles.card}>
            <h2 className={styles.announcementTitle}>{announcement.Title}</h2>
            <p className={styles.date}>{new Date(announcement.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className={styles.content}>{announcement.Content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
