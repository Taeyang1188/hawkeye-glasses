
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, ArrowLeft, Mail, Facebook, MessageCircle, Link } from 'lucide-react';

interface MyPageProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onShopNow: () => void;
}

type SubView = 'menu' | 'profile' | 'coupons' | 'referral';

const MyPage: React.FC<MyPageProps> = ({ user, onLogout, onShopNow }) => {
  const [subView, setSubView] = useState<SubView>('menu');
  const [referralStep, setReferralStep] = useState<1 | 2 | 3>(1);
  const [isCopied, setIsCopied] = useState(false);
  const [couponExpiry, setCouponExpiry] = useState<string>('2024.12.31');
  const [isCouponDownloaded, setIsCouponDownloaded] = useState(false);

  const referralLink = `https://hawkeye-optical.com/m/ol/ip2ht-${user.name.toLowerCase().replace(/\s/g, '-')}`;

  const handleDownloadCoupon = () => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setCouponExpiry(`${year}.${month}.${day}`);
    setIsCouponDownloaded(true);
    alert("웰컴 쿠폰이 발급되었습니다. 유효기간은 발급일로부터 1개월입니다.");
  };

  const renderMenuView = () => (
    <div className="max-w-md mx-auto py-12 px-6 animate-in slide-in-from-right duration-300">
      <h1 className="text-2xl font-medium tracking-tight mb-12">{user.name}</h1>
      <nav className="space-y-8">
        <button onClick={() => setSubView('profile')} className="w-full text-left text-lg font-light hover:text-gray-500 transition-colors flex justify-between items-center group">
          <span>내 정보</span> <ChevronRight size={20} className="opacity-0 group-hover:opacity-100" />
        </button>
        <button onClick={() => setSubView('coupons')} className="w-full text-left text-lg font-light hover:text-gray-500 transition-colors flex justify-between items-center group">
          <span>쿠폰 보기</span> <ChevronRight size={20} className="opacity-0 group-hover:opacity-100" />
        </button>
        <button onClick={() => { setSubView('referral'); setReferralStep(1); }} className="w-full text-left text-lg font-light hover:text-gray-500 transition-colors flex justify-between items-center group">
          <span>친구에게 추천하기</span> <ChevronRight size={20} className="opacity-0 group-hover:opacity-100" />
        </button>
      </nav>
      <div className="mt-20"><button onClick={onLogout} className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest">로그아웃</button></div>
    </div>
  );

  const renderProfileView = () => (
    <div className="max-w-[1400px] mx-auto px-6 py-12 animate-in fade-in duration-500">
      <button onClick={() => setSubView('menu')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest mb-12"><ArrowLeft size={16} /><span>마이페이지 메뉴</span></button>
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="relative aspect-[21/9] bg-gray-900 overflow-hidden flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <h2 className="relative text-2xl md:text-3xl font-light text-white uppercase tracking-widest">호크아이의 단골이 되어주셔서 감사합니다</h2>
        </div>
        <div className="border border-gray-100 p-10 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em]">나의 웰컴 리워드</h3>
          <div className="bg-gray-50 py-8 px-6">
            <p className="text-2xl font-light tracking-tighter mb-2">첫 방문 고객 10% 할인 쿠폰</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              {isCouponDownloaded ? `Valid until: ${couponExpiry}` : '다운로드 시 1개월 유효'}
            </p>
          </div>
          <button 
            disabled={isCouponDownloaded}
            onClick={handleDownloadCoupon} 
            className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${isCouponDownloaded ? 'bg-gray-100 text-gray-400 cursor-default' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {isCouponDownloaded ? '다운로드 완료' : '쿠폰 다운로드 받기'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderReferralView = () => (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <button onClick={() => setSubView('menu')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest mb-12"><ArrowLeft size={16} /><span>마이페이지 메뉴</span></button>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row border border-gray-100">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center items-center text-center space-y-8">
          {referralStep === 1 ? (
            <>
              <h3 className="text-2xl font-bold">너도나도 10% 할인받기<br />호크아이를 추천하고 함께 받는 리워드</h3>
              <button onClick={() => setReferralStep(2)} className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest">10% 할인 받기</button>
            </>
          ) : (
            <div className="w-full space-y-8">
              <h3 className="text-xl font-light">{user.name} , 지금 다음을 사용하여 초대하세요:</h3>
              <div className="flex justify-center gap-4">
                {[MessageCircle, Mail, Facebook, Link].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 border border-black flex items-center justify-center"><Icon size={18} /></button>
                ))}
              </div>
              <p className="text-2xl font-bold">{user.name}</p>
              <button onClick={() => {navigator.clipboard.writeText(referralLink); setIsCopied(true); setTimeout(()=>setIsCopied(false), 2000);}} className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest">
                {isCopied ? "복사 완료" : "링크 복사하기"}
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block flex-1 bg-gray-50"><img src="https://images.unsplash.com/photo-1591076482161-421a3aaee5f2?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" /></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {subView === 'menu' && renderMenuView()}
      {subView === 'profile' && renderProfileView()}
      {subView === 'coupons' && (
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <button onClick={() => setSubView('menu')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest mb-12"><ArrowLeft size={16} /><span>마이페이지 메뉴</span></button>
          <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-light uppercase tracking-tight">나의 쿠폰함</h2>
            {isCouponDownloaded ? (
              <div className="border border-black p-8 text-left bg-gray-50">
                <p className="text-[10px] font-bold text-gray-400 mb-2">WELCOME BENEFIT</p>
                <h3 className="text-xl font-medium">10% 할인 쿠폰</h3>
                <p className="text-xs mt-2">유효기간: {couponExpiry}</p>
              </div>
            ) : <p className="text-gray-400 italic">보유한 쿠폰이 없습니다.</p>}
          </div>
        </div>
      )}
      {subView === 'referral' && renderReferralView()}
    </div>
  );
};

export default MyPage;
