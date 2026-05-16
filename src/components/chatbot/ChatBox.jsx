import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, X, Sparkles } from 'lucide-react';
import api from '../../api/api';
import ChatMessage from './ChatMessage';

const ChatBox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào 👋 Tôi là trợ lý ảo EasyShop. Tôi có thể giúp bạn tìm kiếm sản phẩm phù hợp hôm nay.", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/chatbot', { message: userText });
      const aiMsg = data.response;
      setMessages(prev => [...prev, {
        text: aiMsg.aiResponse || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.",
        products: aiMsg.products || [],
        sender: 'ai'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Rất tiếc, đã có lỗi kết nối với máy chủ AI. Bạn vui lòng thử lại sau!", sender: 'ai' }]);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-24 right-6 z-[9999] w-[calc(100%-48px)] sm:w-[350px] h-[550px] max-h-[70vh] 
      bg-gray-50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-white 
      transition-all duration-300 transform origin-bottom-right animate-slide-up`}>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[15px] tracking-wide">Trợ lý ảo AI Easy Shop</h3>
            <div className="flex items-center gap-1.5 text-blue-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              <span className="text-[10px] font-medium tracking-tighter">Đang hoạt động</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" ref={scrollRef}>
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}

        {/* Typing Animation */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white px-3 py-2 rounded-xl rounded-tl-none border border-gray-100 flex gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-2xl focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white transition-all duration-300">
          <input
            type="text"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400 text-gray-700"
            placeholder="Hỏi AI điều gì đó..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-300 ${inputValue.trim() && !isLoading
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-100 hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed scale-95'
              }`}
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;