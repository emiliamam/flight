import { useState, useEffect } from 'react';
import { Flight } from '../../entities/flight/flight.types';
import { flightApi } from '../api/flight';
import { calculateFlightStats } from '../lib/calculateStats.utils';

export const useFlightStats = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFlights = async () => {
      try {
        setLoading(true);
        const data = await flightApi.getFlights(500);
        setFlights(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Ошибка загрузки рейсов:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, []);

  const stats = calculateFlightStats(flights);

  return {
    flights,
    loading,
    error,
    ...stats
  };
};