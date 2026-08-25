import React, { useState } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { resetDemoData } from '../services/storage';

export default function DemoControls({ onReset }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    if (window.confirm("This will delete all local pings and reviews, and restore the default demo data. Continue?")) {
      resetDemoData();
      onReset();
      setIsOpen(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-40">
      {isOpen ? (
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 flex flex-col gap-2">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 p-2 rounded transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Demo Data
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs text-gray-500 hover:text-gray-300 text-right mt-1"
          >
            Close
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gray-900/80 hover:bg-gray-800 text-gray-400 p-2 rounded-full backdrop-blur-sm transition-colors border border-gray-700/50"
          title="Demo Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
