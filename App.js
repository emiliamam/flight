import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    data: [],
    country: '',
  }

  async componentDidMount() {
    try {
      const API_BASE = 'http://127.0.0.1:8000/api';
      const response = await fetch(`${API_BASE}/get_airports`);
      const airports = await response.json();
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
    const { data, country } = this.state;

    return (
      <Router>
        <div className={styles.container}>
          {/* ВАЖНО: Добавьте этот div с flex: 1 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AppRouter 
              data={data} 
              country={country}
              handleCountryChange={this.handleCountryChange}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;