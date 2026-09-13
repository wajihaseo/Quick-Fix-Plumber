import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  BadgeDollarSign, 
  Star, 
  ArrowRight, 
  AlertTriangle, 
  Building, 
  Home, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const HeroSection: React.FC = () => {
  const { openBookingModal, openEmergencyModal } = usePlumbing();

  const quickSymptoms = [
    { label: 'Burst Pipe & Active Leak', action: 'Emergency Pipe Leak & Burst Repair', isEmergency: true },
    { label: 'Clogged Drain & Backups', action: 'Hydro-Jetting & Severe Drain Cleaning', isEmergency: false },
    { label: 'Water Heater No Hot Water', action: 'Water Heater Installation & Repair', isEmergency: false },
    { label: 'Commercial Backflow & Grease', action: 'Commercial Backflow Prevention & Certification', isEmergency: false }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-12 sm:py-16 lg:py-20 transition-colors">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-sky-500"></span>
              <span>Trusted by 3,400+ Local Homes &amp; Commercial Facilities</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Master Plumbing Solutions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500">
                Home &amp; Business
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Fast, licensed emergency dispatch and scheduled maintenance across your region. 
              Enjoy 100% upfront flat-rate pricing, zero hidden travel fees, and our ironclad 1-year workmanship guarantee.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-emergency-btn"
                onClick={openEmergencyModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-sm sm:text-base border border-rose-200 dark:border-rose-900/60 shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span>Emergency 24/7 Dispatch</span>
              </button>
            </div>

            {/* Quick symptom pills */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                Common Plumbing Inquiries:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {quickSymptoms.map((symptom, idx) => (
                  <button
                    key={idx}
                    onClick={() => symptom.isEmergency ? openEmergencyModal() : openBookingModal(symptom.action)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-950 hover:text-sky-700 dark:hover:text-sky-300 transition-colors border border-slate-300/50 dark:border-slate-700/60"
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-left">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Licensed &amp; Insured</div>
                  <div className="text-[11px] text-slate-500">$2M General Liability</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeDollarSign className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Upfront Flat Rates</div>
                  <div className="text-[11px] text-slate-500">No Hidden Add-ons</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">&lt; 30m Response</div>
                  <div className="text-[11px] text-slate-500">Emergency Dispatches</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">4.96 ★ Verified</div>
                  <div className="text-[11px] text-slate-500">1,200+ Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xl relative backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    Direct Booking Portal
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Need a Plumber Today?
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Slots Open Today
                </span>
              </div>

              {/* Service Type Cards */}
              <div className="space-y-3">
                <div 
                  onClick={() => openBookingModal(undefined)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 bg-slate-50 dark:bg-slate-800/60 cursor-pointer transition-all hover:bg-sky-50/50 dark:hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                        <Home className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Residential Plumbing</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pipes, drains, heaters, fixtures &amp; filters</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center">
                      From $140 <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => openBookingModal('Commercial Backflow Prevention & Certification')}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 bg-slate-50 dark:bg-slate-800/60 cursor-pointer transition-all hover:bg-sky-50/50 dark:hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Commercial &amp; Facilities</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Grease traps, backflow, code compliance</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center">
                      From $320 <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>

                <div 
                  onClick={openEmergencyModal}
                  className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-800/80 bg-rose-50/50 dark:bg-rose-950/20 hover:border-rose-400 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">24/7 Urgent Dispatch</h4>
                        <p className="text-xs text-rose-700/80 dark:text-rose-300/80">Active leaks, floods &amp; broken mains</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center">
                      Immediate <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees checklist */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Licensed Master Plumbers with fully stocked service trucks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Transparent digital estimates before any tool touches a pipe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated SMS &amp; email arrival tracking for zero guessing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
