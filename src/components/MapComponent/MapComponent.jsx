import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ airports = [] }) => {
  const getMarkerColor = (airport) => {
    const flights = airport['Кол-во вылетов'] ?? 0;
    if (flights > 1000) return 'red';
    if (flights > 500) return 'orange';
    return 'green';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '900px' }}>
      <MapContainer center={[55, 37]} zoom={5} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
        {airports.map((airport, i) => {
          const lat = airport['Долгота'];
          const lng = airport['Широта'];
          if (lat == null || lng == null) return null;
  
          const color = getMarkerColor(airport);
  
          const icon = L.divIcon({
            html: `<div style="
              background-color: ${color};
              width: 20px; height: 20px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 0 5px rgba(0,0,0,0.5);
            "></div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });
  
          return (
            <Marker key={i} position={[lat, lng]} icon={icon}>
              <Popup>
                <b>{airport['Название аэропорта']}</b><br />
                IATA: {airport['IATA код'] || '—'}<br />
                Вылетов: {airport['Кол-во вылетов']}<br />
                Прилетов: {airport['Кол-во прилетов']}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
  
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 60,
          backgroundColor: 'white',
          padding: '10px 15px',
          borderRadius: 8,
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          fontSize: 14,
          lineHeight: '1.6',
          zIndex: 1000,
        }}
      >
        <div><span style={{ color: 'red', fontWeight: 'bold' }}>●</span> &gt; 1000 вылетов</div>
        <div><span style={{ color: 'orange', fontWeight: 'bold' }}>●</span> 501–1000 вылетов</div>
        <div><span style={{ color: 'green', fontWeight: 'bold' }}>●</span> ≤ 500 вылетов</div>
      </div>
    </div>
  );
};

export default MapComponent;
