import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export default function SOSConfirmation({ onClose }) {
  const [locationStr, setLocationStr] = useState('Detecting location...');
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStr(`Latitude: ${position.coords.latitude.toFixed(4)}, Longitude: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          setLocationStr('Location unavailable. Proceeding with emergency call.');
        },
        { timeout: 5000 }
      );
    } else {
      setLocationStr('Location unavailable.');
    }
  }, []);

  const handleCall = () => {
    const sosNumber = import.meta.env.VITE_SOS_NUMBER || '---';
    window.location.href = `tel:${sosNumber}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-900 border border-red-500 rounded-xl p-6 max-w-sm w-full shadow-2xl shadow-red-500/20">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-red-500">TRIGGER SOS?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">
          Are you sure you want to trigger SOS? Your emergency call will be initiated.
        </p>

        <div className="bg-gray-800 p-3 rounded-md mb-6 text-sm font-mono text-cyan-400">
          {locationStr}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleCall}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-5 h-5" />
            CALL HELP
          </button>
        </div>
      </div>
    </div>
  );
}
