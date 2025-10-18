import React from 'react';
import Card from '../ui/Card';
import styles from './MemberCard.module.css';

const MemberCard = ({ member, club }) => {
    return (
        <Card className={styles.card}>
            <h3 className={styles.name}>{member.Name}</h3>
            <p className={styles.year}>{member.Year} Year</p>
            {club && <p className={styles.club}>{club.Name}</p>}
        </Card>
    );
};

export default MemberCard;
