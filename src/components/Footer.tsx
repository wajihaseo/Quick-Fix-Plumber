import React from 'react';
import { Wrench, PhoneCall, Mail, MapPin, ShieldCheck, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { openBookingModal, openEmergencyModal, openWhatsApp, selectedCity } = usePlumbing();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Kwik<span className="text-sky-400">Fix</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Pakistan
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Pakistan's most trusted on-demand plumbing and home repair marketplace. Background-verified Ustads, upfront flat rates, 45-minute doorstep dispatch, and an official 7-day rework guarantee.
            </p>
            <div className="text-slate-500 text-[11px] space-y-1">
              <div>NADRA CNIC Verification Enforced</div>
              <div>Standardized Rate Card in PKR</div>
              <div>7-Day Return Rework Warranty</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('home')} 
                  className="hover:text-white transition-colors"
                >
                  Services &amp; Rates Card
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('blog')} 
                  className="hover:text-white transition-colors"
                >
                  Plumbing DIY &amp; Maintenance Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('testimonials')} 
                  className="hover:text-white transition-colors"
                >
                  Verified Customer Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openBookingModal()} 
                  className="hover:text-white transition-colors"
                >
                  Book Service in 60 Seconds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openEmergencyModal()} 
                  className="text-rose-400 hover:text-rose-300 transition-colors font-semibold"
                >
                  45-Min Emergency Callout
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className="text-sky-400 hover:text-sky-300 transition-colors font-semibold"
                >
                  Operations &amp; Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              City Coverage
            </h4>
            <p className="text-slate-400">
              Mobile technician teams stationed across:
            </p>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong>Karachi:</strong> DHA, Clifton, Gulshan, PECHS, Bahria</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong>Lahore:</strong> Gulberg, DHA, Model Town, Johar Town</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong>Islamabad:</strong> F-6, F-7, F-8, Blue Area, Bahria Town</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Active City Now: <strong className="text-white">{selectedCity}</strong></span>
              </li>
            </ul>
          </div>

          {/* 24/7 Contact Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Helpline &amp; WhatsApp
            </h4>
            <div className="space-y-2.5">
              <a 
                href="tel:03005945349"
                className="flex items-center space-x-2 text-white font-bold text-base hover:text-sky-400 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>0300-5945349</span>
              </a>

              <button
                onClick={() => openWhatsApp('AoA KwikFix, I need customer support.')}
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +92 300 5945349</span>
              </button>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>support@kwikfix.pk</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>KwikFix Central Hub, Main Shahrah-e-Faisal, Karachi</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                <Clock className="w-4 h-4" />
                <span>45-Min Response • 24/7 Emergency Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} KwikFix Pakistan. All rights reserved. Transparent, Verified &amp; Guaranteed.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('admin')} className="hover:text-slate-300">Admin Login</button>
            <span>•</span>
            <button onClick={() => openBookingModal()} className="hover:text-slate-300">Book Ustad</button>
            <span>•</span>
            <button onClick={() => openWhatsApp()} className="text-emerald-400 hover:text-emerald-300">WhatsApp Help</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
