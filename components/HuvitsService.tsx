
import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HuvitsServiceProps {
  onShopNow: () => void;
}

const HuvitsService: React.FC<HuvitsServiceProps> = ({ onShopNow }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          alt="Optical Tech"
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] mb-6">HUVITS Precision</h1>
          <p className="text-lg md:text-xl font-light tracking-widest text-gray-300">첨단 기술로 완성하는 가장 정확한 시선</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">Advanced Eye Exam</span>
              <h2 className="text-3xl md:text-4xl font-light leading-tight uppercase tracking-tight">
                HUVITZ 디지털 포롭터 기반<br />정밀 검안 시스템
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              국내 안광학 장비 전문 브랜드 휴비츠의 최첨단 장비로 미세한 시력 차이까지 정교하게 측정합니다. 
              단순히 잘 보이는 것을 넘어, 눈의 피로도를 최소화하고 가장 편안한 도수를 찾아드립니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "0.01D 단위의 정밀 도수 측정",
                "개인별 조절력 및 양안시 검사",
                "디지털 자각적 굴절검사 시스템",
                "맞춤형 렌즈 설계 데이터 분석"
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm font-medium">
                  <CheckCircle size={18} className="text-black" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={onShopNow}
              className="flex items-center space-x-4 bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all group"
            >
              <span>프리미엄 렌즈 보러가기</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 border border-gray-100 pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>
            <img 
              src="https://i.imgur.com/u6qVvfG.png" 
              alt="Huvits Device" 
              className="w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-center mb-16">The Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "상담 및 문진", desc: "라이프스타일과 평소 시각적 불편함을 꼼꼼히 체크합니다." },
              { step: "02", title: "HUVITS 정밀 검안", desc: "휴비츠 최신 장비로 눈의 기능적 데이터를 수집합니다." },
              { step: "03", title: "맞춤형 렌즈 처방", desc: "분석된 데이터를 바탕으로 최적의 렌즈를 추천해 드립니다." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 text-center space-y-4 hover:translate-y-[-10px] transition-transform shadow-sm">
                <span className="text-4xl font-light text-gray-100">{item.step}</span>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HuvitsService;
