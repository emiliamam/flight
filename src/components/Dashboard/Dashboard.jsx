import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './Dashboard.css';


// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const [topAirlines, setTopAirlines] = useState([]);
  const [airlinePunctuality, setAirlinePunctuality] = useState([]);
  const [airports, setAirports] = useState([]);
  const [delayHistogram, setDelayHistogram] = useState({});
  const [cancellations, setCancellations] = useState([]);
  const [delayRules, setDelayRules] = useState([]);
  const [flightDirections, setFlightDirections] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [minFlights, setMinFlights] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        topResponse,
        punctualityResponse,
        airportsResponse,
        histogramResponse,
        cancellationsResponse,
        rulesResponse,
        directionsResponse
      ] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/get_top3'),
        fetch('http://127.0.0.1:8000/api/get_airline_punctuality'),
        fetch('http://127.0.0.1:8000/api/get_airports'),
        fetch('http://127.0.0.1:8000/api/delay_histogram'),
        fetch('http://127.0.0.1:8000/api/cancellations_distribution'),
        fetch('http://127.0.0.1:8000/api/delay-rules/top?top_n=10'),
        fetch('http://127.0.0.1:8000/api/get_all_direction')
      ]);

      const topData = await topResponse.json();
      const punctualityData = await punctualityResponse.json();
      const airportsData = await airportsResponse.json();
      const histogramData = await histogramResponse.json();
      const cancellationsData = await cancellationsResponse.json();
      const rulesData = await rulesResponse.json();
      const directionsData = await directionsResponse.json();

      setTopAirlines(topData);
      setAirlinePunctuality(punctualityData);
      setAirports(airportsData);
      setDelayHistogram(histogramData[0] || {});
      setCancellations(cancellationsData);
      setDelayRules(rulesData);
      setFlightDirections(directionsData);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshRules = async () => {
    try {
      await fetch('/api/delay-rules/refresh', { method: 'POST' });
      alert('Анализ правил запущен. Обновите страницу через несколько минут.');
    } catch (error) {
      console.error('Error refreshing rules:', error);
    }
  };

  const topAirlinesChartData = {
    labels: topAirlines.map(airline => airline.airline_name),
    datasets: [
      {
        label: 'Рейтинг отправления',
        data: topAirlines.map(airline => airline.rating_departure),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Рейтинг прибытия',
        data: topAirlines.map(airline => airline.rating_arrival),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const delayHistogramChartData = {
    labels: ['0-10 минут', '11-20 минут', '21-30 минут', '31-120 минут', '>120 минут'],
    datasets: [
      {
        label: 'Количество задержек',
        data: [
          delayHistogram['0-10 минут'] || 0,
          delayHistogram['11-20 минут'] || 0,
          delayHistogram['21-30 минут'] || 0,
          delayHistogram['31-120 минут'] || 0,
          delayHistogram['>120 минут'] || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const cancellationsChartData = {
    labels: cancellations.slice(0, 10).map(item => item.airlines),
    datasets: [
      {
        label: 'Количество отмен',
        data: cancellations.slice(0, 10).map(item => item.cancellations),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const filteredPunctuality = airlinePunctuality.filter(
    item => item['Количество рейсов'] >= minFlights
  );

  const punctualityChartData = {
    labels: filteredPunctuality.map(item => item.Авиакомпания),
    datasets: [
      {
        label: 'Пунктуальность отправления (%)',
        data: filteredPunctuality.map(item => item.Отправление),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Пунктуальность прибытия (%)',
        data: filteredPunctuality.map(item => item.Прибытие),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Аналитика пунктуальности авиакомпаний</h1>
        <div className="header-controls">
          <button onClick={loadAllData} className="refresh-btn">
            Обновить данные
          </button>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Обзор
        </button>
        <button 
          className={activeTab === 'airlines' ? 'active' : ''}
          onClick={() => setActiveTab('airlines')}
        >
          Авиакомпании
        </button>
        <button 
          className={activeTab === 'airports' ? 'active' : ''}
          onClick={() => setActiveTab('airports')}
        >
          Аэропорты
        </button>
      </nav>

      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="cards-grid">
            <div className="card">
              <h3>Распределение задержек</h3>
              <div className="chart-container">
                <Doughnut
                  data={delayHistogramChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                    },
                  }}
                />
              </div>
            </div>

            <div className="card">
              <h3>Топ-10 по отменам рейсов</h3>
              <div className="chart-container">
                <Bar
                  data={cancellationsChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'airlines' && (
        <div className="airlines-tab">
          <div className="filter-controls">
            <label>
              Минимальное количество рейсов для отображения:
              <input
                type="range"
                min="0"
                max="5000"
                value={minFlights}
                onChange={(e) => setMinFlights(Number(e.target.value))}
              />
              <span>{minFlights}</span>
            </label>
          </div>

          <div className="chart-container large">
            <Bar
              data={punctualityChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 100,
                    title: { display: true, text: 'Пунктуальность (%)' },
                  },
                  x: {
                    ticks: {
                      maxRotation: 90,
                      minRotation: 45,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="table-container">
            <h3>Детальная информация по авиакомпаниям</h3>
            <table>
              <thead>
                <tr>
                  <th>Авиакомпания</th>
                  <th>Код</th>
                  <th>Количество рейсов</th>
                  <th>Отмены</th>
                  <th>Пунктуальность отправления (%)</th>
                  <th>Пунктуальность прибытия (%)</th>
                </tr>
              </thead>
              <tbody>
                {filteredPunctuality.map((item, i) => (
                  <tr key={i}>
                    <td>{item.Авиакомпания}</td>
                    <td>{item.Код}</td>
                    <td>{item['Количество рейсов']}</td>
                    <td>{item.Отмены}</td>
                    <td>{item.Отправление.toFixed(1)}</td>
                    <td>{item.Прибытие.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'airports' && (
        <div className="airports-tab">
          <div className="table-container">
            <h3>Информация по аэропортам</h3>
            <table>
              <thead>
                <tr>
                  <th>IATA код</th>
                  <th>Название аэропорта</th>
                  <th>Долгота</th>
                  <th>Широта</th>
                  <th>Кол-во вылетов</th>
                  <th>Кол-во прилетов</th>
                  <th>Всего рейсов</th>
                </tr>
              </thead>
              <tbody>
                {airports.map((airport, i) => (
                  <tr key={i}>
                    <td>{airport['IATA код']}</td>
                    <td>{airport['Название аэропорта']}</td>
                    <td>{airport['Долгота']?.toFixed(4)}</td>
                    <td>{airport['Широта']?.toFixed(4)}</td>
                    <td>{airport['Кол-во вылетов']}</td>
                    <td>{airport['Кол-во прилетов']}</td>
                    <td>
                      {(airport['Кол-во вылетов'] || 0) + (airport['Кол-во прилетов'] || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;