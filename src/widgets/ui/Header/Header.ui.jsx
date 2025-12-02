import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Logo } from '../../../shared/ui/Logo';
import styles from './Header.module.css';

export const Header = ({ data }) => {
  const location = useLocation();
  const navigate = useHistory();

  const getActivePage = (path) => {
    return location.pathname === path;
  };
  const handleLoginClick = () => {
    navigate.push('/login'); // Используем push вместо вызова navigate как функции
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <Logo className={styles.logo} />
          <div className={styles.divider}></div>
          <div className={styles.companyInfo}>
            <h1 className={styles.companyName}>Авиационный мониторинг</h1>
            <p className={styles.companyTagline}>Система ситуационного центра</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <NavigationLink 
              to="/" 
              isActive={getActivePage('/')}
              label="СИТУАЦИОННЫЙ ЦЕНТР"
            />
            
            <NavigationLink 
              to="/statistics" 
              isActive={getActivePage('/statistics')}
              label="СТАТИСТИКА"
            />
            
            <NavigationLink 
              to="/analytics" 
              isActive={getActivePage('/analytics')}
              label="АНАЛИТИКА"
            />
            
            <NavigationLink 
              to="/map" 
              isActive={getActivePage('/map')}
              label="КАРТА"
            />
          </div>
        </nav>
        <div className={styles.headerRight}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Аэропортов</span>
                <span className={styles.statValue}>{data.length}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.authSection}>
            <div className={styles.userInfo}>
              <span className={styles.userRole}>Гость</span>
              <span className={styles.systemStatus}>
                <span className={styles.statusIndicator}></span>
                Система активна
              </span>
            </div>
            <button 
              className={styles.loginButton}
              onClick={handleLoginClick}
            >
              <span className={styles.loginText}>Вход</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavigationLink = ({ to, isActive, label, icon }) => (
  <Link 
    to={to} 
    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
  >
    <span className={styles.navLabel}>{label}</span>
  </Link>
);