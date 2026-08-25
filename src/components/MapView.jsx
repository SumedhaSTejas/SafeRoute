import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap, CircleMarker } from 'react-leaflet';
import HazardMarker from './HazardMarker';
import { LocateFixed } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const MapEvents = ({ isReportingMode, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      if (isReportingMode) {
        onLocationSelect(e.latlng);
      }
    },
  });
  return null;
};

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);
  return null;
};

export default function MapView({
  pings,
  onPingSelect,
  isReportingMode,
  onLocationSelect
}) {
  const [userLocation, setUserLocation] = useState({ lat: 30.8643, lng: 77.1187 }); // Shoolini University location to be able to pinpoint map on correct location
  const [actualUserLocation, setActualUserLocation] = useState(null);

  // load user location while having map centered on university location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setActualUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => { } // prevent errors if permission is not granted by user to access location
      );
    }
  }, []);

  const handleRecenter = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLoc);
          setActualUserLocation(newLoc);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please check permissions.");
        }
      );
    }
  };

  return (
    <div className="w-full h-full relative dark-osm" style={{ background: '#242f3e' }}>
      {/* Leaflet map needs a defined height/width container which is provided by the parent via w-full h-full, 
          but we also set it inline on MapContainer to be safe */}
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        {/* Standard OSM tile layer which shows all landmarks (inverted via CSS to be dark) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents
          isReportingMode={isReportingMode}
          onLocationSelect={onLocationSelect}
        />

        <MapController center={userLocation} />

        {/* Current user location blue dot */}
        {actualUserLocation && (
          <CircleMarker
            center={[actualUserLocation.lat, actualUserLocation.lng]}
            pathOptions={{ color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 0.8, weight: 2 }}
            radius={7}
          />
        )}

        {pings.map(ping => (
          <HazardMarker
            key={ping.id}
            ping={ping}
            onClick={onPingSelect}
          />
        ))}
      </MapContainer>

      {/* Note: Leaflet's z-index for UI elements needs to be higher than 400 (leaflet panes are around 400). */}
      <button
        onClick={handleRecenter}
        className="absolute bottom-6 right-6 bg-gray-900/90 hover:bg-gray-800 text-cyan-500 p-3 rounded-full shadow-lg border border-gray-700/50 transition-colors backdrop-blur-sm z-[1000]"
        title="Recenter to my location"
      >
        <LocateFixed className="w-6 h-6" />
      </button>
    </div>
  );
}
