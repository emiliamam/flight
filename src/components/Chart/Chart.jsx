import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import DirectionsCharts from './DirectionCharts/DirectionsCharts';
import PunctualityChartWithTable from './PunctualityChart/PunctualityChart';
import DelayCharts from './DelayCharts/DelayCharts';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('top3');
  const [top3Data, setTop3Data] = useState([]);
  const [directionData, setDirectionData] = useState([]);
  const [punctualityData, setPunctualityData] = useState([]);

  useEffect(() => {
    fetch('/api/get_top3')
      .then(res => res.json())
      .then(data => setTop3Data(data))
      .catch(console.error);

    fetch('/api/get_all_direction')
      .then(res => res.json())
      .then(data => setDirectionData(data))
      .catch(console.error);

    fetch('/api/get_airline_punctuality')
      .then(res => res.json())
      .then(data => setPunctualityData(data))
      .catch(console.error);
  }, []);


return (
  <div style={{ maxWidth: 1000, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>    
    <div style={{ display: 'flex', justifyContent: 'center', gap: 15 }}>
      <button
        onClick={() => setActiveTab('top3')}
        disabled={activeTab === 'top3'}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          cursor: activeTab === 'top3' ? 'default' : 'pointer',
          backgroundColor: activeTab === 'top3' ? '#00539c' : '#e0e0e0',
          color: activeTab === 'top3' ? 'white' : '#333',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#81c784';
        }}
        onMouseLeave={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#e0e0e0';
        }}
      >
        Задержки
      </button>

      <button
        onClick={() => setActiveTab('directions')}
        disabled={activeTab === 'directions'}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          cursor: activeTab === 'directions' ? 'default' : 'pointer',
          backgroundColor: activeTab === 'directions' ? '#00539c' : '#e0e0e0',
          color: activeTab === 'directions' ? 'white' : '#333',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#81c784';
        }}
        onMouseLeave={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#e0e0e0';
        }}
      >
        Направления
      </button>

      <button
        onClick={() => setActiveTab('punctuality')}
        disabled={activeTab === 'punctuality'}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          cursor: activeTab === 'punctuality' ? 'default' : 'pointer',
          backgroundColor: activeTab === 'punctuality' ? '#00539c' : '#e0e0e0',
          color: activeTab === 'punctuality' ? 'white' : '#333',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#81c784';
        }}
        onMouseLeave={e => {
          if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#e0e0e0';
        }}
      >
        Авиакомпании
      </button>
    </div>

    {activeTab === 'top3' && (<DelayCharts />
    )}

{activeTab === 'directions' && ( <DirectionsCharts/>
)}
    {activeTab === 'punctuality' && (
      <PunctualityChartWithTable />
    )}
  </div>
);

};

export default Analytics;
