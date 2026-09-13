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
  ExternalLink,
  MessageSquare
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
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Plumbing & pipe leak repair 🔧',
    'AC Master Service & gas refill 💨',
    'Electrical wiring / breaker trip ⚡',
    'Water tank cleaning rates 🌊',
    'Emergency 45-min arrival 🚨'
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

  const handlePrompt = (promptText: string) => {
    if (!isChatOpen) toggleChat();
    sendChatMessage(promptText);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Floating Greeting Bubble matching screenshot */}
      {!isChatOpen && showGreetingBubble && (
        <div className="mb-3 flex flex-col items-end space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Main Speech Bubble */}
          <div className="relative bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center space-x-2">
            <span>👋 Hi! How can we help?</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBubble(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Action Chips matching screenshot */}
          <div className="flex flex-col items-end space-y-1.5">
            <button
              onClick={() => handlePrompt('I have a question about KwikFix home services.')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:scale-105 transition-all text-right"
            >
              I have a question
            </button>
            <button
              onClick={() => handlePrompt('Tell me more about pricing and verified ustads.')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:scale-105 transition-all text-right"
            >
              Tell me more
            </button>
          </div>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isChatOpen && (
        <div 
          className="mb-3 w-[92vw] sm:w-96 h-[520px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Chat Header */}
          <div className="p-3.5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>KwikFix Live Support</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-blue-100">
                  {selectedCity} Dispatch &amp; Customer Care
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => openWhatsApp('AoA, I need quick support from KwikFix')}
                title="Switch to WhatsApp"
                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-[10px]">WhatsApp</span>
              </button>

              <button 
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/50">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.quickAction && (
                  <button
                    onClick={() => {
                      if (msg.quickAction?.type === 'book') openBookingModal();
                      if (msg.quickAction?.type === 'emergency') openEmergencyModal();
                      if (msg.quickAction?.type === 'call') window.open('tel:03005945349');
                    }}
                    className="mt-1.5 px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold hover:bg-blue-200 transition-colors flex items-center gap-1"
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
                onClick={() => handlePrompt(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Trigger Button matching screenshot */}
      <button
        id="live-chat-toggle-btn"
        onClick={toggleChat}
        className="relative p-3.5 sm:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Open support chat"
      >
        <MessageSquare className="w-6 h-6 fill-white text-blue-600" />
        
        {/* Unread badge matching red '1' in screenshot */}
        {!isChatOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">
            {unreadChatCount || 1}
          </span>
        )}
      </button>
    </div>
  );
};
