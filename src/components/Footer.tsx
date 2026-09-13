import React from 'react';
import { Wrench, PhoneCall, Mail, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { openBookingModal, openEmergencyModal } = usePlumbing();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aqua<span className="text-sky-400">Pro</span> Plumbing
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Licensed, bonded, and insured plumbing contractors providing 24/7 emergency leak repair, hydro-jetting, water heaters, and commercial facilities maintenance.
            </p>
            <div className="text-slate-500 text-[11px] space-y-1">
              <div>State Master Plumber License: #MP-882910</div>
              <div>Commercial Backflow Certification: #BF-44910</div>
              <div>General Liability Coverage: $2,000,000</div>
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
                  Services &amp; Pricing Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('blog')} 
                  className="hover:text-white transition-colors"
                >
                  Preventative Maintenance Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('testimonials')} 
                  className="hover:text-white transition-colors"
                >
                  Verified Client Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openBookingModal()} 
                  className="hover:text-white transition-colors"
                >
                  Schedule Service Online
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openEmergencyModal()} 
                  className="text-rose-400 hover:text-rose-300 transition-colors font-semibold"
                >
                  24/7 Emergency Dispatch Form
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className="text-sky-400 hover:text-sky-300 transition-colors font-semibold"
                >
                  Admin &amp; Operations Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Coverage Territory
            </h4>
            <p className="text-slate-400">
              Immediate mobile units dispatched throughout:
            </p>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Springfield Metro &amp; Downtown</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Oakwood Hills &amp; Westside Suburbs</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Harbor District &amp; Riverside</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>East Industrial &amp; Corporate Parks</span>
              </li>
            </ul>
          </div>

          {/* 24/7 Contact Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <a 
                href="tel:18005552782"
                className="flex items-center space-x-2 text-white font-bold text-base hover:text-sky-400 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>(800) 555-AQUA</span>
              </a>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>dispatch@aquaproplumbing.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>100 Pipeline Way, Suite 400, Springfield Metro</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                <Clock className="w-4 h-4" />
                <span>24 Hours / 7 Days / 365 Days a Year</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <div>
            &copy; {new Date().getFullYear()} AquaPro Plumbing &amp; Emergency Services. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Offline-First Architecture</span>
            <span>•</span>
            <span>Role-Based Access Control</span>
            <span>•</span>
            <span>Encrypted Snapshot Backups</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
