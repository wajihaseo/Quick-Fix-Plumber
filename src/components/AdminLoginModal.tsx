import React, { useState } from 'react';
import { Shield, Lock, X, CheckCircle2, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { switchRole } = usePlumbing();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [roleType, setRoleType] = useState<'admin' | 'provider'>('admin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: admin123 or kwikfix2026 or 1234
    if (pin === 'admin123' || pin === 'kwikfix2026' || pin === '1234' || pin === 'admin') {
      switchRole('admin');
      setError('');
      onSuccess();
    } else {
      setError('Invalid PIN or password. Try default: admin123');
    }
  };

  const handleQuickDemo = () => {
    switchRole('admin');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Private Admin Portal</h3>
              <p className="text-xs text-slate-300">Dedicated URL: <span className="font-mono text-blue-300">/#/admin</span></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRoleType('admin')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleType === 'admin' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Administrator Login
            </button>
            <button
              type="button"
              onClick={() => setRoleType('provider')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleType === 'provider' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ustad / Provider Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {roleType === 'admin' ? 'Admin Master PIN / Password' : 'Provider Mobile / Registered CNIC'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={roleType === 'admin' ? 'password' : 'text'}
                  required
                  placeholder={roleType === 'admin' ? 'Enter PIN (e.g. admin123)' : '03xx-xxxxxxx or CNIC'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
              <div className="font-bold flex items-center gap-1 text-blue-700 dark:text-blue-300">
                <KeyRound className="w-3.5 h-3.5" />
                Default Credentials:
              </div>
              <p>Master PIN: <strong className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">admin123</strong></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Yeh section aam public ko nazar nahi aata, sirf direct URL ya login se open hota hai.</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              1-Click Owner Login (Demo)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
