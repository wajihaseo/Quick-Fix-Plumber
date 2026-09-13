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
  CalendarCheck
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { ServiceItem } from '../types';

export const ServicesPricing: React.FC = () => {
  const { services, openBookingModal } = usePlumbing();
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'emergency'>('all');
  
  // Interactive pricing calculator state
  const [calcService, setCalcService] = useState<string>(services[0]?.id || 'srv-1');
  const [calcProperty, setCalcProperty] = useState<'residential' | 'commercial'>('residential');
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'same_day' | 'emergency'>('standard');

  const filteredServices = services.filter(srv => {
    if (filter === 'all') return true;
    if (filter === 'residential') return srv.category === 'residential' || srv.category === 'both';
    if (filter === 'commercial') return srv.category === 'commercial' || srv.category === 'both';
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
      default: return <Wrench className="w-5 h-5 text-sky-500" />;
    }
  };

  // Instant Quote Calculation logic
  const selectedServiceObj = services.find(s => s.id === calcService) || services[0];
  let calculatedCost = selectedServiceObj ? selectedServiceObj.basePrice : 180;
  if (calcProperty === 'commercial') calculatedCost *= 1.35;
  if (calcUrgency === 'same_day') calculatedCost += 50;
  if (calcUrgency === 'emergency') calculatedCost += 120;
  calculatedCost = Math.round(calculatedCost);

  return (
    <section id="services-pricing" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Transparent Flat-Rate Rates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4">
            Professional Plumbing Services &amp; Upfront Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            No surprise invoices, hidden dispatch fees, or bait-and-switch tactics. 
            All jobs include certified safety testing, digital diagnostics, and our comprehensive 1-year guarantee.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['all', 'residential', 'commercial', 'emergency'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                  filter === tab
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab === 'all' ? 'All Services' : tab === 'emergency' ? '🚨 24/7 Emergency' : `${tab} Services`}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:shadow-lg ${
                service.popular
                  ? 'border-sky-500/80 dark:border-sky-500 bg-sky-50/40 dark:bg-slate-800/80 shadow-md ring-1 ring-sky-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/60'
              }`}
            >
              <div>
                {/* Header with icon & badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {service.popular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-600 text-white">
                        Popular
                      </span>
                    )}
                    {service.emergencyAvailable && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        24/7 Ready
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                      {service.pricingType === 'from' ? 'Starts at' : service.pricingType === 'hourly' ? 'Rate' : 'Flat Price'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      ${service.basePrice}
                    </span>
                    {service.pricingType === 'hourly' && (
                      <span className="text-xs text-slate-500">/hr</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est. Duration: {service.estimatedDuration}</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                id={`book-service-${service.id}`}
                onClick={() => openBookingModal(service.title)}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
                  service.popular
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-slate-800 dark:text-slate-200'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book This Service</span>
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Instant Cost Estimator Box */}
        <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-6 sm:p-8 shadow-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-sky-600 text-white shadow-xs">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Instant Plumbing Cost Estimator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Calculate estimated upfront costs tailored to your property type and repair urgency.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Service
                </label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Property Classification
                </label>
                <select
                  value={calcProperty}
                  onChange={(e) => setCalcProperty(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="residential">Residential Home / Condo</option>
                  <option value="commercial">Commercial / Restaurant / Office</option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Dispatch Timeline
                </label>
                <select
                  value={calcUrgency}
                  onChange={(e) => setCalcUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="standard">Standard Scheduled Visit (Next Available)</option>
                  <option value="same_day">Guaranteed Same-Day Arrival (+ $50)</option>
                  <option value="emergency">Immediate Emergency Dispatch (+ $120)</option>
                </select>
              </div>
            </div>

            {/* Calculated Estimate Output */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated Flat-Rate Price Range:
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
                  ${calculatedCost} - ${Math.round(calculatedCost * 1.25)}
                </div>
                <div className="text-[11px] text-slate-500">
                  Includes diagnostic video inspection, initial lab parts &amp; 1-year warranty
                </div>
              </div>

              <button
                id="book-calculated-service"
                onClick={() => openBookingModal(selectedServiceObj?.title)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Lock In This Rate &amp; Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
