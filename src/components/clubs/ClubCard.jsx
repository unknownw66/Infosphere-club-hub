import React from 'react';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';
import styles from './ClubCard.module.css';

const ClubCard = ({ club }) => {
  return (
    <Card className={styles.card}>
      <img src={club.LogoURL} alt={`${club.Name} Logo`} className={styles.logo} />
      <div className={styles.content}>
        <h3 className={styles.name}>{club.Name}</h3>
        <span className={styles.category}>{club.Category}</span>
        <p className={styles.description}>{club.Description.substring(0, 100)}...</p>
        <Link to={`/clubs/${club.ID}`} className={styles.link}>View Details</Link>
      </div>
    </Card>
  );
};

export default ClubCard;
