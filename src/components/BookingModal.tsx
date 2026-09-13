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
  FileText,
  MessageCircle
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
    isOfflineSimulated,
    selectedCity,
    openWhatsApp
  } = usePlumbing();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clientType, setClientType] = useState<ClientType>('residential');
  const [serviceCategory, setServiceCategory] = useState<string>('');
  const [priority, setPriority] = useState<JobPriority>('standard');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (09:00 AM - 12:00 PM)');
  
  // Contact details
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(selectedCity || 'Karachi');
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

  // Sync city when selectedCity changes
  useEffect(() => {
    if (selectedCity) setCity(selectedCity);
  }, [selectedCity]);

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
  const basePrice = currentServiceObj ? currentServiceObj.basePrice : 1400;
  const estimatedTotal = priority === 'urgent' ? basePrice + 300 : priority === 'emergency' ? basePrice + 600 : basePrice;

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, contact phone (03xx-xxxxxxx), and address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createBooking({
        customerName,
        email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@client.pk`,
        phone,
        address,
        city: city || selectedCity,
        clientType,
        serviceCategory: serviceCategory || 'General Plumbing Inspection',
        priority,
        preferredDate,
        timeSlot,
        description: description || 'Home plumbing service requested',
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
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {step === 3 ? 'Booking Confirmed!' : 'Book KwikFix Plumber'}
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {city}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step === 1 && 'Step 1 of 2: Service & Schedule Details'}
                {step === 2 && 'Step 2 of 2: Location & Contact Information'}
                {step === 3 && 'NADRA-verified Ustad assigned with 7-Day Guarantee'}
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
                  Premise Type
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
                    <span>Residential (House / Flat)</span>
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
                    <span>Commercial (Shop / Office / Plaza)</span>
                  </button>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Plumbing Job
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>
                      {s.title} (From Rs. {s.basePrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Dispatch Priority
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { val: 'standard', label: 'Standard Slot', desc: 'Scheduled visit', badge: 'Standard Rate' },
                    { val: 'urgent', label: 'Same Day', desc: 'Within 2-3 hours', badge: '+ Rs. 300' },
                    { val: 'emergency', label: 'Emergency', desc: '< 45 min arrival', badge: '+ Rs. 600' }
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
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                    <option value="Evening (03:00 PM - 06:00 PM)">Evening (03:00 PM - 06:00 PM)</option>
                    <option value="Night (06:00 PM - 09:00 PM)">Night (06:00 PM - 09:00 PM)</option>
                    {priority === 'emergency' && (
                      <option value="Immediate 45-Min Urgent Dispatch">Immediate 45-Min Urgent Dispatch</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  Est. Upfront Rate: <strong className="text-sm font-black text-sky-600 dark:text-sky-400 font-mono">Rs. {estimatedTotal.toLocaleString()}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm flex items-center space-x-1.5 shadow"
                >
                  <span>Continue to Address &amp; Contact</span>
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
                      placeholder="e.g. Asad Farooq"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mobile Phone (For SMS &amp; WhatsApp Arrival) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email (for invoice &amp; warranty certificate)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. name@domain.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-semibold"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Complete Address &amp; Area (House #, Street, Sector / Block) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. House 42-B, Street 14, Phase 6, DHA"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Any specific notes or details (e.g. Golden pump model, Master mixer, 2nd floor)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Water motor making buzzing noise and trip switch triggering..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No advance payment needed. Pay safely to the technician after job completion.</span>
                </span>
                <span className="font-bold text-sky-600 dark:text-sky-400">Cash / JazzCash</span>
              </div>

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
                    <span>Confirming Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Dispatch Ustad</span>
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
                  KwikFix Booking Confirmed!
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
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-mono font-bold text-emerald-600">Rs. {estimatedTotal.toLocaleString()}</span>
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
                  <span className="text-slate-500">Technician:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">NADRA Verified Staff Dispatched</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Hi KwikFix, I just booked ticket ${submittedBookingId} for ${serviceCategory} at ${address}, ${city}. Please confirm plumber ETA.`)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Ticket to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
