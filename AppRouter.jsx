import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './widgets/ui/Header/Header.ui';
import { HomePage } from './pages/HomePage';
import { StatisticsPage }  from './pages/StatisticsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MapPage }  from './pages/MapPage';
import { Footer } from './widgets/ui/Footer/Footer';

export const AppRouter = ({ data, country, handleCountryChange }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Header data={data} />
      
      <main style={{ flex: 1 }}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          
          <Route path="/statistics">
            <StatisticsPage handleCountryChange={handleCountryChange} />
          </Route>
          
          <Route path="/analytics">
            <AnalyticsPage data={data} country={country} />
          </Route>
          
          <Route path="/map">
            <MapPage airports={data} />
          </Route>
          
          <Route path="*">
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2>Страница не найдена</h2>
            </div>
          </Route>
        </Switch>
      </main>

      <Footer />
    </div>
  );
};