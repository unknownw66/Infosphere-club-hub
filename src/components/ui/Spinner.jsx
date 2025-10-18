import styles from './Spinner.module.css';

/**
 * A simple, elegant loading spinner component.
 */
const Spinner = () => {
  return (
    <div className={styles.spinnerContainer} role="status" aria-label="Loading...">
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
