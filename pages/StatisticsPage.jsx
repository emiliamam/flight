import React from 'react';
import { Analytics, MapComponent, Dashboard } from '../components';

export const StatisticsPage = ({ handleCountryChange }) => {
  return <Analytics handleCountryChange={handleCountryChange} />;
};