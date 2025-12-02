// DelayChart.ui.jsx
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
  ComposedChart,
  Area,
  ReferenceLine
} from 'recharts';

/**
 * Компонент графика задержек рейсов
 * @param {Object} props
 * @param {Array} props.data - Массив данных о задержках по часам
 * @returns {JSX.Element}
 */
export const DelayChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#64748b',
        fontSize: '14px'
      }}>
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div style={{ height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            vertical={false}
          />
          <XAxis 
            dataKey="time" 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              fontSize: '13px'
            }}
            labelStyle={{ 
              color: '#1e293b',
              fontWeight: 600,
              marginBottom: '8px'
            }}
            formatter={(value, name) => {
              // Преобразуем английские ключи в русские названия
              const names = {
                onTime: 'Вовремя',
                delayed: 'С задержкой',
                canceled: 'Отменено'
              };
              return [`${value}`, names[name] || name];
            }}
          />
          <Legend 
            verticalAlign="top"
            height={40}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: '13px',
              color: '#475569'
            }}
            formatter={(value) => {
              const names = {
                onTime: 'Вовремя',
                delayed: 'С задержкой',
                canceled: 'Отменено'
              };
              return names[value] || value;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="onTime" 
            fill="#dbeafe" 
            stroke="#3b82f6" 
            name="onTime" 
            strokeWidth={2}
            fillOpacity={0.3}
          />
          <Line 
            type="monotone" 
            dataKey="delayed" 
            stroke="#f59e0b" 
            name="delayed" 
            strokeWidth={2}
            dot={{ strokeWidth: 2, stroke: '#f59e0b', fill: 'white', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="canceled" 
            stroke="#ef4444" 
            name="canceled" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ strokeWidth: 2, stroke: '#ef4444', fill: 'white', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <ReferenceLine y={0} stroke="#64748b" strokeWidth={1} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
DelayChart.propTypes = {
  data: (props, propName, componentName) => {
    const prop = props[propName];
    
    if (prop === undefined || prop === null) {
      return new Error(`Пропс '${propName}' обязателен в компоненте '${componentName}'`);
    }
    
    if (!Array.isArray(prop)) {
      return new Error(`Пропс '${propName}' должен быть массивом в компоненте '${componentName}'`);
    }
    
    if (prop.length > 0) {
      const firstItem = prop[0];
      const requiredFields = ['time', 'onTime', 'delayed', 'canceled'];
      
      for (const field of requiredFields) {
        if (!(field in firstItem)) {
          console.warn(`Элемент массива '${propName}' не имеет поля '${field}' в компоненте '${componentName}'`);
        }
      }
    }
    
    return null;
  }
};

DelayChart.defaultProps = {
  data: []
};
