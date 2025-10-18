import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * A versatile and animated button component.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {('primary'|'secondary')} [props.variant='primary'] - The button style variant.
 * @param {string} [props.className] - Additional classes to apply to the button.
 * @param {React.ElementType} [props.as='button'] - The element type to render, e.g., 'a' for a link.
 */
const Button = ({ children, onClick, variant = 'primary', className = '', as: Component = 'button', ...props }) => {
  return (
    <Component
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Component>
  );
};

export default Button;
