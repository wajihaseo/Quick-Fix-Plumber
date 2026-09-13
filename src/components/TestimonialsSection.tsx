import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, CheckCircle2, User, Building, Home } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { CustomerTestimonial, ClientType } from '../types';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = usePlumbing();
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [userReviews, setUserReviews] = useState<CustomerTestimonial[]>(testimonials);
  
  // New review form modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [clientType, setClientType] = useState<ClientType>('residential');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceUsed, setServiceUsed] = useState('Emergency Pipe Leak & Burst Repair');

  const filtered = userReviews.filter(item => {
    if (filter === 'all') return true;
    return item.clientType === filter;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: CustomerTestimonial = {
      id: `t-${Date.now()}`,
      name,
      role: role || (clientType === 'residential' ? 'Homeowner' : 'Facility Director'),
      clientType,
      rating,
      comment,
      date: 'Just now',
      serviceUsed,
      verified: true,
      location: 'Local Client'
    };

    setUserReviews([newRev, ...userReviews]);
    setIsFormOpen(false);
    setName('');
    setComment('');
  };

  return (
    <section id="testimonials-section" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Trusted by Hundreds of Local Clients
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              From midnight residential pipe emergencies to complex commercial facilities.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Filter buttons */}
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 p-1 bg-white dark:bg-slate-900">
              {(['all', 'residential', 'commercial'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    filter === tab
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-sky-500 text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4 text-sky-500" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(t => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header Rating & Verification */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Customer</span>
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Service Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                    {t.clientType === 'commercial' ? <Building className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {t.role} • {t.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[10px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    {t.serviceUsed}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Share Your Experience with KwikFix
              </h3>
              <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Ross"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Role / Property Type</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Homeowner / Property Manager"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1 ${rating >= star ? 'text-amber-400' : 'text-slate-300'}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Review</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the technician, response speed, and repair quality..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold shadow"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
