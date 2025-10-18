import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from './Modal.module.css';

/**
 * An animated, accessible modal component for displaying additional information.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {Function} props.onClose - Function to call to close the modal.
 * @param {string} props.title - The title displayed in the modal header.
 * @param {React.ReactNode} props.children - The content of the modal body.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.content}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <div className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                <FiX />
              </button>
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
