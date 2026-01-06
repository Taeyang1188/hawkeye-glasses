
import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; id: string }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 동의 항목 상태
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tab === 'register' && !privacyAgreed) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    setLoading(true);

    try {
      if (tab === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              full_name: email.split('@')[0],
              privacy_consent: privacyAgreed,
              marketing_consent: marketingAgreed,
              consent_date: new Date().toISOString(),
              data_retention_period: '3 years'
            }
          }
        });
        if (error) throw error;
        alert('회원가입이 완료되었습니다. 이메일을 확인하거나 바로 로그인 해주세요.');
        setTab('login');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          onLoginSuccess({
            id: data.user.id,
            name: data.user.user_metadata.full_name || data.user.email?.split('@')[0],
            email: data.user.email || ''
          });
        }
      }
    } catch (err: any) {
      alert(err.message || '인증에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md p-8 md:p-12 animate-in fade-in zoom-in duration-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <img src="https://i.imgur.com/sTJufRT.png" alt="Hawkeye" className="h-10 mx-auto mb-4 object-contain" />
          <h2 className="text-xl font-light uppercase tracking-[0.2em]">Hawkeye Optical</h2>
        </div>

        <div className="flex border-b border-gray-100 mb-8">
          <button onClick={() => setTab('login')} className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest relative ${tab === 'login' ? 'text-black' : 'text-gray-400'}`}>
            로그인 {tab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
          </button>
          <button onClick={() => setTab('register')} className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest relative ${tab === 'register' ? 'text-black' : 'text-gray-400'}`}>
            신규 가입 {tab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">이메일 주소</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
          </div>

          {tab === 'register' && (
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  checked={privacyAgreed} 
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <label htmlFor="privacy" className="text-xs font-medium cursor-pointer flex-grow">
                  개인정보 수집 및 이용 동의 (필수)
                </label>
                <button type="button" onClick={() => setShowTerms(!showTerms)} className="text-gray-400">
                  {showTerms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showTerms && (
                <div className="bg-gray-50 p-4 text-[10px] text-gray-500 leading-relaxed max-h-32 overflow-y-auto border border-gray-100 font-light">
                  <p className="font-bold text-black mb-1">[개인정보 수집 및 이용 안내]</p>
                  1. 수집 항목: 이메일, 이름, 서비스 이용 기록<br />
                  2. 수집 목적: 회원 식별, 서비스 제공, 고객 상담 응대<br />
                  <strong>3. 보유 기간: 회원 탈퇴 시까지 (단, 관계 법령에 따라 최대 3년간 보관 후 파기)</strong><br />
                  4. 동의 거부 시 서비스 이용에 제한이 있을 수 있습니다.
                </div>
              )}

              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="marketing" 
                  checked={marketingAgreed} 
                  onChange={(e) => setMarketingAgreed(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <label htmlFor="marketing" className="text-xs font-medium cursor-pointer">
                  마케팅 정보 활용 및 홍보 수신 동의 (선택)
                </label>
              </div>
              <p className="text-[9px] text-gray-400 leading-tight pl-7">
                신상품 출시, 이벤트 알림, 단독 혜택 등 맞춤 정보를 받아보실 수 있습니다. 동의하지 않으셔도 서비스 이용이 가능합니다.
              </p>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-[#191919] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-50">
            {loading ? '처리 중...' : (tab === 'login' ? '로그인' : '가입하고 혜택 받기')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {tab === 'login' ? '호크아이안경의 회원이 아니신가요?' : '이미 계정이 있으신가요?'}
            <button 
              onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
              className="ml-2 text-black font-bold underline underline-offset-4"
            >
              {tab === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
