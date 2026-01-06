
import React, { useState } from 'react';
import { MessageCircle, Phone, X, Calendar } from 'lucide-react';

const ConsultationFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end space-y-4">
      {/* Expanded Menu */}
      <div className={`flex flex-col items-end space-y-3 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
        <a 
          href="https://naver.me/xrC3acHO" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black border border-gray-100 px-5 py-3 rounded-full shadow-xl flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Naver Reserve</span>
          <Calendar size={18} className="text-green-600" />
        </a>
        <a 
          href="tel:02-3789-0691"
          className="bg-white text-black border border-gray-100 px-5 py-3 rounded-full shadow-xl flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Call Shop</span>
          <Phone size={18} className="text-blue-600" />
        </a>
        <a 
          href="https://pf.kakao.com/_xxxxxx" // 실제 카카오톡 채널 링크로 변경 가능
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FAE100] text-black px-5 py-3 rounded-full shadow-xl flex items-center space-x-3 hover:brightness-95 transition-all group"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Kakao Talk</span>
          <MessageCircle size={18} />
        </a>
      </div>

      {/* Main FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${isOpen ? 'bg-black text-white rotate-90' : 'bg-black text-white hover:scale-110'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Label Tooltip (Desktop only) */}
      {!isOpen && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 hidden md:block whitespace-nowrap">
          <p className="text-[10px] font-bold uppercase tracking-widest">상담 및 예약</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationFAB;
