/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { BotMessageSquare, X } from 'lucide-react';

const ChatButton = ({ isOpen, onClick }) => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      return;
    }

    const interval = setInterval(() => {
      setShowBubble(true);
      // Tự động ẩn sau 4 giây để chờ chu kỳ tiếp theo
      setTimeout(() => setShowBubble(false), 4000);
    }, 7000);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end">
      {/* Suggestion Bubble */}
      {!isOpen && showBubble && (
        <div className="mb-3 mr-1 bg-white p-2.5 rounded-xl shadow-xl border border-blue-50 relative animate-slide-up">
          <div className="text-[11px] font-medium text-gray-600 pr-4 whitespace-nowrap">
            AI có thể giúp bạn tìm sản phẩm phù hợp 👋
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
          {/* Mũi tên của bubble */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-blue-50 rotate-45"></div>
        </div>
      )}

      {/* Main AI Button */}
      <button
        onClick={onClick}
        className={`
          group relative p-3.5 rounded-2xl shadow-xl transition-all duration-500 transform 
          hover:scale-110 active:scale-90
          ${isOpen
            ? 'bg-white text-gray-500 rotate-90 border border-gray-100'
            : 'bg-blue-600 text-white hover:shadow-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-bounce-slow'}
        `}
      >
        {isOpen ? <X size={22} /> : <BotMessageSquare size={22} />}

        {/* Glow Ping Effect when closed */}
        {!isOpen && <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 group-hover:hidden"></span>}
      </button>
    </div>
  );
};

export default ChatButton;