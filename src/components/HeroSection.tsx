import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  BadgeDollarSign, 
  Star, 
  ArrowRight, 
  AlertTriangle, 
  Search,
  CheckCircle2,
  Calendar,
  Wrench,
  Flame,
  Activity,
  Droplets,
  Sparkles,
  MapPin,
  MessageCircle,
  PhoneCall,
  UserCheck,
  Zap
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const HeroSection: React.FC = () => {
  const { 
    openBookingModal, 
    openEmergencyModal, 
    selectedCity, 
    setSelectedCity,
    openWhatsApp,
    searchFilter,
    setSearchFilter,
    services
  } = usePlumbing();

  const [localSearch, setLocalSearch] = useState(searchFilter);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilter(localSearch);
    // Smooth scroll to services
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const POPULAR_KWIKFIX_SERVICES = [
    { name: 'Water Motor & Suction Pump', price: 'Rs. 1,400', icon: Activity, tag: 'Most Booked' },
    { name: 'Instant Geyser Repair & Fitting', price: 'Rs. 1,200', icon: Flame, tag: 'Winter Essential' },
    { name: 'Tap, Mixer & Muslim Shower', price: 'Rs. 450', icon: Wrench, tag: 'Fast 30m' },
    { name: 'Underground Tank Cleaning', price: 'Rs. 2,999', icon: Sparkles, tag: 'Hygiene Deal' },
    { name: 'Commode & Flush Tank Repair', price: 'Rs. 850', icon: CheckCircle2, tag: 'Sanitary' },
    { name: 'Hidden Pipe Seepage Acoustic Check', price: 'Rs. 2,500', icon: Search, tag: 'No Tile Break' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 pt-8 pb-12 sm:pt-12 sm:pb-16 transition-colors">
      {/* Subtle background motif */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified Plumbers On-Demand in {selectedCity}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Pakistan's Trusted Plumbers at Your Doorstep in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600">
              45 Minutes
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            NADRA CNIC-verified Ustads, transparent upfront pricing in PKR, and an official 7-day rework guarantee. No haggling, zero hidden fees.
          </p>
        </div>

        {/* Quick Search & Instant Booking Bar (KwikFix signature UI) */}
        <div className="max-w-3xl mx-auto mb-10">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 items-center"
          >
            {/* City Selector within Search */}
            <div className="flex items-center px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 w-full sm:w-auto shrink-0">
              <MapPin className="w-4 h-4 text-rose-500 mr-1.5 shrink-0" />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none focus:outline-none cursor-pointer font-bold pr-1 text-slate-900 dark:text-white"
              >
                <option value="Karachi" className="dark:bg-slate-900">Karachi</option>
                <option value="Lahore" className="dark:bg-slate-900">Lahore</option>
                <option value="Islamabad" className="dark:bg-slate-900">Islamabad</option>
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setSearchFilter(e.target.value);
                }}
                placeholder="What plumbing issue do you have? (e.g. Water motor, geyser, leak)"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex w-full sm:w-auto gap-2">
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              <button
                type="button"
                onClick={() => openBookingModal()}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>
          </form>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Quick Pick:</span>
            {POPULAR_KWIKFIX_SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button
                  key={idx}
                  onClick={() => openBookingModal(s.name)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 shadow-2xs group"
                >
                  <Icon className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{s.name.split('&')[0].trim()}</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1 rounded text-slate-500 dark:text-slate-400 font-mono">
                    {s.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Showcase: Interactive Booking Card vs Trust Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Popular Services Quick Cards */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Instant Home Plumbing Services
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparent PKR rate card with genuine spare parts warranty
                  </p>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('services-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  View All Rates <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_KWIKFIX_SERVICES.slice(0, 4).map((srv, idx) => {
                  const Icon = srv.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => openBookingModal(srv.name)}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 bg-slate-50/70 dark:bg-slate-800/60 cursor-pointer transition-all hover:bg-sky-50/50 dark:hover:bg-slate-800 group relative"
                    >
                      <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                        {srv.tag}
                      </span>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-2xs group-hover:scale-110 transition-transform shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {srv.name}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                              From {srv.price}
                            </span>
                            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold group-hover:underline flex items-center">
                              Book &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick action bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Pay securely after inspection via <strong>Cash, JazzCash, or Bank Transfer</strong></span>
              </div>
              <button
                onClick={() => openWhatsApp('Hi KwikFix, please share your complete plumbing rate card and plumber availability.')}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Rate Card
              </button>
            </div>
          </div>

          {/* Right Column: Why KwikFix vs Street Plumbers (The KwikFix Value Proposition) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  The KwikFix Guarantee
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600/90 text-white">
                  7-Day Rework Free
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Why Thousands Choose KwikFix Over Street Plumbers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Stop worrying about unknown roadside mechanics damaging your expensive sanitary fittings, overcharging, or disappearing when a leak returns.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <UserCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs">100% NADRA Verified Plumbers</strong>
                    <span className="text-slate-300 text-[11px]">
                      Every technician's CNIC, criminal record, and residential address are checked before field onboarding.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <BadgeDollarSign className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs">Standardized Rate Card</strong>
                    <span className="text-slate-300 text-[11px]">
                      Transparent PKR price approved before work starts. Zero surprise bill inflation.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs">45-Minute Rapid Doorstep Arrival</strong>
                    <span className="text-slate-300 text-[11px]">
                      Local technicians stationed across DHA, Clifton, Gulberg, Model Town, F-7, and Blue Area.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct helpline buttons */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex gap-2">
              <a
                href="tel:03005945349"
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 0300-5945349</span>
              </a>

              <button
                onClick={() => openEmergencyModal()}
                className="px-3.5 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                title="Emergency 45-min dispatch"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step "How KwikFix Works" Bar (Decent, friendly, intuitive) */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-6">
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
              How KwikFix Works in 3 Simple Steps
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Booking your plumbing repair takes less than 60 seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Choose Service &amp; Time</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select your plumbing problem, enter your address in {selectedCity}, and choose your preferred slot.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Verified Ustad Arrives</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Our background-checked technician arrives equipped with specialized tools and provides an upfront diagnosis.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Inspect &amp; Pay Safely</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verify the repair with the technician, pay via Cash or JazzCash, and enjoy our 7-day warranty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
