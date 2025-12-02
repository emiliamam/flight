import React from 'react';
import { StatsCard } from './StatisticsCard.ui';
import { FlightStats } from '../../entities/flight/flight.types';

interface StatsOverviewProps {
  stats: FlightStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const summaryData = [
    { label: 'Вылетели вовремя', value: stats.onTime, color: 'green' as const },
    { label: 'С задержкой', value: stats.delayed, color: 'yellow' as const },
    { label: 'Отменены', value: stats.canceled, color: 'red' as const },
    { label: 'Рейсов в воздухе сейчас', value: stats.inAir, color: 'blue' as const },
  ];

  return (
    <div style={{ display: 'flex', gap: 20, marginBottom: 30, flexWrap: 'wrap' }}>
      {summaryData.map((item) => (
        <StatsCard
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
        />
      ))}
    </div>
  );
};