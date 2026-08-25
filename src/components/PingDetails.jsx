import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, Send } from 'lucide-react';
import { getReviews, saveReview } from '../services/storage';

export default function PingDetails({ ping, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');

  useEffect(() => {
    if (ping) {
      setReviews(getReviews(ping.id));
    }
  }, [ping]);

  if (!ping) return null;

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const review = saveReview({
      pingId: ping.id,
      text: newReviewText.trim()
    });
    
    setReviews([...reviews, review]);
    setNewReviewText('');
  };

  const severityColor = 
    ping.severity.toLowerCase() === 'high' || ping.severity.toLowerCase() === 'critical' 
      ? 'text-red-500' 
      : ping.severity.toLowerCase() === 'medium'
      ? 'text-orange-500'
      : 'text-yellow-400';

  const formattedDate = new Date(ping.createdAt).toLocaleDateString(undefined, { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  return (
    <div className="absolute top-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl shadow-cyan-500/10 border border-gray-700/50 flex flex-col max-h-[calc(100vh-8rem)] z-40 overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-start sticky top-0 bg-gray-900/90 z-10">
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${severityColor}`}>
            {ping.severity} RISK
          </div>
          <h2 className="text-xl font-bold text-gray-100">{ping.category}</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white bg-gray-800 p-1 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">{ping.title}</h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{ping.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{ping.latitude.toFixed(4)}, {ping.longitude.toFixed(4)}</span>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-300 flex items-center justify-between">
            <span>Reviews ({reviews.length})</span>
          </h4>
          
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
            {reviews.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No reviews yet. Be the first to report.</p>
            ) : (
              reviews.map(r => (
                <div key={r.id} className="bg-gray-800/50 p-3 rounded-lg text-sm text-gray-300 border border-gray-700/30">
                  "{r.text}"
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-700/50 bg-gray-900">
        <form onSubmit={handleAddReview} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Your observation..." 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!newReviewText.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
