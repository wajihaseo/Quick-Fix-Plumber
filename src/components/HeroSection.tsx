import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Wrench,
  Zap,
  Wind,
  Hammer,
  Paintbrush,
  Sparkles,
  Users,
  Award,
  Briefcase
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

interface HeroSectionProps {
  onOpenProvider: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenProvider }) => {
  const { 
    openBookingModal, 
    selectedCity, 
    setSelectedCity,
    searchFilter,
    setSearchFilter
  } = usePlumbing();

  const [localSearch, setLocalSearch] = useState(searchFilter);
  const [selectedTag, setSelectedTag] = useState('Plumbing');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilter(localSearch);
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchFilter(tag);
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Main Hero Banner: Deep Royal Navy Blue (#07173f to #0d286d) with subtle geometric grid */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061848] via-[#09225f] to-[#0d2a76] text-white pt-10 sm:pt-16 pb-16 lg:pb-24">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Ambient radial glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Controls */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
              
              {/* Pill badge matching screenshot */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Karachi's #1 Home Services Platform</span>
              </div>

              {/* Headline matching screenshot */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Find Trusted{' '}
                <span className="text-[#f59e0b]">Professionals</span><br />
                For Any Job.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl leading-relaxed font-normal">
                Verified experts in plumbing, electrical, AC, carpentry, cleaning &amp; more — booked in under 5 minutes.
              </p>

              {/* Search Bar Container matching screenshot */}
              <form 
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-xl sm:rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl text-slate-900"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="What service do you need?"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Vertical separator on sm+ */}
                <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

                {/* City dropdown matching screenshot */}
                <div className="flex items-center w-full sm:w-auto px-3 py-2 bg-slate-50 sm:bg-transparent rounded-lg text-xs font-semibold text-slate-700">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent border-none focus:outline-none cursor-pointer text-slate-800 text-xs font-semibold pr-2"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>

                {/* Search button in gold/amber matching screenshot */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-sm transition-all hover:scale-[1.02] shadow-sm"
                >
                  Search
                </button>
              </form>

              {/* Dual Action Buttons matching screenshot */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => openBookingModal()}
                  className="px-7 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02]"
                >
                  Book Now
                </button>

                <button
                  onClick={onOpenProvider}
                  className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <span>Become a Provider</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges row matching screenshot */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2 text-xs sm:text-sm text-blue-100/90 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CNIC Verified Pros</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                  <span>Service Guarantee</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Book in 5 Minutes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card & Floating Pills matching screenshot */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              
              {/* Category Pills floating above the card */}
              <div className="flex flex-wrap justify-center gap-2 mb-4 w-full max-w-md">
                {[
                  { name: 'Plumbing', icon: Wrench, active: true },
                  { name: 'Electrical', icon: Zap },
                  { name: 'AC Repair', icon: Wind },
                  { name: 'Carpentry', icon: Hammer },
                  { name: 'Painting', icon: Paintbrush },
                  { name: 'Cleaning', icon: Sparkles }
                ].map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => handleTagClick(tag.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedTag === tag.name
                        ? 'bg-white text-blue-900 shadow-md scale-105'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    <tag.icon className="w-3.5 h-3.5" />
                    <span>{tag.name}</span>
                  </button>
                ))}
              </div>

              {/* Main Booking Confirmation Card matching screenshot */}
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-slate-900 border border-slate-100">
                
                {/* Floating Rating Badge on Top Right */}
                <div className="absolute -top-3.5 -right-3 bg-white text-slate-800 rounded-xl px-3 py-1.5 shadow-lg border border-slate-100 flex items-center gap-1.5 text-xs font-bold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.8 / 5.0</span>
                  <span className="text-[10px] text-slate-400 font-normal">2,400+ reviews</span>
                </div>

                {/* Booking Confirmed Tag */}
                <div className="flex items-center space-x-1.5 text-emerald-600 text-xs font-bold mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>BOOKING CONFIRMED</span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    AK
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                      Ahmad Karimi
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">Certified Plumber</p>
                    <div className="flex items-center text-amber-400 text-xs mt-0.5">
                      {'★'.repeat(5)} <span className="text-slate-700 font-bold ml-1">4.9</span>
                    </div>
                  </div>
                </div>

                {/* Details Table */}
                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400 font-medium">Service</span>
                    <span className="font-bold text-slate-800">Pipe Leak Repair</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400 font-medium">Date &amp; Time</span>
                    <span className="font-bold text-slate-800">Today, 3:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400 font-medium">Location</span>
                    <span className="font-bold text-slate-800">Gulshan, {selectedCity}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-600">
                    <span className="text-slate-500 font-medium">Est. Cost</span>
                    <span className="font-black text-base text-blue-600">PKR 2,500</span>
                  </div>
                </div>

                {/* Floating badge on bottom left of card */}
                <div className="absolute -bottom-3.5 -left-3 bg-white text-slate-800 rounded-xl px-3 py-1.5 shadow-lg border border-slate-100 flex items-center gap-1.5 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>800+ Providers</span>
                  <span className="text-[10px] text-slate-400 font-normal">CNIC Verified</span>
                </div>

                {/* Card footer */}
                <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
                  Pay only after job completion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom smooth wave transition to white background */}
        <div className="w-full absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg 
            className="relative block w-full h-8 sm:h-12 text-white fill-current" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Counter Section (White Background) matching screenshot */}
      <section className="bg-white dark:bg-slate-900 py-10 sm:py-12 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            
            {/* Stat 1: 10,000+ Customers Served (Blue icon) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
                10,000+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Customers Served
              </div>
            </div>

            {/* Stat 2: 800+ Verified Providers (Green icon) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                800+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Verified Providers
              </div>
            </div>

            {/* Stat 3: 4.8 Average Rating (Yellow icon) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shadow-xs">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                4.8
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Average Rating
              </div>
            </div>

            {/* Stat 4: 50+ Service Categories (Purple icon) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">
                50+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Service Categories
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
