import React, { useState } from 'react';
import { PlumbingProvider } from './context/PlumbingContext';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { HeroSection } from './components/HeroSection';
import { ServicesPricing } from './components/ServicesPricing';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { EmergencyModal } from './components/EmergencyModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function PlumbingApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'blog' | 'testimonials' | 'admin'>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* 24/7 Priority Emergency Alert Banner */}
      <EmergencyBanner />

      {/* Main Responsive Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as any)} />

      {/* Real-Time Offline Data Caching Indicator & Controls */}
      <OfflineIndicator />

      {/* Main Body View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <ServicesPricing />
            <TestimonialsSection />
            <BlogSection />
          </>
        )}

        {activeTab === 'blog' && (
          <div className="py-6">
            <BlogSection />
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="py-6">
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer with Licensing, Hotline & Service Regions */}
      <Footer setActiveTab={(tab) => setActiveTab(tab as any)} />

      {/* Modals & Real-Time Support Widgets */}
      <BookingModal />
      <EmergencyModal />
      <LiveChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <PlumbingProvider>
      <PlumbingApp />
    </PlumbingProvider>
  );
}
