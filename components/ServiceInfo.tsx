
import React from 'react';
import { Ruler, ShieldCheck, Cpu, Star } from 'lucide-react';

const ServiceInfo: React.FC = () => {
  const services = [
    {
      icon: <Star size={40} />,
      title: "17년 경력 베테랑",
      desc: "수만 번의 조제 경험을 가진 베테랑 안경사의 정교한 손길"
    },
    {
      icon: <Cpu size={40} />,
      title: "HUVITS 최첨단 장비",
      desc: "정밀한 시력검사 및 조제가공을 위한 HUVITS 최신 시스템 완비"
    },
    {
      icon: <Ruler size={40} />,
      title: "퍼스널 핏팅 서비스",
      desc: "사용자의 얼굴 구조를 고려한 완벽한 착용감의 1:1 커스텀 핏팅"
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "합리적인 프리미엄",
      desc: "최상급 브랜드의 제품을 거품 없는 투명한 가격으로 제공"
    }
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gray-500 block mb-4 font-bold">The Best Myeongdong Optical Shop</span>
              <h1 className="text-3xl md:text-4xl font-light uppercase tracking-tight leading-tight mb-8">
                오랜 시간 쌓아온 감각은 그대로,<br />명동의 공간은 새롭게.
              </h1>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-base md:text-lg">
                <p>
                  17년 동안 다듬어온 검안과 피팅의 기준으로 <strong>명동 소공지하쇼핑센터</strong>에서 첫 인사를 드립니다. 
                  많은 분들이 추천하는 명동 안경점으로서의 자부심을 지켜나가겠습니다.
                </p>
                <p>
                  정확한 시력검사부터 완벽한 핏팅, 그리고 정밀한 조제가공까지. 
                  우리는 단순한 안경이 아닌, <strong>Korean Style Eyewear</strong> 트렌드와 당신의 삶에 가장 잘 맞는 '한 벌의 시선'을 제안합니다.
                </p>
                <p className="text-white font-medium italic text-lg md:text-xl">
                  "오늘, 당신에게 가장 잘 맞는 한 벌의 시선을 준비해둘게요."
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-10 border-t border-gray-800">
              {services.map((s, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-gray-400 mb-2">{s.icon}</div>
                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">{s.title}</h4>
                  <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden group">
            <img 
              src="https://i.imgur.com/AyzWnq6.jpeg" 
              alt="Hawkeye Optical Myeongdong Interior" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 border-[20px] border-black opacity-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
