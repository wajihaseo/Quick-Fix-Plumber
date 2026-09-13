import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  AlertTriangle, 
  Droplets, 
  Flame, 
  Search, 
  Wrench, 
  Sparkles, 
  Building2,
  CalendarCheck,
  MessageCircle,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { ServiceItem } from '../types';

export const ServicesPricing: React.FC = () => {
  const { services, openBookingModal, selectedCity, openWhatsApp, searchFilter } = usePlumbing();
  const [filter, setFilter] = useState<'all' | 'taps' | 'geysers' | 'motors' | 'tanks' | 'drains' | 'emergency'>('all');
  
  // Interactive pricing calculator state in PKR
  const [calcService, setCalcService] = useState<string>(services[0]?.id || 'srv-1');
  const [calcProperty, setCalcProperty] = useState<'residential' | 'commercial'>('residential');
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'same_day' | 'emergency'>('standard');

  const filteredServices = services.filter(srv => {
    // Keyword search filter match
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchesSearch = srv.title.toLowerCase().includes(q) || 
                            srv.description.toLowerCase().includes(q) ||
                            srv.serviceGroup?.toLowerCase().includes(q) ||
                            srv.features.some(f => f.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (filter === 'all') return true;
    if (filter === 'taps') return srv.serviceGroup === 'Taps & Showers' || srv.serviceGroup === 'Bathroom Sanitary';
    if (filter === 'geysers') return srv.serviceGroup === 'Geysers';
    if (filter === 'motors') return srv.serviceGroup === 'Water Motors';
    if (filter === 'tanks') return srv.serviceGroup === 'Tank Cleaning';
    if (filter === 'drains') return srv.serviceGroup === 'Drainage' || srv.serviceGroup === 'Leak Detection';
    if (filter === 'emergency') return srv.emergencyAvailable;
    return true;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Search': return <Search className="w-5 h-5 text-indigo-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-teal-500" />;
      default: return <Wrench className="w-5 h-5 text-sky-500" />;
    }
  };

  // Instant PKR Quote Calculation logic
  const selectedServiceObj = services.find(s => s.id === calcService) || services[0];
  let calculatedCost = selectedServiceObj ? selectedServiceObj.basePrice : 1400;
  if (calcProperty === 'commercial') calculatedCost = Math.round(calculatedCost * 1.5);
  if (calcUrgency === 'same_day') calculatedCost += 300;
  if (calcUrgency === 'emergency') calculatedCost += 600;

  return (
    <section id="services-section" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-3">
            <span>Verified Rate Card in {selectedCity}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing with 7-Day Guarantee
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-2">
            Standardized rates in Pakistani Rupees. Our master technician will inspect the issue, confirm the cost before touching a wrench, and provide an official digital invoice with warranty.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'taps', label: '🚰 Taps & Sanitary' },
              { id: 'geysers', label: '🔥 Geysers' },
              { id: 'motors', label: '⚙️ Water Motors' },
              { id: 'tanks', label: '🌊 Tank Cleaning' },
              { id: 'drains', label: '🛠️ Drain & Seepage' },
              { id: 'emergency', label: '🚨 45-Min Emergency' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-lg ${
                service.popular
                  ? 'border-sky-500/80 dark:border-sky-500 bg-sky-50/30 dark:bg-slate-800/80 shadow-xs ring-1 ring-sky-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850/70'
              }`}
            >
              <div>
                {/* Header with icon & badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center space-x-1">
                    {service.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                        Popular
                      </span>
                    )}
                    {service.emergencyAvailable && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        45m SLA
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3.5 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Price Display in PKR */}
                <div className="mb-3.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {service.pricingType === 'from' ? 'Starts at' : 'Fixed'}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      Rs. {service.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Est. Time: {service.estimatedDuration}</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 mb-5 text-xs text-slate-700 dark:text-slate-300">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons: Book Now + WhatsApp */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  id={`book-service-${service.id}`}
                  onClick={() => openBookingModal(service.title)}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
                    service.popular
                      ? 'bg-sky-600 hover:bg-sky-500 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book in 60s</span>
                </button>

                <button
                  onClick={() => openWhatsApp(`Hi KwikFix, I need details & booking for ${service.title} in ${selectedCity}.`)}
                  className="w-full py-1.5 px-3 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 hover:bg-emerald-100 text-[11px] font-semibold flex items-center justify-center space-x-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp Query</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instant Cost Estimator Box (In PKR) */}
        <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/50 via-white to-sky-100/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-5 sm:p-7 shadow-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Quick Plumbing Rate Calculator ({selectedCity})
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Calculate upfront PKR estimates tailored to your residential or commercial property.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Required Service
                </label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Premise Type
                </label>
                <select
                  value={calcProperty}
                  onChange={(e) => setCalcProperty(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="residential">Residential (House / Apartment / Portion)</option>
                  <option value="commercial">Commercial (Office / Cafe / Factory)</option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Arrival Speed
                </label>
                <select
                  value={calcUrgency}
                  onChange={(e) => setCalcUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="standard">Standard Slot (Today / Tomorrow)</option>
                  <option value="same_day">Guaranteed Same-Day Arrival (+ Rs. 300)</option>
                  <option value="emergency">🚨 45-Min Urgent Dispatch (+ Rs. 600)</option>
                </select>
              </div>
            </div>

            {/* Calculated Estimate Output */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated Transparent Cost in PKR:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 font-mono">
                  Rs. {calculatedCost.toLocaleString()} - {Math.round(calculatedCost * 1.2).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Includes 7-Day Rework Warranty &amp; NADRA-verified technician</span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  id="book-calculated-service"
                  onClick={() => openBookingModal(selectedServiceObj?.title)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Book at this Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openWhatsApp(`Hi KwikFix, I calculated Rs. ${calculatedCost} for ${selectedServiceObj?.title}. Please confirm availability in ${selectedCity}.`)}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center transition-colors"
                  title="Confirm on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
