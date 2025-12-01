import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Рейтинг пунктуальности</p>
        <p>Разработано студентами РУТ</p>
      </div>
    </footer>
  );
};