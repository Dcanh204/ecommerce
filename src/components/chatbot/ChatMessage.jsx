import React from 'react';
import { Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatMessage = ({ message }) => {
  const isAi = message.sender === 'ai';

  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }

  return (
    <div className={`flex w-full mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] items-end ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar Icon */}
        <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center mb-1 
          ${isAi ? 'bg-blue-100 text-blue-600 mr-2' : 'bg-gray-100 text-gray-600 ml-2'}`}>
          {isAi ? <Bot size={14} /> : <User size={14} />}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-2 w-full">
          <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed shadow-sm transition-all
            ${isAi ? 'bg-white text-gray-800 rounded-bl-none border border-gray-100' : 'bg-blue-600 text-white rounded-br-none'}`}>
            {message.text}
          </div>

          {/* Product Cards Rendering */}
          {isAi && message.products && message.products.length > 0 && (
            <div className="flex flex-col gap-2 mt-1">
              {message.products.map((product) => (
                <div key={product._id} className="flex items-center bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-28 p-2 gap-3">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover flex-shrink-0 rounded-lg border border-gray-50 shadow-sm" />
                  <div className="flex-1 flex flex-col justify-between h-full overflow-hidden py-0.5">
                    <div>
                      <h4 className="text-[10px] font-bold line-clamp-2 text-gray-800 leading-tight">{product.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-red-600 font-bold text-[11px]">{formatPrice(product.price * (1 - product.discount / 100))}</span>
                        {product.discount > 0 && <span className="text-[9px] text-gray-400 line-through font-normal">{formatPrice(product.price)}</span>}
                      </div>
                    </div>
                    <Link
                      to={`/product/details/${product.slug}`}
                      className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-[10px] font-bold text-center hover:bg-blue-700 transition-all shadow-sm active:scale-95 shadow-blue-100"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;