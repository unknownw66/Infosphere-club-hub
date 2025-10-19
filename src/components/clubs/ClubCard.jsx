import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import styles from './ClubCard.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const ClubCard = ({ club, memberCount }) => {
  // Use a placeholder for missing logos
  const logoUrl = club.LogoURL || `https://placehold.co/100x100/eef2ff/64748b?text=${club.Name.charAt(0)}`;

  return (
    <motion.div variants={cardVariants}>
      <Link to={`/clubs/${club.ID}`} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.logoContainer}>
              <img src={logoUrl} alt={`${club.Name} Logo`} className={styles.logo} />
            </div>
            <div className={styles.headerText}>
              <h3 className={styles.name}>{club.Name}</h3>
              <span className={styles.category}>{club.Category}</span>
            </div>
          </div>
          <p className={styles.description}>
            {club.Description ? `${club.Description.substring(0, 100)}...` : 'No description available.'}
          </p>
          <div className={styles.cardFooter}>
            <div className={styles.memberInfo}>
              <FiUsers />
              <span>{memberCount} Member(s)</span>
            </div>
            <div className={styles.viewDetails}>
              <span>View Details</span>
              <FiArrowRight className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ClubCard;

