import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageBanner.module.css';

// --- Image Configuration ---
// Add as many images and captions as you like to this list.
// Make sure the image paths are correct (pointing to your /public/images folder).
const slides = [
  {
    imageUrl: './public/images/CollegeImage.webp',
    title: 'Our Campus',
    subtitle: 'Fostering a vibrant community of innovation and excellence.'
  },
  {
    imageUrl: 'https://placehold.co/1200x600/003b8e/FFF?text=Our+Faculty',
    title: 'Dedicated Faculty',
    subtitle: 'Guiding the next generation of engineers and leaders.'
  },
  {
    imageUrl: 'https://placehold.co/1200x600/3b82f6/FFF?text=Student+Life',
    title: 'Vibrant Student Life',
    subtitle: 'Where collaboration and creativity thrive.'
  },
    {
    imageUrl: 'https://placehold.co/1200x600/1e293b/FFF?text=Club+Activities',
    title: 'Engaging Club Activities',
    subtitle: 'From hackathons to cultural festivals, there\'s something for everyone.'
  }
];

const ImageBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // This useEffect hook handles the auto-playing slideshow logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [currentIndex]);

  return (
    <section className={styles.banner}>
      <div className={styles.imageContainer}>
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].imageUrl}
            alt={slides[currentIndex].title}
            className={styles.backgroundImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, ease: 'easeInOut' } }}
            exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          />
        </AnimatePresence>
        <div className={styles.glassPane}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.7, ease: 'easeIn' } }}
            >
              <h2>{slides[currentIndex].title}</h2>
              <p>{slides[currentIndex].subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ImageBanner;

