import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ImageBanner from '../components/home/ImageBanner';
import FeaturedCoordinators from '../components/home/FeaturedCoordinators';
import FeaturedClubs from '../components/home/FeaturedClubs';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ImageBanner />
      <FeaturedCoordinators />
      <FeaturedClubs />
    </div>
  );
};

export default HomePage;

