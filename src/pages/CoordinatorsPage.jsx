import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';
import styles from './CoordinatorsPage.module.css';

const CoordinatorsPage = () => {
  const { coordinators, isLoading, isError, error } = useGoogleSheet();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Faculty Coordinators</h1>
      <p className={styles.subtitle}>Meet the mentors guiding our student clubs.</p>
      <div className={styles.grid}>
        {coordinators.map(coordinator => (
          <Card key={coordinator.ID} className={styles.card}>
            <img src={coordinator.PhotoURL} alt={coordinator.Name} className={styles.photo} />
            <div className={styles.info}>
              <h2 className={styles.name}>{coordinator.Name}</h2>
              <p className={styles.department}>{coordinator.Department}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoordinatorsPage;
