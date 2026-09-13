import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Plus, Minus } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const FaqSection: React.FC = () => {
  const { openWhatsApp, selectedCity } = usePlumbing();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQS = [
    {
      q: 'How do I book a plumber in Karachi?',
      a: 'Simply select "Plumbing" from our services grid, choose your date and preferred time slot, and enter your address (e.g. DHA, Gulshan, Clifton). A CNIC-verified ustad will be dispatched to your doorstep in as fast as 45 minutes.'
    },
    {
      q: 'Is KwikFix available in Lahore and Islamabad?',
      a: 'Yes! KwikFix is operational across Karachi, Lahore, and Islamabad/Rawalpindi with local network hubs and verified trade ustads in all major sectors and neighborhoods.'
    },
    {
      q: 'How are KwikFix providers verified?',
      a: 'Every ustad undergoes strict 3-step vetting: 1) NADRA CNIC & police record verification, 2) practical trade skill assessment, and 3) ongoing customer rating monitoring. If rating drops below 4.5, they are removed.'
    },
    {
      q: 'What payment methods does KwikFix accept?',
      a: 'You only pay after the job is successfully inspected and completed! We accept Cash on Delivery (COD), JazzCash, Easypaisa, and direct bank transfers. You will receive an official digital invoice on WhatsApp.'
    },
    {
      q: 'What does AC servicing cost in Pakistan?',
      a: 'Standard master AC chemical wash and filter service starts from Rs. 2,200 in Karachi and Lahore. Full gas refill (R22/R410/R32) and compressor diagnostics are provided with upfront written estimates.'
    },
    {
      q: 'Can I cancel a booking?',
      a: 'Yes, cancellations are 100% free before the technician is en route. Even if an ustad inspects and you decide not to proceed, our inspection fee is minimal (Rs. 300) with complete transparency.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 mb-3">
            <span>FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Everything you need to know about KwikFix
          </p>
        </div>

        {/* 6 FAQ Accordions matching screenshot */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 shrink-0">
                    {isOpen ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card matching screenshot */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">
            Still have questions? We're happy to help.
          </p>
          <button
            onClick={() => openWhatsApp('AoA KwikFix, I have a question about home services.')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
