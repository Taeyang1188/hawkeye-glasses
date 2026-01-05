
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] bg-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Eyewear" 
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>
      
      <div className="relative max-w-[1400px] mx-auto h-full px-6 flex flex-col justify-center items-start md:items-end">
        <div className="bg-white p-8 md:p-12 max-w-lg shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-light uppercase mb-6 tracking-tight leading-none">
            품격 있는 안경,<br />그 이상의 가치
          </h1>
          <p className="text-gray-600 mb-8 font-light leading-relaxed">
            호크아이안경은 프리미엄 안경과 렌즈를 합리적인 가격으로 선보입니다. 
            17년차 베테랑 안경사가 선사하는 설렘 가득한 완벽한 핏팅을 경험해보세요.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={onCtaClick} className="bg-black text-white px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              New Collection
            </button>
            <button onClick={onCtaClick} className="border border-black px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Our Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
