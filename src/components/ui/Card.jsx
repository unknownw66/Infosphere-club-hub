import { motion } from 'framer-motion';
import styles from './Card.module.css';

/**
 * A reusable, animated card component for displaying content.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className] - Additional classes for custom styling.
 */
const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
