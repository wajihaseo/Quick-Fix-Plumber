import React from 'react';
import { Wifi, WifiOff, RefreshCw, Database, Check } from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const OfflineIndicator: React.FC = () => {
  const { 
    isOnline, 
    isOfflineSimulated, 
    toggleSimulateOffline, 
    pendingSyncCount, 
    lastSyncedAt, 
    forceSyncOfflineQueue 
  } = usePlumbing();

  const isEffectivelyOffline = !isOnline || isOfflineSimulated;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Database className="w-4 h-4 text-sky-500" />
          <span className="font-semibold text-slate-900 dark:text-white">
            Offline Storage &amp; Data Caching:
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {isEffectivelyOffline 
              ? `Working in offline cache mode. ${pendingSyncCount > 0 ? `${pendingSyncCount} action(s) queued for sync.` : 'All local changes preserved.'}`
              : `Connected. Local database synchronized at ${lastSyncedAt}.`
            }
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {pendingSyncCount > 0 && (
            <button
              onClick={forceSyncOfflineQueue}
              className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] flex items-center space-x-1 shadow-xs transition-colors"
            >
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Sync {pendingSyncCount} Queued Record(s)</span>
            </button>
          )}

          <button
            onClick={toggleSimulateOffline}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] border transition-colors flex items-center space-x-1.5 ${
              isEffectivelyOffline
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {isEffectivelyOffline ? <WifiOff className="w-3 h-3 text-amber-500" /> : <Wifi className="w-3 h-3 text-emerald-500" />}
            <span>{isEffectivelyOffline ? 'Simulating Offline (Click to restore)' : 'Test Offline Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
