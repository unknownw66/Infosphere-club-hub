import { motion } from 'framer-motion';
import styles from './Card.module.css';

/**
 * A reusable container component with a clean, modern style.
 * Animations should be applied by the parent component that uses this card.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className] - Additional classes for custom styling.
 */
const Card = ({ children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

// You can also export a motion version for convenience
export const MotionCard = motion(Card);

export default Card;

