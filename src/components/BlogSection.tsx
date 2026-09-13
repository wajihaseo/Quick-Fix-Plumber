import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  X, 
  CheckCircle, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const { blogPosts, openBookingModal } = usePlumbing();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'All Maintenance Guides' },
    { id: 'maintenance', label: 'Preventative Care' },
    { id: 'emergency', label: 'Emergency Protocols' },
    { id: 'energy_saving', label: 'Energy & Tankless' },
    { id: 'commercial', label: 'Commercial Code' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="plumbing-blog" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Master Plumber Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Plumbing Maintenance Guides &amp; Expert Advice
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2">
            Actionable maintenance tips from licensed master plumbers to save money, avoid catastrophic water damage, and optimize appliance lifespans.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search guides (e.g. leaks, freeze)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 p-6 flex flex-col justify-between cursor-pointer hover:border-sky-500 dark:hover:border-sky-500 transition-all hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="capitalize font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    {post.category.replace('_', ' ')}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-500">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                </div>

                <span className="text-sky-600 dark:text-sky-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Full Detail Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
            <div 
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                    <span className="capitalize font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {activeArticle.category.replace('_', ' ')}
                    </span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {activeArticle.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Written by {activeArticle.author}
                  </p>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-sky-900 dark:text-sky-200 font-medium">
                  {activeArticle.excerpt}
                </div>

                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}

                {/* Direct CTA inside article */}
                <div className="mt-8 p-5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Dealing with this issue right now?
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Our certified master plumbers carry digital acoustic detectors and replacement parts.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      openBookingModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow shrink-0"
                  >
                    Schedule Inspection Visit
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
