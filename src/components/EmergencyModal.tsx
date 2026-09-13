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
  HelpCircle
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const EmergencyModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    closeEmergencyModal, 
    createEmergencyCallout 
  } = usePlumbing();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Springfield Metro');
  const [issueType, setIssueType] = useState('High-Pressure Pipe Burst');
  const [description, setDescription] = useState('');
  const [clientType, setClientType] = useState<'residential' | 'commercial'>('residential');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emergencyResult, setEmergencyResult] = useState<{ id: string; techName: string } | null>(null);

  if (!isEmergencyModalOpen) return null;

  const emergencyIssues = [
    { label: 'High-Pressure Pipe Burst', desc: 'Water actively spraying from wall or ceiling' },
    { label: 'Severe Sewer Backup', desc: 'Waste water rising in drains or toilets' },
    { label: 'Water Heater Gas / Electrical Hazard', desc: 'Smell of gas, scorched tank, or boiling water' },
    { label: 'Commercial Line Shutoff Failure', desc: 'Main valve seized, restaurant or facility flooding' },
    { label: 'Frozen Pipe Rupture', desc: 'Thawing pipe split inside crawlspace or wall' }
  ];

  const handleSubmitEmergency = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please enter your name, contact phone, and exact location.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ticket = await createEmergencyCallout({
        customerName,
        phone,
        address,
        city,
        issueType,
        description: description || `Urgent dispatch requested for: ${issueType}`,
        clientType
      });
      setEmergencyResult({
        id: ticket.id,
        techName: ticket.assignedTechnicianName || 'Emergency Field Unit'
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
                  24/7 Emergency Dispatch Request
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-rose-800 uppercase">
                  P-1 Priority
                </span>
              </div>
              <p className="text-xs text-rose-100">
                Guaranteed response window &lt; 30 minutes in our service radius
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
                  CREW DISPATCHED!
                </h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  Ticket Reference: <span className="font-mono text-base font-extrabold text-sky-600">{emergencyResult.id}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Specialist <strong className="text-slate-900 dark:text-white">{emergencyResult.techName}</strong> is en route.
                </p>
              </div>

              {/* Immediate Safety Steps Checklist */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-left space-y-2 text-xs text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center space-x-1.5 text-amber-800 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Immediate Critical Safety Protocol:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Locate &amp; Turn Off Main Valve:</strong> Turn the valve clockwise until tight to halt incoming pressurized water.</li>
                  <li><strong>Stay Clear of Standing Water:</strong> If water level reaches electrical baseboard heaters or sockets, avoid stepping in the room.</li>
                  <li><strong>Open Lowest Cold Faucet:</strong> Helps relieve internal line pressure into a safe drain.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="tel:18005552782"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow flex items-center justify-center space-x-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Dispatcher Direct: (800) 555-AQUA</span>
                </a>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close Window
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

              {/* Property Classification */}
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
                  Residential Home
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
                  Commercial Facility / Business
                </button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Henderson"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone (Plumber will call immediately) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Service Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Street, Building, Unit Number"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brief Emergency Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Where is water coming from? Has main valve been closed?"
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
                  <span>{isSubmitting ? 'Transmitting to Emergency Central...' : 'DISPATCH ON-DUTY CREW NOW'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
