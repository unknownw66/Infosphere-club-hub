import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import styles from "./Header.module.css";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { x: "-100%", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/clubs", text: "Clubs" },
    { to: "/events", text: "Events" },
    { to: "/members", text: "Members" },
    { to: "/announcements", text: "Announcements" },
    { to: "/coordinators", text: "Coordinators" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <NavLink to="/" className={styles.logoLink}>
            {/* Corrected Path: Assumes images are in the public/images folder */}
            <img src="./public/images/ISE.webp" alt="Department Logo" className={styles.logo} />
            
          </NavLink>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
          
          <div className={styles.rightSection}>
             {/* Corrected Path and ensured collegeLogo class is used */}
            <img src="./public/images/mmit.webp" alt="College Logo" className={`${styles.logo} ${styles.collegeLogo}`} />
            <a href="https://www.yourcollege.edu/contact" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
              <span>Contact Us</span>
              <FiChevronRight size="1.2em"/>
            </a>
            <button className={styles.mobileNavToggle} onClick={toggleNav} aria-label="Toggle navigation">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isNavOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isNavOpen ? <FiX /> : <FiMenu />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className={styles.mobileNavOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            onClick={closeNav}
          >
            <motion.nav
              className={styles.mobileNav}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileNavHeader}>
                <img src="/images/ISE.webp" alt="Department Logo" className={styles.mobileNavLogo} />
                <button className={styles.closeButton} onClick={closeNav} aria-label="Close navigation">
                  <FiX />
                </button>
              </div>
              <motion.ul 
                className={styles.mobileNavList}
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } }
                }}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                   <motion.li 
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                   >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
                      }
                    >
                      {link.text}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

