import React from 'react';

import { CountryPicker, MapComponent, Dashboard } from './components';
import { PunctualityDashboard } from './pages/PunctualityDashboard.ui';

import styles from './App.module.css';
import 'leaflet/dist/leaflet.css';
import logoImage from './images/image2.png';

class App extends React.Component {
  state = {
    data: [],
    country: '',
    activePage: 'Ситуационный центр', 
  }

  setActivePage = (page) => {
    this.setState({ activePage: page });
  }

  async componentDidMount() {
    try {
      const API_BASE = 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_BASE}/get_airports`);
      const airports = await response.json();
      console.log(airports, 'airports');
      this.setState({ data: airports });
    } catch (error) {
      console.error('Ошибка загрузки аэропортов:', error);
    }
  }

  handleCountryChange = async (country) => {
    const response = await fetch('http://127.0.0.1:8000/airports.json');  
    const data = await response.json();
    this.setState({ data, country: country });
  }

  render() {
    const { data, country, activePage } = this.state; 

    return (
      <div className={styles.container}>
        {/* Обновленный Header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logo}>
            <div className={styles.logoIcon}>
                <img 
                  src={logoImage} 
                  alt="Логотип Авиааналитика" 
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.logoText}>
                <h1>FlightStats</h1>
                <p className={styles.logoSubtitle}>Рейтинг пунктуальности авиакомпаний</p>
              </div>
            </div>
            <div className={styles.headerInfo}>
              <div className={styles.headerStat}>
                <span className={styles.statLabel}>Аэропортов:</span>
                <span className={styles.statValue}>{data.length}</span>
              </div>
              <div className={styles.headerStat}>
                <span className={styles.statValue}>{activePage}</span>
              </div>
            </div>
          </div>
          
          <nav className={styles.nav}>
            <button 
              className={`${styles.navItem} ${activePage === 'Ситуационный центр' ? styles.active : ''}`}
              onClick={() => this.setActivePage('Ситуационный центр')}
            >
              <span className={styles.navText}>Ситуационный центр</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activePage === 'Статистика' ? styles.active : ''}`}
              onClick={() => this.setActivePage('Статистика')}
            >
              <span className={styles.navText}>Статистика</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activePage === 'Аналитика' ? styles.active : ''}`}
              onClick={() => this.setActivePage('Аналитика')}
            >
              <span className={styles.navText}>Аналитика</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activePage === 'Карта' ? styles.active : ''}`}
              onClick={() => this.setActivePage('Карта')}
            >
              <span className={styles.navText}>Карта</span>
            </button>
          </nav>
        </header>
   
        {activePage === 'Ситуационный центр' && <PunctualityDashboard />}
        {activePage === 'Статистика' && <CountryPicker handleCountryChange={this.handleCountryChange} />}
        {activePage === 'Аналитика' && <Dashboard data={data} country={country} />}
        {activePage === 'Карта' && <MapComponent airports={data} />}

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; {new Date().getFullYear()} Рейтинг пунктуальности</p>
            <p>Разработано студентами РУТ</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;