
import React, { useEffect } from 'react';
import { Ruler, CheckCircle, ExternalLink, Scissors, UserCheck, Eye } from 'lucide-react';

const FittingService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center bg-[#191919] overflow-hidden">
        <img 
          src="https://i.imgur.com/7ljfqmD.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Optical Fitting"
        />
        <div className="relative z-10 text-center text-white px-6">
          <span className="text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Personalized Experience</span>
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight mb-4">
            The Perfect Fit
          </h1>
          <p className="text-lg md:text-xl font-light tracking-widest text-gray-300 max-w-2xl mx-auto">
            당신의 일상에 가장 완벽하게 밀착되는 단 하나의 안경을 위해
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight leading-tight">
                개인별 1:1 맞춤 핏팅 서비스<br />
                <span className="text-gray-400">1:1 Tailored Fitting Service</span>
              </h2>
              <div className="h-0.5 w-20 bg-black"></div>
            </div>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                안경은 단순한 패션 아이템이 아닌, 당신의 시력을 책임지는 정밀한 도구입니다. 
                아무리 좋은 안경테와 렌즈도 얼굴에 맞지 않으면 그 가치를 온전히 누릴 수 없습니다.
              </p>
              <p>
                17년 경력의 베테랑 안경사가 사용자의 귀 높이, 코 모양, 눈동자의 위치까지 
                정밀하게 분석하여 무중력에 가까운 편안함을 선사합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-t border-b border-gray-100">
              <div className="space-y-3">
                <Scissors size={24} className="text-black" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Precision Adjustment</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">0.1mm 단위의 정교한 프레임 조정으로 압박 없는 착용감을 구현합니다.</p>
              </div>
              <div className="space-y-3">
                <UserCheck size={24} className="text-black" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Anatomy Analysis</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">얼굴 비대칭을 고려한 커스텀 핏팅으로 흘러내림을 방지합니다.</p>
              </div>
              <div className="space-y-3">
                <Eye size={24} className="text-black" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Optical Alignment</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">안경 렌즈의 초점을 동공 위치와 정확히 일치시켜 선명도를 극대화합니다.</p>
              </div>
              <div className="space-y-3">
                <Ruler size={24} className="text-black" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Weight Distribution</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">코와 귀로 분산되는 하중을 최적화하여 장시간 착용에도 피로감이 적습니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 md:p-20 flex flex-col justify-center items-center text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-block bg-black text-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                EXCLUSIVE SERVICE
              </div>
              <h3 className="text-2xl md:text-3xl font-light uppercase tracking-tight">
                호크아이안경 구매 고객 전용 서비스<br />
                <span className="text-gray-400 text-lg">Exclusively for Hawkeye Customers</span>
              </h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              본 서비스는 호크아이안경에서 제품을 구매하신 고객님께 제공되는 프리미엄 케어 서비스입니다. 
              최상의 결과를 위해 100% 예약제로 운영되오니 양해 부탁드립니다.
            </p>

            <div className="w-full space-y-4">
              <a 
                href="https://naver.me/xrC3acHO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-[#191919] text-white py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center space-x-3 group"
              >
                <span>네이버 예약하기 (Naver Reservation)</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                * 구매 고객 성함을 반드시 예약 메모에 남겨주세요.
              </p>
            </div>

            <div className="pt-10 border-t border-gray-200 w-full grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Duration</p>
                <p className="text-sm font-medium">30 - 45 Minutes</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Technician</p>
                <p className="text-sm font-medium">Master Optician (17yr Exp.)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="bg-black text-white py-20 text-center px-6">
        <p className="text-xl md:text-2xl font-light italic tracking-tight mb-4">
          "The best glasses are the ones you forget you're wearing."
        </p>
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500">당신에게 가장 잘 맞는 한 벌의 시선을 약속합니다.</p>
      </section>
    </div>
  );
};

export default FittingService;
