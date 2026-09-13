import React from 'react';
import { AlertOctagon, PhoneCall, Clock, Zap, MessageCircle } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const EmergencyBanner: React.FC = () => {
  const { openEmergencyModal, selectedCity, openWhatsApp } = usePlumbing();

  return (
    <div className="relative bg-gradient-to-r from-rose-900 via-red-900 to-slate-950 text-white border-b border-rose-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left info badge */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="p-2 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-300 animate-pulse shrink-0">
              <AlertOctagon className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-300 inline" />
                  Water Emergency in {selectedCity}?
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white">
                  45-Min Arrival SLA
                </span>
              </div>
              <p className="text-xs text-rose-200/90 font-normal">
                Concealed pipe burst, burnt water motor, overflowing roof tank or chocked main sewer line. Rapid response team ready.
              </p>
            </div>
          </div>

          {/* Right action triggers */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              id="emergency-dispatch-btn"
              onClick={openEmergencyModal}
              className="px-3.5 py-1.5 sm:py-2 rounded-lg bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs sm:text-sm shadow transition-all hover:scale-[1.02] flex items-center space-x-1.5"
            >
              <Clock className="w-4 h-4 text-rose-600" />
              <span>Callout Form</span>
            </button>

            <button
              onClick={() => openWhatsApp('EMERGENCY: I need an urgent plumber right now for pipe burst / water motor!')}
              className="px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow flex items-center space-x-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <a
              id="emergency-hotline-btn"
              href="tel:03005945349"
              className="px-3.5 py-1.5 sm:py-2 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm border border-rose-500 shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-rose-200" />
              <span>0300-5945349</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
