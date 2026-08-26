import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { savePing } from '../services/storage';

export default function PingForm({ location, onClose, onSave }) {
  const [category, setCategory] = useState('Accident Prone');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newPing = savePing({
      latitude: location.lat,
      longitude: location.lng,
      category,
      title,
      description,
      severity
    });
    
    onSave(newPing);
  };

  const categories = [
    'Accident Prone', 'Dangerous Road', 'Poor Lighting', 
    'Isolated Area', 'Wild Animal Sightings', 'Road Damage', 'Other'
  ];

  return (
    <div className="absolute top-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl shadow-cyan-500/10 border border-gray-700/50 flex flex-col z-40 overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/90">
        <h2 className="text-lg font-bold text-cyan-400">Report Hazard</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white bg-gray-800 p-1 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 text-xs text-gray-400 bg-gray-800/30 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-cyan-500" />
        <span>Selected Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
          <input 
            type="text" 
            required
            placeholder="E.g., Pothole on main street"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
          <textarea 
            required
            rows={3}
            placeholder="Details about the hazard..."
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Severity</label>
          <div className="flex gap-2">
            {['Low', 'Medium', 'High', 'Critical'].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setSeverity(level)}
                className={`flex-1 py-1.5 text-xs rounded-md border font-medium transition-colors
                  ${severity === level 
                    ? (level === 'High' || level === 'Critical' ? 'bg-red-500/20 border-red-500 text-red-400' 
                      : level === 'Medium' ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                      : 'bg-yellow-500/20 border-yellow-500 text-yellow-400') 
                    : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="mt-2 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-lg transition-colors shadow-lg shadow-cyan-900/50"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
