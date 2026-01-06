
import React, { useState } from 'react';
import { X } from 'lucide-react';
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: email.split('@')[0] }
          }
        });
        if (error) throw error;
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
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
      <div className="relative bg-white w-full max-w-md p-8 md:p-12 animate-in fade-in zoom-in duration-200 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-light uppercase tracking-tight mb-8 text-center">HAWKEYE OPTICAL</h2>

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
          <button type="submit" disabled={loading} className="w-full bg-[#191919] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-50">
            {loading ? '처리 중...' : (tab === 'login' ? '로그인' : '회원 가입')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
