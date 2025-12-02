import React from 'react';
import { useFlightStats } from '../shared/hooks/useFlightStats';
import { StatsOverview } from '../widgets/ui/StatsOverview.ui';
import { DelayChart } from '../widgets/ui/DelayChart.ui';

export const PunctualityDashboard = () => {
  const { loading, error, summary, hourlyStats } = useFlightStats();

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Ситуационный центр пунктуальности</h2>
      
      <StatsOverview stats={summary} />
      
      <h3 style={{ marginTop: 40 }}>Динамика задержек за день</h3>
      <DelayChart data={hourlyStats} />
    </div>
  );
};

export default PunctualityDashboard;