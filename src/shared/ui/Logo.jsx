import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../images/image2.png';
import styles from './Logo.module.css';

export const Logo = () => (
  <div className={styles.logo}>
    <Link to="/" className={styles.logoLink}>
      <img src={logoImage} alt="FlightStats" className={styles.logoImage} />
      <h1 className={styles.logoTitle}>FlightStats</h1>
    </Link>
  </div>
);