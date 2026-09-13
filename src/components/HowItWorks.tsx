import React from 'react';
import { Search, Calendar, ThumbsUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      numberBg: 'bg-blue-600',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
      icon: Search,
      title: 'Browse & Choose',
      description: 'Search by service or category. Compare verified providers with real ratings and transparent pricing — no hidden charges.'
    },
    {
      number: '2',
      numberBg: 'bg-amber-500',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
      icon: Calendar,
      title: 'Book Instantly',
      description: 'Pick your preferred date and time slot. Confirm your booking in under a minute. Pay only after the job is done.'
    },
    {
      number: '3',
      numberBg: 'bg-emerald-600',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
      icon: ThumbsUp,
      title: 'Job Done Right',
      description: 'A CNIC-verified professional arrives on time. Rate your experience — great service gets recognized and rewarded.'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 mb-3">
            <span>Simple Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How KwikFix Works
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Three steps to a fixed home — fast, easy, and reliable.
          </p>
        </div>

        {/* 3 Step Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white dark:bg-slate-850 rounded-2xl p-7 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center group"
              >
                {/* Icon Container with Floating Number Badge */}
                <div className="relative mb-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${step.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  {/* Step number badge */}
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${step.numberBg} text-white font-black text-xs flex items-center justify-center shadow-md`}>
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2.5">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
