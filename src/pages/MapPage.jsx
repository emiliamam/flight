import React from 'react';
import { MapComponent, Dashboard } from '../components';

export const MapPage = ({ airports }) => {
  return <MapComponent airports={airports} />;
};