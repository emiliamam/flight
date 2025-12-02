import React, { useMemo } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; // ← Map вместо MapContainer
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

const MapComponent = ({ airports = [], height = '800px' }) => {
  const iconCache = useMemo(() => {
    const cache = {};
    ['red', 'orange', 'green'].forEach(color => {
      cache[color] = L.divIcon({
        html: `<div style="
          background-color: ${color};
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 3px rgba(0,0,0,0.3);
        "></div>`,
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    });
    return cache;
  }, []);

  const getMarkerColor = (airport) => {
    const flights = airport['Кол-во вылетов'] ?? 0;
    if (flights > 1000) return 'red';
    if (flights > 500) return 'orange';
    return 'green';
  };

  const validAirports = useMemo(() => {
    return airports.filter(airport => {
      const lat = airport['Долгота']; // Поменяли местами!
      const lng = airport['Широта'];
      
      return lat != null && lng != null && 
             !isNaN(lat) && !isNaN(lng) &&
             lat >= -90 && lat <= 90 &&
             lng >= -180 && lng <= 180;
    });
  }, [airports]);

  if (validAirports.length === 0) {
    return (
      <div style={{ 
        width: '100%', 
        height: '800px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <h3>Нет данных для отображения карты</h3>
          <p>Проверьте координаты аэропортов</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: height }}>
      <Map // ← Map вместо MapContainer
        center={[55, 37]} 
        zoom={4} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true} 
        maxZoom={18}
        minZoom={2}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        
        {validAirports.map((airport, i) => {
          const lat = airport['Долгота']; // Поменяли местами!
          const lng = airport['Широта'];
          
          const color = getMarkerColor(airport);
          const icon = iconCache[color];

          return (
            <Marker 
              key={`${airport['IATA код'] || i}`} 
              position={[lat, lng]} 
              icon={icon}
            >
              <Popup>
                <div style={{ minWidth: '200px', fontSize: '14px' }}>
                  <b>{airport['Название аэропорта']}</b><br />
                  IATA: {airport['IATA код'] || '—'}<br />
                  Вылетов: {airport['Кол-во вылетов'] || 0}<br />
                  Прилетов: {airport['Кол-во прилетов'] || 0}<br />
                  Координаты: {lat?.toFixed(4)}, {lng?.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </Map> {/* ← Map вместо MapContainer */}

      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 15px',
          borderRadius: 8,
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          fontSize: '12px',
          lineHeight: '1.5',
          zIndex: 1000,
          maxWidth: '180px',
        }}
      >
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Количество вылетов:</div>
        <div><span style={{ color: 'red', fontWeight: 'bold' }}>●</span> &gt; 1000</div>
        <div><span style={{ color: 'orange', fontWeight: 'bold' }}>●</span> 501–1000</div>
        <div><span style={{ color: 'green', fontWeight: 'bold' }}>●</span> ≤ 500</div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
          Всего аэропортов: {validAirports.length}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;