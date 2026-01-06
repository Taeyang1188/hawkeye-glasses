
import React, { useEffect } from 'react';
import { Instagram, PlayCircle, Star } from 'lucide-react';

const LatestReview: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    
    // Elfsight 플랫폼 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 처리 (생략 가능)
    };
  }, []);

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="border-b border-gray-100 py-20 px-6 bg-gray-50">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Instagram size={32} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tight">Latest Reviews</h1>
          <p className="text-sm text-gray-400 uppercase tracking-[0.3em] max-w-xl mx-auto leading-relaxed">
            호크아이안경과 함께하는 고객들의 스타일리시한 순간.<br />
            실제 착용 리뷰와 인스타그램 피드를 통해 영감을 얻어보세요.
          </p>
          <div className="flex justify-center space-x-8 pt-4">
             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Instagram size={14} /> <span>#명동안경</span>
             </div>
             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <PlayCircle size={14} /> <span>Style Reels</span>
             </div>
          </div>
        </div>
      </section>

      {/* Instagram Widget Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Instagram Feed</h3>
          <div className="h-px bg-gray-100 w-full"></div>
        </div>
        <div className="min-h-[400px] w-full">
          <div className="elfsight-app-d96e7341-fec3-4852-b86a-9a0bada92f4c" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* Google Reviews Widget Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 border-t border-gray-50">
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
            <Star size={14} fill="currentColor" /> Google Reviews
          </h3>
          <div className="h-px bg-gray-100 w-full"></div>
        </div>
        <div className="min-h-[300px] w-full">
          {/* 사용자가 제공한 Elfsight Google Reviews 위젯 코드 적용 */}
          <div className="elfsight-app-6a8001bb-81c1-4784-ac48-2349f860e961" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="bg-black text-white py-24 text-center px-6">
        <div className="max-w-5xl mx-auto space-y-8">
           <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500">Your Vision, Our Pride</h4>
           <h2 className="text-2xl md:text-3xl font-light leading-relaxed md:whitespace-nowrap break-keep">
             "당신의 시선이 머무는 곳에 호크아이안경이 함께 하겠습니다."
           </h2>
           <p className="text-sm text-gray-400 font-light leading-relaxed max-w-lg mx-auto">
             17년의 경험과 최신 장비가 만나 단순한 교정을 넘어 고객의 스타일과 자부심을 완성합니다.
             명동 소공지하쇼핑센터에서 더 많은 이야기를 만나보세요.
           </p>
           <div className="pt-8">
             <a 
               href="https://www.instagram.com/hawk_eye_optical/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block border border-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
             >
               Follow us on Instagram
             </a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default LatestReview;
