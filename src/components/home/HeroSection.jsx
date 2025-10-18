import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiAward, FiCalendar } from "react-icons/fi";
import Button from '../ui/Button';
import styles from './HeroSection.module.css';

// Animation variants for a cleaner JSX structure
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  return (
    <motion.section 
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background shapes */}
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
      </div>

      <div className={styles.heroLayout}>
        <motion.div 
          className={styles.heroImageContainer}
          variants={logoVariants}
        >
          {/* Corrected image path for Vite */}
          <img src="./public/images/ISE.webp" alt="Infosphere Logo" className={styles.heroLogo} />
        </motion.div>

        <div className={styles.heroContent}>
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Dept. of Information Science & Engineering
          </motion.p>
          
          <motion.h1 
            className={styles.title}
            variants={itemVariants}
          >
            Welcome to <span className={styles.titleHighlight}>Infosphere</span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            variants={itemVariants}
          >
            The central hub for all student clubs in our department. Discover, connect, and grow with our vibrant community.
          </motion.p>
          
          <motion.div variants={itemVariants} className={styles.buttonContainer}>
            <Button as={Link} to="/clubs" size="large" icon={FiArrowRight}>
              Explore Clubs
            </Button>
          </motion.div>

          <motion.div className={styles.statsContainer} variants={itemVariants}>
            <div className={styles.statItem}>
              <FiUsers />
              <span>15+ Clubs</span>
            </div>
            <div className={styles.statItem}>
              <FiAward />
              <span>50+ Events/Year</span>
            </div>
            <div className={styles.statItem}>
              <FiCalendar />
              <span>1000+ Members</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

