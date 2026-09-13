import React from 'react';
import { AlertOctagon, PhoneCall, Clock, ShieldCheck, Zap } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const EmergencyBanner: React.FC = () => {
  const { openEmergencyModal } = usePlumbing();

  return (
    <div className="relative bg-gradient-to-r from-rose-900 via-red-900 to-amber-950 text-white border-b border-rose-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
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
                  Active Plumbing Emergency?
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white">
                  &lt; 30 Min Response
                </span>
              </div>
              <p className="text-xs text-rose-200/90 font-normal">
                Burst pipes, gas water heater leaks, severe sewer backups &amp; commercial shutoffs dispatched immediately.
              </p>
            </div>
          </div>

          {/* Right action triggers */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            <button
              id="emergency-dispatch-btn"
              onClick={openEmergencyModal}
              className="px-4 py-2 rounded-lg bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs sm:text-sm shadow transition-all hover:scale-[1.02] flex items-center space-x-1.5"
            >
              <Clock className="w-4 h-4 text-rose-600" />
              <span>Instant Dispatch Form</span>
            </button>

            <a
              id="emergency-hotline-btn"
              href="tel:18005552782"
              className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm border border-rose-500 shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-rose-200" />
              <span>(800) 555-AQUA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
