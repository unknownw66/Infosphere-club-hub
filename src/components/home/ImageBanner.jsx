import React from 'react';
import { motion } from 'framer-motion';
import styles from './ImageBanner.module.css';

// Placeholder images - replace with your actual image paths in the public folder
const collegeImageUrl = './public/images/CollegeImage.webp';
const departmentImageUrl = 'https://placehold.co/800x500/003b8e/FFF?text=Department+Building';


const ImageBanner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.imageContainer}>
                <img src={collegeImageUrl} alt="College Campus" className={styles.backgroundImage} />
                <motion.div 
                    className={styles.glassPane}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2>Our Campus</h2>
                    <p>Fostering innovation and excellence.</p>
                </motion.div>
            </div>
            <div className={styles.imageContainer}>
                <img src={departmentImageUrl} alt="Department Building" className={styles.backgroundImage} />
                 <motion.div 
                    className={styles.glassPane}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h2>Our Department</h2>
                    <p>The heart of student-led activities.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ImageBanner;

