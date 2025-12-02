import React from 'react';
import { Dashboard } from '../components';

export const AnalyticsPage = ({ data, country }) => {
  return <Dashboard data={data} country={country} />;
};