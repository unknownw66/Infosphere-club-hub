import styles from "./Footer.module.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h4 className={styles.heading}>Information Science & Engineering</h4>
          <p className={styles.subheading}>Maharaja Institute Of Technology</p>
          <div className={styles.logoSection}>
            <img src="./public/images/ISE.png" alt="Department Logo" className={styles.logo} />
            <img src="./public/images/mmit.webp" alt="College Logo" className={styles.logo} />
          </div>
        </div>
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>
          <p className={styles.contactPerson}>Dr. Sharath Kumar Y H, <br/>Head of Department</p>
          <a href="mailto:hod.ise@yourcollege.edu" className={styles.contactLink}>
            <FaEnvelope /> hod.ise@yourcollege.edu
          </a>
          <a href="tel:+910000000000" className={styles.contactLink}>
            <FaPhone /> +91 00000 00000
          </a>
        </div>
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>
          <p className={styles.contactPerson}>Smitha Shree K P, <br/>Clutural Coordinator</p>
          <a href="mailto:hod.ise@yourcollege.edu" className={styles.contactLink}>
            <FaEnvelope /> hod.ise@yourcollege.edu
          </a>
          <a href="tel:+910000000000" className={styles.contactLink}>
            <FaPhone /> +91 00000 00000
          </a>
        </div>
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>
          <p className={styles.contactPerson}>Prof. Bhavyashree H D, <br/>Infosphere Faculty Coordinator</p>
          <a href="mailto:hod.ise@yourcollege.edu" className={styles.contactLink}>
            <FaEnvelope /> hod.ise@yourcollege.edu
          </a>
          <a href="tel:+910000000000" className={styles.contactLink}>
            <FaPhone /> +91 00000 00000
          </a>
        </div>
        <div className={styles.section}>
          <h4 className={styles.heading}>Quick Links</h4>
          <a href="/events" className={styles.quickLink}>Upcoming Events</a>
          <a href="/announcements" className={styles.quickLink}>Announcements</a>
          <a href="https://www.yourcollege.edu" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>College Website</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Department of ISE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
