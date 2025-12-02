import React from 'react';

interface StatsCardProps {
  label: string;
  value: number;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

const getColor = (color: string) => {
  switch (color) {
    case 'green': return '#34c38f';
    case 'yellow': return '#f1b44c';
    case 'red': return '#f46a6a';
    case 'blue': return '#556ee6';
    default: return '#ccc';
  }
};

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => (
  <div style={{
    flex: '1 1 200px',
    backgroundColor: getColor(color),
    color: 'white',
    padding: '15px 20px',
    borderRadius: 12,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  }}>
    <div style={{ fontSize: 18, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 'bold' }}>{value} рейсов</div>
  </div>
);