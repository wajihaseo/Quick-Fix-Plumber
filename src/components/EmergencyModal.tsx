import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Flame, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Zap,
  MapPin,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const EmergencyModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    closeEmergencyModal, 
    createEmergencyCallout,
    selectedCity,
    openWhatsApp
  } = usePlumbing();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(selectedCity || 'Karachi');
  const [issueType, setIssueType] = useState('Concealed Wall Pipe Burst & Water Leak');
  const [description, setDescription] = useState('');
  const [clientType, setClientType] = useState<'residential' | 'commercial'>('residential');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emergencyResult, setEmergencyResult] = useState<{ id: string; techName: string } | null>(null);

  if (!isEmergencyModalOpen) return null;

  const emergencyIssues = [
    { label: 'Concealed Wall Pipe Burst & Water Leak', desc: 'Water leaking through walls, roof, or floor tiles' },
    { label: 'Burnt Suction Water Motor / No Water', desc: 'Pump humming, sparking or main line water stopped' },
    { label: 'Instant Gas Geyser Flame & Gas Leak', desc: 'Smell of Sui gas or ignition burner failure' },
    { label: 'Main Sewer Choke & Dirty Water Backup', desc: 'Gutter overflowing in courtyard, bathrooms or kitchen' },
    { label: 'Overhead Concrete Tank Overflow', desc: 'Ball valve broken, roof flooding and wasting water' }
  ];

  const handleSubmitEmergency = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please enter your name, mobile number (03xx-xxxxxxx), and address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ticket = await createEmergencyCallout({
        customerName,
        phone,
        address,
        city: city || selectedCity,
        issueType,
        description: description || `Urgent 45-min callout in ${city}: ${issueType}`,
        clientType
      });
      setEmergencyResult({
        id: ticket.id,
        techName: ticket.assignedTechnicianName || 'Emergency Field Ustad'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmergencyResult(null);
    closeEmergencyModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-rose-500 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Emergency Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-700 to-red-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/20 text-white animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold tracking-tight">
                  24/7 Emergency Dispatch ({city})
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-rose-800 uppercase">
                  45m SLA
                </span>
              </div>
              <p className="text-xs text-rose-100">
                Nearest mobile plumber team dispatched with tools &amp; safety valves
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-rose-200 hover:text-white hover:bg-rose-600/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {emergencyResult ? (
            /* Emergency Confirmation Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center animate-bounce">
                <Zap className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  PLUMBER DISPATCHED!
                </h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  Ticket Reference: <span className="font-mono text-base font-extrabold text-sky-600">{emergencyResult.id}</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Verified Ustad <strong className="text-slate-900 dark:text-white">{emergencyResult.techName}</strong> is heading to your address in {city}.
                </p>
              </div>

              {/* Immediate Safety Steps Checklist in Pakistan Context */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-left space-y-2 text-xs text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center space-x-1.5 text-amber-800 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Immediate Safety Precautions:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Turn off Main Water Gate Valve:</strong> Usually located near the underground water tank or meter to cut off water flow.</li>
                  <li><strong>Shut off Water Motor Breaker:</strong> Turn off the motor circuit switch on your electrical distribution box to prevent coil burnout.</li>
                  <li><strong>For Gas Geysers:</strong> Immediately close the gas brass cock and open bathroom windows for ventilation.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => openWhatsApp(`EMERGENCY: Plumber dispatched for ticket ${emergencyResult.id}. Please send live location.`)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Ticket to WhatsApp</span>
                </button>

                <a
                  href="tel:03005945349"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow flex items-center justify-center space-x-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Direct Helpline: 0300-5945349</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Emergency Request Form */
            <form onSubmit={handleSubmitEmergency} className="space-y-4">
              {/* Emergency issue selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Urgent Issue *
                </label>
                <div className="space-y-1.5">
                  {emergencyIssues.map(issue => (
                    <label
                      key={issue.label}
                      className={`flex items-start space-x-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                        issueType === issue.label
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="emergencyIssue"
                        checked={issueType === issue.label}
                        onChange={() => setIssueType(issue.label)}
                        className="mt-1 text-rose-600 focus:ring-rose-500"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {issue.label}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {issue.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Premise Classification */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setClientType('residential')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                    clientType === 'residential'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Residential House / Flat
                </button>
                <button
                  type="button"
                  onClick={() => setClientType('commercial')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                    clientType === 'commercial'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Commercial / Office / Restaurant
                </button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (Plumber will call) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Address / Area *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Block 4, Clifton / Street 12, DHA"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none font-bold"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brief Situation Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Where is water overflowing from? Is electrical switch near water?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                >
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>{isSubmitting ? 'Transmitting to Nearest Field Ustad...' : 'DISPATCH 45-MIN EMERGENCY PLUMBER'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
