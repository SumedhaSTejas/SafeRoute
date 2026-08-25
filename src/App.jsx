import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import PingDetails from './components/PingDetails';
import PingForm from './components/PingForm';
import DemoControls from './components/DemoControls';
import { getPings, seedDemoData } from './services/storage';
import { Plus, X } from 'lucide-react';

function App() {
  const [pings, setPings] = useState([]);
  const [selectedPing, setSelectedPing] = useState(null);

  const [isReportingMode, setIsReportingMode] = useState(false);
  const [newPingLocation, setNewPingLocation] = useState(null);

  // load the demo data if there is no data in local storage
  useEffect(() => {
    seedDemoData();
    refreshPings();
  }, []);

  const refreshPings = () => {
    setPings(getPings());
  };

  const handlePingSelect = (ping) => {
    setIsReportingMode(false);
    setNewPingLocation(null);
    setSelectedPing(ping);
  };

  const handleStartReport = () => {
    setSelectedPing(null);
    setIsReportingMode(true);
    setNewPingLocation(null);
  };

  const handleLocationSelect = (latLng) => {
    setNewPingLocation({ lat: latLng.lat, lng: latLng.lng });
  };

  const handlePingSaved = (newPing) => {
    refreshPings();
    setIsReportingMode(false);
    setNewPingLocation(null);
    setSelectedPing(newPing);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Navbar />

      <main className="flex-1 relative w-full h-full">{/* load map*/}
        <div className="absolute inset-0 z-0">
          <MapView
            pings={pings}
            onPingSelect={handlePingSelect}
            isReportingMode={isReportingMode}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        {/* adds ui layer on map */}
        <div className="absolute inset-0 pointer-events-none z-[1000] flex flex-col justify-between">

          <div className="relative pointer-events-none h-full">
            {/* control option on the top right */}
            <div className="pointer-events-auto">
              <DemoControls onReset={refreshPings} />
            </div>

            {/* load the selected ping details */}
            {selectedPing && (
              <div className="pointer-events-auto">
                <PingDetails
                  ping={selectedPing}
                  onClose={() => setSelectedPing(null)}
                />
              </div>
            )}

            {/* add the location selection */}
            {isReportingMode && !newPingLocation && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-cyan-600/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg font-semibold animate-bounce border border-cyan-400 pointer-events-none">
                Tap on the map to place a hazard
              </div>
            )}

            {/* load ping form after selecting the location */}
            {isReportingMode && newPingLocation && (
              <div className="pointer-events-auto">
                <PingForm
                  location={newPingLocation}
                  onClose={() => {
                    setIsReportingMode(false);
                    setNewPingLocation(null);
                  }}
                  onSave={handlePingSaved}
                />
              </div>
            )}
          </div>

          {/* action bar at bottom of page */}
          <div className="pointer-events-auto p-6 flex justify-center pb-8 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
            {!isReportingMode && (
              <button
                onClick={handleStartReport}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 flex items-center gap-3 border border-cyan-400/30"
              >
                <Plus className="w-6 h-6" />
                <span className="text-lg tracking-wide uppercase">Report Hazard</span>
              </button>
            )}

            {isReportingMode && (
              <button
                onClick={() => {
                  setIsReportingMode(false);
                  setNewPingLocation(null);
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center gap-2 border border-gray-500"
              >
                <X className="w-5 h-5" />
                Cancel Report
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
