import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ImageBanner from '../components/home/ImageBanner';
import FeaturedCoordinators from '../components/home/FeaturedCoordinators';
import FeaturedClubs from '../components/home/FeaturedClubs';
import styles from './HomePage.module.css'; // Import the new CSS module

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <section className={styles.heroSection}>
        <HeroSection />
      </section>
      
      <section className={styles.bannerSection}>
        <ImageBanner />
      </section>
      
      {/* <section className={styles.coordinatorsSection}>
        <FeaturedCoordinators />
      </section> */}
      
      <section className={styles.clubsSection}>
        <FeaturedClubs />
      </section>
    </main>
  );
};

export default HomePage;

