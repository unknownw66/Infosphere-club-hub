import styles from './EventCard.module.css';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const EventCard = ({ event, clubName }) => {
  // Use a placeholder if the PhotoURL is missing
  const imageUrl = event.PhotoURL || 'https://placehold.co/600x400/eef2ff/64748b?text=Event';

  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={`Image for ${event.Name}`} className={styles.eventImage} />
        <span className={styles.clubTag}>{clubName || 'Department Event'}</span>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.eventName}>{event.Name}</h3>
        <p className={styles.eventDescription}>{event.Description}</p>
        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <FiCalendar />
            <span>{new Date(event.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {event.Venue && (
            <div className={styles.detailItem}>
              <FiMapPin />
              <span>{event.Venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

