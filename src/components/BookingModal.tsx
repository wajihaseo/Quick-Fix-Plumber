import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Home, 
  Building, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  MapPin,
  Mail,
  User,
  Phone,
  FileText
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';
import { ClientType, JobPriority } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    selectedServiceForBooking,
    services, 
    createBooking,
    isOnline,
    isOfflineSimulated
  } = usePlumbing();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clientType, setClientType] = useState<ClientType>('residential');
  const [serviceCategory, setServiceCategory] = useState<string>('');
  const [priority, setPriority] = useState<JobPriority>('standard');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (08:00 AM - 11:00 AM)');
  
  // Contact details
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Springfield Metro');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const effectiveOnline = isOnline && !isOfflineSimulated;

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Update prefilled service if changed
  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceCategory(selectedServiceForBooking);
      const matched = services.find(s => s.title === selectedServiceForBooking);
      if (matched && matched.category === 'commercial') {
        setClientType('commercial');
      }
    } else if (services.length > 0 && !serviceCategory) {
      setServiceCategory(services[0].title);
    }
  }, [selectedServiceForBooking, services]);

  if (!isBookingModalOpen) return null;

  const currentServiceObj = services.find(s => s.title === serviceCategory) || services[0];
  const basePrice = currentServiceObj ? currentServiceObj.basePrice : 180;
  const estimatedTotal = priority === 'urgent' ? basePrice + 50 : priority === 'emergency' ? basePrice + 120 : basePrice;

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, contact phone, and service address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createBooking({
        customerName,
        email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@client.com`,
        phone,
        address,
        city,
        clientType,
        serviceCategory: serviceCategory || 'Standard Plumbing Diagnostic',
        priority,
        preferredDate,
        timeSlot,
        description: description || 'Routine inspection & repair request',
        estimatedPrice: estimatedTotal,
        isEmergency: priority === 'emergency'
      });
      setSubmittedBookingId(created.id);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmittedBookingId(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {step === 3 ? 'Booking Confirmed!' : 'Schedule Plumbing Appointment'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step === 1 && 'Step 1 of 2: Service & Schedule Details'}
                {step === 2 && 'Step 2 of 2: Location & Contact Information'}
                {step === 3 && 'Automated confirmation sent & technician assigned'}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Select Service & Slot */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Residential vs Commercial */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Client Property Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClientType('residential')}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold transition-all ${
                      clientType === 'residential'
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/30'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Residential Property</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClientType('commercial')}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold transition-all ${
                      clientType === 'commercial'
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/30'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Commercial &amp; Facility</span>
                  </button>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Required Plumbing Service
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>
                      {s.title} (Starts at ${s.basePrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { val: 'standard', label: 'Standard', desc: 'Routine visit', badge: 'Base' },
                    { val: 'urgent', label: 'Same Day', desc: 'Within 4 hours', badge: '+$50' },
                    { val: 'emergency', label: 'Emergency', desc: '<30 min dispatch', badge: '+$120' }
                  ].map(item => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setPriority(item.val as JobPriority)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        priority === item.val
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Arrival Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="Morning (08:00 AM - 11:00 AM)">Morning (08:00 AM - 11:00 AM)</option>
                    <option value="Midday (11:00 AM - 02:00 PM)">Midday (11:00 AM - 02:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                    {priority === 'emergency' && (
                      <option value="Immediate Dispatch (<30m)">Immediate Dispatch (&lt;30m)</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  Est. Initial Cost: <strong className="text-sm font-bold text-sky-600 dark:text-sky-400">${estimatedTotal}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm flex items-center space-x-1.5 shadow"
                >
                  <span>Continue to Contact Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Contact */}
          {step === 2 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanda Phillips"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number (for SMS dispatch alerts) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email (for automated confirmation receipt)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    City / Service Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Street Address &amp; Unit / Suite *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 418 Pine Ridge Circle"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Specific Issue Details or Notes for Technician
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Water dripping under kitchen sink, valve difficult to turn off..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Offline cache notice banner if offline */}
              {!effectiveOnline && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Offline caching active: Your booking will be safely stored locally and synchronized as soon as connection is re-established.
                  </span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Scheduling...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Dispatch Plumber</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation View */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Ticket Reference Number: <strong className="text-sky-600 dark:text-sky-400 font-mono text-base">{submittedBookingId}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold">{serviceCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-semibold">{preferredDate} ({timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold">{address}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Automated Notification:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Email Sent to {email || customerName}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow"
                >
                  Done &amp; Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
