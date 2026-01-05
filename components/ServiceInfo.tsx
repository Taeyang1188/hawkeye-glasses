
import React from 'react';
import { Ruler, ShieldCheck, Cpu, Star } from 'lucide-react';

const ServiceInfo: React.FC = () => {
  const services = [
    {
      icon: <Star size={32} />,
      title: "17년 경력 베테랑",
      desc: "수만 번의 조제 경험을 가진 베테랑 안경사의 정교한 손길"
    },
    {
      icon: <Cpu size={32} />,
      title: "HUVITS 최첨단 장비",
      desc: "정밀한 시력검사 및 조제가공을 위한 HUVITS 최신 시스템 완비"
    },
    {
      icon: <Ruler size={32} />,
      title: "퍼스널 핏팅 서비스",
      desc: "사용자의 얼굴 구조를 고려한 완벽한 착용감의 1:1 커스텀 핏팅"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "합리적인 프리미엄",
      desc: "최상급 브랜드의 제품을 거품 없는 투명한 가격으로 제공"
    }
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              당신의 시선이 머무는 곳에<br />호크아이가 함께 합니다
            </h2>
            <p className="text-gray-400 font-light text-lg mb-12 leading-relaxed">
              안경은 단순한 도구가 아닌 스타일과 건강의 교집합입니다. 
              명동 소공지하쇼핑센터에서 17년 동안 지켜온 신뢰로, 
              여전히 새 안경을 맞춰드릴 때의 설렘을 담아 작업합니다.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {services.map((item, idx) => (
                <div key={idx}>
                  <div className="text-white mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?auto=format&fit=crop&q=80&w=1000" 
              alt="HUVITS Equipment" 
              className="w-full h-full object-cover rounded-sm grayscale"
            />
            <div className="absolute -bottom-8 -left-8 bg-white text-black p-10 hidden lg:block">
              <p className="text-3xl font-light italic mb-2">"Still excited for every client."</p>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400">- Master Optician</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
