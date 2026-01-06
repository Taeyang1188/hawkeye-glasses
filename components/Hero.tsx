
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative flex flex-col md:h-[80vh] bg-gray-50 overflow-hidden">
      {/* Image Area with Priority Hint */}
      <div className="relative h-[50vh] md:absolute md:inset-0 md:h-full">
        <img 
          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000" 
          alt="명동 호크아이안경 프리미엄 아이웨어 컬렉션" 
          className="w-full h-full object-cover grayscale-[20%]"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>
      
      {/* Text Card Area */}
      <div className="relative max-w-[1400px] mx-auto h-full px-6 flex flex-col justify-center items-start md:items-end w-full">
        <div className="bg-white p-8 md:p-12 max-w-lg shadow-2xl -mt-12 md:mt-0 relative z-10 mx-auto md:mx-0">
          <h1 className="text-3xl md:text-5xl font-light uppercase mb-6 tracking-tight leading-tight">
            품격 있는 안경,<br />그 이상의 가치
          </h1>
          <p className="text-gray-600 mb-8 font-light leading-relaxed text-sm md:text-base">
            호크아이안경은 프리미엄 안경과 렌즈를 합리적인 가격으로 선보입니다. 
            17년차 베테랑 안경사가 선사하는 설렘 가득한 완벽한 핏팅을 경험해보세요.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={onCtaClick} className="bg-black text-white px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors text-center">
              New Collection
            </button>
            <button onClick={onCtaClick} className="border border-black px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-all text-center">
              Our Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
