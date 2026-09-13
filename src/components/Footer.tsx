import React from 'react';
import { 
  Share2, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Shield, 
  Lock,
  Heart
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

interface FooterProps {
  onOpenProvider: () => void;
  onOpenLogin: () => void;
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenProvider, 
  onOpenLogin,
  onNavigateToAdmin 
}) => {
  const { openBookingModal } = usePlumbing();

  const scrollToServices = (serviceName?: string) => {
    if (serviceName) {
      openBookingModal(serviceName);
    } else {
      const el = document.getElementById('services-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a1124] text-slate-300 pt-16 pb-12 border-t border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand details matching screenshot */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer select-none">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                K
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  KWIKFIX<span className="text-blue-500">.PK</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  FIND. BOOK. RELAX.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Karachi's trusted home services marketplace. Verified professionals, transparent pricing, guaranteed satisfaction.
            </p>

            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>KwikFix · Karachi, Pakistan</span>
            </div>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://wa.me/923005945349" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/923005945349" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services matching screenshot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToServices('Plumbing')} className="hover:text-white transition-colors">
                  Plumbing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToServices('Electrical')} className="hover:text-white transition-colors">
                  Electrical
                </button>
              </li>
              <li>
                <button onClick={() => scrollToServices('AC Mechanics')} className="hover:text-white transition-colors">
                  AC Mechanics
                </button>
              </li>
              <li>
                <button onClick={() => scrollToServices('Carpentry')} className="hover:text-white transition-colors">
                  Carpentry
                </button>
              </li>
              <li>
                <button onClick={() => scrollToServices('House Painting')} className="hover:text-white transition-colors">
                  House Painting
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Cities matching screenshot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between max-w-[120px]">
                <span className="text-white font-medium">Karachi</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </li>
              <li className="flex items-center space-x-2">
                <span>Lahore</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Soon
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span>Islamabad</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company matching screenshot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('how-it-works-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button onClick={onOpenProvider} className="hover:text-white transition-colors">
                  Become a Provider
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              {/* Discrete Staff Login */}
              <li className="pt-2">
                <button 
                  onClick={onNavigateToAdmin} 
                  className="text-[11px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Direct URL: /#/admin"
                >
                  <Lock className="w-3 h-3" />
                  <span>Portal (/admin)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 KwikFix. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Made with love in Pakistan 🇵🇰</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
