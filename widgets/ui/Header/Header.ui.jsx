import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../../shared/ui/Logo';
import styles from './Header.module.css';

export const Header = ({ data }) => {
  const location = useLocation();

  const getActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Logo />
        
        <div className={styles.headerInfo}>
          <div className={styles.headerStat}>
            <span className={styles.statLabel}>Аэропортов:</span>
            <span className={styles.statValue}>{data.length}</span>
          </div>
        </div>
      </div>
      
      <nav className={styles.nav}>
        <NavigationLink 
          to="/" 
          isActive={getActivePage('/')}
          label="Ситуационный центр"
        />
        
        <NavigationLink 
          to="/statistics" 
          isActive={getActivePage('/statistics')}
          label="Статистика"
        />
        
        <NavigationLink 
          to="/analytics" 
          isActive={getActivePage('/analytics')}
          label="Аналитика"
        />
        
        <NavigationLink 
          to="/map" 
          isActive={getActivePage('/map')}
          label="Карта"
        />
      </nav>
    </header>
  );
};

const NavigationLink = ({ to, isActive, label }) => (
  <Link 
    to={to} 
    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
  >
    <span className={styles.navText}>{label}</span>
  </Link>
);