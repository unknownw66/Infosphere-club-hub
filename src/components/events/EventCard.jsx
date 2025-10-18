import React from 'react';
import Card from '../ui/Card';
import styles from './EventCard.module.css';

const EventCard = ({ event, clubName }) => {
    return (
        <Card className={styles.card}>
            <h3 className={styles.name}>{event.Name}</h3>
            <p className={styles.date}>{new Date(event.Date).toDateString()}</p>
            <p className={styles.club}>{clubName}</p>
            <p className={styles.description}>{event.Description}</p>
        </Card>
    );
};

export default EventCard;
