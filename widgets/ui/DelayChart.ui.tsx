import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { DelayByHour } from '../../entities/flight/flight.types';

interface DelayChartProps {
  data: DelayByHour[];
}

export const DelayChart: React.FC<DelayChartProps> = ({ data }) => (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="onTime" stroke="#34c38f" name="Вовремя" strokeWidth={3} />
        <Line type="monotone" dataKey="delayed" stroke="#f1b44c" name="С задержкой" strokeWidth={3} />
        <Line type="monotone" dataKey="canceled" stroke="#f46a6a" name="Отменены" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);