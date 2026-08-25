import React from 'react';
import { Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { AlertTriangle, Info, AlertOctagon, Flame } from 'lucide-react';

export default function HazardMarker({ ping, onClick }) {
  const getIconProps = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low': return { Component: Info, color: '#facc15' };
      case 'medium': return { Component: AlertTriangle, color: '#f97316' };
      case 'high': return { Component: AlertOctagon, color: '#ef4444' };
      case 'critical': return { Component: Flame, color: '#a855f7' };
      default: return { Component: AlertTriangle, color: '#06b6d4' };
    }
  };

  const { Component, color } = getIconProps(ping.severity);
  const iconMarkup = renderToStaticMarkup(
    <div style={{ color, filter: `drop-shadow(0 0 8px ${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
      <Component size={32} />
    </div>
  );

  const customIcon = L.divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  return (
    <Marker
      position={[ping.latitude, ping.longitude]}
      icon={customIcon}
      eventHandlers={{ click: () => onClick(ping) }}
    />
  );
}
