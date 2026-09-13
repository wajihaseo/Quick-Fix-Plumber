import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  PhoneCall,
  User,
  Sparkles
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenProvider: () => void;
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenLogin, 
  onOpenProvider 
}) => {
  const { openBookingModal } = usePlumbing();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo matching screenshot: rounded blue badge with K + KWIKFIX.PK + FIND. BOOK. RELAX. */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold tracking-tighter">K</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  KWIKFIX<span className="text-blue-600">.PK</span>
                </span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 -mt-0.5">
                FIND. BOOK. RELAX.
              </span>
            </div>
          </div>

          {/* Center navigation links matching screenshot: Services, How It Works, Providers */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => scrollToSection('services-section')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('how-it-works-section')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={onOpenProvider}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Providers
            </button>
          </nav>

          {/* Right actions matching screenshot: Login, Get Started -> */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={onOpenLogin}
              className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Login
            </button>

            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => openBookingModal()}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs"
            >
              Book
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <button
            onClick={() => scrollToSection('services-section')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('how-it-works-section')}
            className="w-full text-left py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenProvider();
            }}
            className="w-full text-left py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600"
          >
            Become a Provider
          </button>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="text-sm font-bold text-slate-700 dark:text-slate-200"
            >
              Login (Staff / Owner)
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal();
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold shadow"
            >
              Get Started →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
