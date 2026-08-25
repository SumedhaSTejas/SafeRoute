import React, { useState } from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import SOSConfirmation from './SOSConfirmation';

export default function Navbar() {
  const [showSOS, setShowSOS] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-md p-4 flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-cyan-500 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wide">SafeRoute</h1>
        </div>
        
        <button 
          onClick={() => setShowSOS(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-colors shadow-lg animate-pulse"
        >
          <AlertCircle className="w-5 h-5" />
          <span>SOS</span>
        </button>
      </nav>

      {showSOS && <SOSConfirmation onClose={() => setShowSOS(false)} />}
    </>
  );
}
