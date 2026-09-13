import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const CtaBanner: React.FC = () => {
  const { openBookingModal, openWhatsApp } = usePlumbing();

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-14 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        
        {/* Headline matching screenshot */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Need Help Finding the Right Pro?
        </h2>

        {/* Subtitle matching screenshot */}
        <p className="text-blue-100/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Our team is here to help you find the perfect professional for your job — at the right price.
        </p>

        {/* Dual buttons matching screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={scrollToServices}
            className="px-6 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Browse Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openWhatsApp('AoA KwikFix, I need help finding the right pro for my home.')}
            className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 backdrop-blur-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Us</span>
          </button>
        </div>

      </div>
    </section>
  );
};
