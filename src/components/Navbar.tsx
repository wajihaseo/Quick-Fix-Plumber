import React, { useState } from 'react';
import { 
  Wrench, 
  PhoneCall, 
  Sun, 
  Moon, 
  Shield, 
  Wifi, 
  WifiOff, 
  Menu, 
  X, 
  Calendar, 
  AlertTriangle, 
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    isDark, 
    toggleTheme, 
    isOnline, 
    isOfflineSimulated, 
    toggleSimulateOffline,
    currentRole, 
    switchRole,
    currentUser,
    openBookingModal,
    openEmergencyModal
  } = usePlumbing();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const effectiveOnline = isOnline && !isOfflineSimulated;

  const roleOptions: { role: UserRole; label: string; desc: string }[] = [
    { role: 'customer', label: 'Customer Portal', desc: 'Browse services, book & view my tickets' },
    { role: 'dispatcher', label: 'Dispatcher Desk', desc: 'Live dispatch board, assign crews' },
    { role: 'technician', label: 'Technician View', desc: 'Active assigned field tickets & parts' },
    { role: 'admin', label: 'Administrator', desc: 'Full system, analytics, backups, audit logs' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      {/* Top emergency & system quick bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-3 text-slate-300">
          <span className="flex items-center font-medium text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
            24/7 Rapid Dispatch: Average arrival &lt; 26 mins
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">Licensed Master Plumber Lic #MP-882910</span>
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          {/* Offline simulator status pill */}
          <button
            id="offline-toggle-btn"
            onClick={toggleSimulateOffline}
            title="Click to toggle offline mode simulation to test data caching"
            className={`flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              effectiveOnline 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900' 
                : 'bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900'
            }`}
          >
            {effectiveOnline ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>Online (Cached)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Offline Mode (Cached Active)</span>
              </>
            )}
          </button>

          {/* Quick Hotline direct link */}
          <a 
            href="tel:18005552782" 
            className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 font-semibold tracking-wide"
          >
            <PhoneCall className="w-3 h-3" />
            <span>(800) 555-AQUA</span>
          </a>
        </div>
      </div>

      {/* Primary navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Aqua<span className="text-sky-600 dark:text-sky-400">Pro</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Plumbing
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Residential &amp; Commercial 24/7
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Services &amp; Pricing
            </button>

            <button
              id="nav-emergency"
              onClick={openEmergencyModal}
              className="px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-1 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Emergency 24/7</span>
            </button>

            <button
              id="nav-blog"
              onClick={() => setActiveTab('blog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'blog'
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Maintenance Tips
            </button>

            <button
              id="nav-testimonials"
              onClick={() => setActiveTab('testimonials')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'testimonials'
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Client Reviews
            </button>

            {/* Portal Tab */}
            <button
              id="nav-portal"
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                activeTab === 'admin'
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-sky-500" />
              <span>Operations &amp; Admin</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                id="role-switch-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
                title="Switch Access Role (RBAC)"
              >
                <UserCheck className="w-3.5 h-3.5 text-sky-500" />
                <span className="capitalize hidden sm:inline">{currentRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Active User: {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Select Role to Test RBAC:
                    </p>
                  </div>
                  {roleOptions.map(opt => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        switchRole(opt.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors ${
                        currentRole === opt.role
                          ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-semibold flex items-center justify-between">
                        {opt.label}
                        {currentRole === opt.role && <span className="text-[10px] bg-sky-500 text-white rounded px-1">Active</span>}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Service Online Button */}
            <button
              id="nav-book-now"
              onClick={() => openBookingModal()}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-sky-600/30 transition-all hover:shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setActiveTab('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Services &amp; Pricing
          </button>
          <button
            onClick={() => {
              openEmergencyModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency 24/7 Callout</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('blog');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Maintenance Tips &amp; Blog
          </button>
          <button
            onClick={() => {
              setActiveTab('testimonials');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Customer Testimonials
          </button>
          <button
            onClick={() => {
              setActiveTab('admin');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Admin &amp; Operations Dashboard</span>
          </button>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                openBookingModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-sky-600 text-white font-semibold text-center text-sm shadow"
            >
              Book Service Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
