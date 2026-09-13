import React, { useState } from 'react';
import { 
  Zap, 
  Wind, 
  Hammer, 
  Paintbrush, 
  Wrench, 
  Waves, 
  Heart, 
  Sparkles, 
  Package, 
  Users, 
  Scissors, 
  Cog, 
  Sun, 
  Droplet, 
  Bug, 
  Grid3X3, 
  Camera, 
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calculator,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const ServicesGrid: React.FC = () => {
  const { openBookingModal, selectedCity, services, openWhatsApp } = usePlumbing();
  const [showDetailedRates, setShowDetailedRates] = useState(false);
  
  // Interactive Calculator State
  const [calcService, setCalcService] = useState('Water Motor & Pump Repair');
  const [calcProperty, setCalcProperty] = useState<'residential' | 'commercial'>('residential');
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'emergency'>('standard');

  const KWIKFIX_SERVICES = [
    { id: 'electrical', name: 'Electrical', icon: Zap, bg: 'bg-amber-50 text-amber-500', count: '120+ Ustads', category: 'Electrical Works' },
    { id: 'ac', name: 'AC Mechanics', icon: Wind, bg: 'bg-cyan-50 text-cyan-500', count: '85+ Ustads', category: 'AC Mechanics' },
    { id: 'carpentry', name: 'Carpentry', icon: Hammer, bg: 'bg-orange-50 text-orange-500', count: '60+ Ustads', category: 'Carpentry' },
    { id: 'painting', name: 'House Painting', icon: Paintbrush, bg: 'bg-emerald-50 text-emerald-500', count: '45+ Ustads', category: 'House Painting' },
    { id: 'plumbing', name: 'Plumbing', icon: Wrench, bg: 'bg-blue-50 text-blue-500', count: '150+ Ustads', category: 'Plumbing & Sanitary' },
    { id: 'pool', name: 'Pool Maintenance', icon: Waves, bg: 'bg-sky-50 text-sky-500', count: '20+ Ustads', category: 'Pool Maintenance' },
    
    { id: 'dog', name: 'Dog Trainer', icon: Heart, bg: 'bg-rose-50 text-rose-500', count: '15+ Trainers', category: 'Pet Care' },
    { id: 'cleaning', name: 'Domestic Cleaning', icon: Sparkles, bg: 'bg-purple-50 text-purple-500', count: '90+ Cleaners', category: 'Domestic Cleaning' },
    { id: 'movers', name: 'Movers & Packers', icon: Package, bg: 'bg-amber-50 text-amber-600', count: '40+ Teams', category: 'Movers & Packers' },
    { id: 'domestic_help', name: 'Domestic Help', icon: Users, bg: 'bg-teal-50 text-teal-600', count: '75+ Verified', category: 'Domestic Help' },
    { id: 'beautician', name: 'Beautician', icon: Scissors, bg: 'bg-pink-50 text-pink-500', count: '50+ Pros', category: 'Beautician' },
    { id: 'generator', name: 'Generator Repair & Maintenance', icon: Cog, bg: 'bg-orange-50 text-orange-600', count: '35+ Techs', category: 'Generator Repair' },
    
    { id: 'solar', name: 'Solar Installation & Maintenance', icon: Sun, bg: 'bg-yellow-50 text-yellow-500', count: '30+ Engineers', category: 'Solar Installation' },
    { id: 'tank', name: 'Water Tank Cleaning', icon: Droplet, bg: 'bg-blue-50 text-blue-600', count: '45+ Teams', category: 'Tank Cleaning' },
    { id: 'pest', name: 'Pest Control', icon: Bug, bg: 'bg-red-50 text-red-500', count: '25+ Teams', category: 'Pest Control' },
    { id: 'flooring', name: 'Tile and Marble Flooring', icon: Grid3X3, bg: 'bg-slate-100 text-slate-700', count: '40+ Masters', category: 'Flooring' },
    { id: 'cctv', name: 'CCTV & Security', icon: Camera, bg: 'bg-cyan-50 text-cyan-600', count: '30+ Techs', category: 'CCTV & Security' },
    { id: 'more', name: 'More coming soon', icon: Plus, bg: 'bg-slate-50 text-slate-400', count: 'Expanding', category: 'Other' }
  ];

  const handleCardClick = (serviceName: string) => {
    if (serviceName === 'More coming soon') {
      openWhatsApp('AoA KwikFix, I need a service not listed on your app.');
      return;
    }
    openBookingModal(serviceName);
  };

  // Price estimate logic
  let basePriceEstimate = 1450;
  if (calcService.includes('Motor')) basePriceEstimate = 1450;
  if (calcService.includes('Geyser')) basePriceEstimate = 1850;
  if (calcService.includes('Tap')) basePriceEstimate = 650;
  if (calcService.includes('Tank')) basePriceEstimate = 3500;
  if (calcService.includes('AC')) basePriceEstimate = 2200;
  if (calcService.includes('Electrical')) basePriceEstimate = 1200;

  if (calcProperty === 'commercial') basePriceEstimate = Math.round(basePriceEstimate * 1.4);
  if (calcUrgency === 'emergency') basePriceEstimate += 500;

  return (
    <section id="services-section" className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 mb-3">
            <span>Our Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Help for Every Home Need
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            From emergency repairs to scheduled maintenance — we've got your home covered.
          </p>
        </div>

        {/* 18 Services Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {KWIKFIX_SERVICES.map((srv) => {
            const Icon = srv.icon;
            const isComingSoon = srv.id === 'more';

            return (
              <div
                key={srv.id}
                onClick={() => handleCardClick(srv.name)}
                className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center cursor-pointer ${
                  isComingSoon
                    ? 'border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-400'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Rounded Icon Badge */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${srv.bg}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Service Name */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 min-h-[2.2rem] flex items-center justify-center">
                  {srv.name}
                </h3>

                {/* Subtitle / Availability */}
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                  {srv.count}
                </span>

                {/* Hover CTA prompt */}
                {!isComingSoon && (
                  <span className="mt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Book Now →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Toggle Detailed Rate Card & Price Calculator */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowDetailedRates(!showDetailedRates)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors shadow-xs"
          >
            <span>{showDetailedRates ? 'Hide Detailed Rate Card' : 'View Standardized Rate Card & Price Calculator (PKR)'}</span>
            {showDetailedRates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Rate Card & PKR Calculator */}
        {showDetailedRates && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Popular Rate Sheet */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      Standard Upfront PKR Rates in {selectedCity}
                    </h4>
                    <p className="text-xs text-slate-500">
                      7-day official rework guarantee included with every job.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    Zero Hidden Fees
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { name: 'Water Motor / Suction Pump Overhaul & Capacitor', price: 'Rs. 1,450', time: '45-60 mins' },
                    { name: 'Instant Gas Geyser Burner & Sensor Repair', price: 'Rs. 1,850', time: '60 mins' },
                    { name: 'Tap, Muslim Shower & Mixer Replacement', price: 'Rs. 650', time: '30 mins' },
                    { name: 'Underground / Overhead Tank High-Pressure Wash', price: 'Rs. 3,500', time: '2-3 hours' },
                    { name: 'Concealed Pipe Burst & Seepage Rectification', price: 'Rs. 2,800', time: '1-2 hours' },
                    { name: 'AC Master Service & Chemical Wash', price: 'Rs. 2,200', time: '45 mins' },
                    { name: 'Main DB Breaker / Wiring Short Circuit Fix', price: 'Rs. 1,200', time: '40 mins' }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-blue-400 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-100">{item.name}</div>
                        <div className="text-[11px] text-slate-400">Est. duration: {item.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-blue-600 dark:text-blue-400 text-sm">{item.price}</div>
                        <button
                          onClick={() => openBookingModal(item.name)}
                          className="text-[10px] font-bold text-slate-500 hover:text-blue-600 underline"
                        >
                          Book this
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Instant Cost Estimator */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Calculator className="w-4 h-4" />
                  <span>Instant PKR Cost Estimator</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Select Service
                    </label>
                    <select
                      value={calcService}
                      onChange={(e) => setCalcService(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Water Motor & Pump Repair">Water Motor &amp; Pump Repair</option>
                      <option value="Instant Gas Geyser Repair">Instant Gas Geyser Repair</option>
                      <option value="Tap & Muslim Shower Fitting">Tap &amp; Muslim Shower Fitting</option>
                      <option value="Overhead Tank Cleaning">Overhead Tank Cleaning</option>
                      <option value="AC Master Service">AC Master Service</option>
                      <option value="Electrical Short Circuit Fix">Electrical Short Circuit Fix</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcProperty('residential')}
                        className={`py-2 rounded-xl border font-bold text-xs ${
                          calcProperty === 'residential'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600'
                        }`}
                      >
                        Residential
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcProperty('commercial')}
                        className={`py-2 rounded-xl border font-bold text-xs ${
                          calcProperty === 'commercial'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600'
                        }`}
                      >
                        Commercial
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Urgency
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcUrgency('standard')}
                        className={`py-2 rounded-xl border font-bold text-xs ${
                          calcUrgency === 'standard'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcUrgency('emergency')}
                        className={`py-2 rounded-xl border font-bold text-xs ${
                          calcUrgency === 'emergency'
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600'
                        }`}
                      >
                        45-Min Urgent
                      </button>
                    </div>
                  </div>

                  {/* Calculated Quote Box */}
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-center">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Estimated Labor Cost</div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                      Rs. {basePriceEstimate.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Pay after inspection &amp; satisfactory completion
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(calcService)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow"
                  >
                    Confirm Booking at this Rate →
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
