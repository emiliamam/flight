import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './widgets/ui/Header/Header.ui';
import { HomePage } from './pages/HomePage';
import { StatisticsPage }  from './pages/StatisticsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MapPage }  from './pages/MapPage';
import { Footer } from './widgets/ui/Footer/Footer';
import UserDashboard from './features/UserDashboard/UserDashboard';
import { AuthPage } from './pages/AuthPage';

export const AppRouter = ({ data, country, handleCountryChange }) => {
  return (
    <>
      <Header data={data} />
      
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
        <Route path="/user-dashboard">
          <UserDashboard handleCountryChange={handleCountryChange} />
        </Route>
         <Route path="/login">
          <AuthPage />
        </Route>
        <Route path="*">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Страница не найдена</h2>
          </div>
        </Route>
      </Switch>

      {/* <Footer /> */}
    </>
  );
};