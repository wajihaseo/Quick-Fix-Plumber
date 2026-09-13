import React, { useState, useEffect } from 'react';
import { PlumbingProvider, usePlumbing } from './context/PlumbingContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { EmergencyModal } from './components/EmergencyModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ProviderModal } from './components/ProviderModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';

export function KwikFixApp() {
  const { currentRole, switchRole } = usePlumbing();
  
  // Track URL hash for separate admin route (#/admin)
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setCurrentHash(hash);
  };

  const isAdminRoute = currentHash === '#/admin' || currentHash === '#admin';
  const isAuthorizedAdmin = currentRole === 'admin' || currentRole === 'dispatcher' || currentRole === 'technician';

  // -----------------------------------------------------------
  // SEPARATE ADMIN SECTION / LAYOUT (Triggered by URL: /#/admin)
  // -----------------------------------------------------------
  if (isAdminRoute) {
    // If not authenticated, show dedicated private login screen
    if (!isAuthorizedAdmin) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mx-auto flex items-center justify-center">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-[11px] font-mono text-blue-300 font-bold uppercase tracking-wider">
                URL: /#/admin
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                KwikFix Admin Portal
              </h2>
              <p className="text-xs text-slate-400">
                This section is strictly restricted to administrative staff and platform owners.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.02]"
              >
                Authenticate as Admin
              </button>

              <button
                onClick={() => navigateTo('#/')}
                className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>

          <AdminLoginModal
            isOpen={isAdminLoginOpen}
            onClose={() => setIsAdminLoginOpen(false)}
            onSuccess={() => {
              setIsAdminLoginOpen(false);
            }}
          />
        </div>
      );
    }

    // Authorized Admin View (Completely isolated layout without public header/footer)
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <AdminDashboard onExitToPublic={() => navigateTo('#/')} />
      </div>
    );
  }

  // -----------------------------------------------------------
  // PUBLIC WEBSITE LAYOUT (Matching https://kwikfix.pk/)
  // -----------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenLogin={() => setIsAdminLoginOpen(true)}
        onOpenProvider={() => setIsProviderModalOpen(true)}
        onNavigateToAdmin={() => navigateTo('#/admin')}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {/* Hero Banner with Karachi #1 badge, search & booking card */}
        <HeroSection onOpenProvider={() => setIsProviderModalOpen(true)} />

        {/* 18 Services Grid with PKR Pricing */}
        <ServicesGrid />

        {/* How KwikFix Works: 3 Steps */}
        <HowItWorks />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Need Help Finding the Right Pro? CTA Banner */}
        <CtaBanner />
      </main>

      {/* 3. Comprehensive Footer */}
      <Footer
        onOpenProvider={() => setIsProviderModalOpen(true)}
        onOpenLogin={() => setIsAdminLoginOpen(true)}
        onNavigateToAdmin={() => navigateTo('#/admin')}
      />

      {/* Interactive Global Modals & Widgets */}
      <BookingModal />
      <EmergencyModal />
      <LiveChatWidget />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          navigateTo('#/admin');
        }}
      />

      <ProviderModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PlumbingProvider>
      <KwikFixApp />
    </PlumbingProvider>
  );
}
