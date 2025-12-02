import React from 'react';
import { CountryPicker, MapComponent, Dashboard } from '../components';

export const AnalyticsPage = ({ data, country }) => {
  return <Dashboard data={data} country={country} />;
};