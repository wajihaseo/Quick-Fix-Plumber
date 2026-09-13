import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Wrench, 
  AlertTriangle, 
  Calendar, 
  Sparkles,
  PhoneCall,
  User,
  ExternalLink
} from 'lucide-react';
import { usePlumbing } from '../context/PlumbingContext';

export const LiveChatWidget: React.FC = () => {
  const { 
    chatMessages, 
    sendChatMessage, 
    isChatOpen, 
    toggleChat, 
    unreadChatCount,
    openBookingModal,
    openEmergencyModal,
    selectedCity,
    openWhatsApp
  } = usePlumbing();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Emergency pipe burst! 🚨',
    'Water motor not lifting water ⚙️',
    'Geyser repair & fitting 🔥',
    'Tank cleaning rates 🌊',
    'Tap / Muslim shower repair 🚰'
  ];

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  const handleQuickPromptClick = (text: string) => {
    sendChatMessage(text);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Chat Window */}
      {isChatOpen && (
        <div 
          className="mb-3 w-[92vw] sm:w-96 h-[520px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Chat Header */}
          <div className="p-3.5 bg-gradient-to-r from-sky-600 to-cyan-600 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  KwikFix Live Support
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-normal">{selectedCity}</span>
                </h4>
                <p className="text-[11px] text-sky-100">
                  Instant plumbing triage &amp; rate card in PKR
                </p>
              </div>
            </div>

            <button
              onClick={toggleChat}
              className="p-1 rounded-lg text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick WhatsApp Switch banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-900 px-3 py-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <span className="font-medium flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              Prefer WhatsApp?
            </span>
            <button
              onClick={() => openWhatsApp('AoA KwikFix, I need customer support for plumbing.')}
              className="font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
            >
              Open WhatsApp <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Emergency Warning Banner inside chat */}
          <div className="bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-900 px-3 py-1.5 text-[11px] text-rose-800 dark:text-rose-300 flex items-center justify-between">
            <span className="font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Water Pipe Burst?
            </span>
            <button
              onClick={openEmergencyModal}
              className="underline font-bold text-rose-700 dark:text-rose-200 hover:text-rose-900"
            >
              45-Min Callout Form
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/50 text-xs">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Quick Action Button if provided by bot */}
                {msg.quickAction && (
                  <button
                    onClick={() => {
                      if (msg.quickAction?.actionType === 'emergency_call') {
                        openEmergencyModal();
                      } else {
                        openBookingModal(msg.quickAction?.prefillData?.serviceCategory);
                      }
                    }}
                    className="mt-1.5 px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-[11px] font-bold hover:bg-sky-200 dark:hover:bg-sky-900 transition-all flex items-center space-x-1 shadow-xs"
                  >
                    <span>{msg.quickAction.label}</span>
                  </button>
                )}

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPromptClick(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Aap ko kis kaam me madad chahye?..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        id="live-chat-toggle-btn"
        onClick={toggleChat}
        className="relative group p-3.5 sm:p-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-600/30 transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Open 24/7 customer support chat"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadChatCount > 0 && !isChatOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900 animate-pulse">
            {unreadChatCount}
          </span>
        )}
      </button>
    </div>
  );
};
