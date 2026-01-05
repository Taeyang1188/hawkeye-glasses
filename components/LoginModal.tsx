
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; picture?: string }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // JWT (Google ID Token) 디코딩 유틸리티 함수
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("JWT 디코딩 실패:", e);
      return null;
    }
  };

  useEffect(() => {
    // Google GIS 초기화
    /* global google */
    const initializeGoogleSignIn = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        (window as any).google.accounts.id.initialize({
          // 여기에 실제 Google Cloud Console에서 발급받은 클라이언트 ID를 입력하세요.
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // 커스텀 버튼 디자인을 유지하면서 구글 버튼 렌더링 (원하는 경우)
        // 또는 프로그래밍 방식으로 팝업 호출
      }
    };

    // 스크립트 로드 대기 후 초기화
    const timer = setTimeout(initializeGoogleSignIn, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCredentialResponse = (response: any) => {
    const userData = parseJwt(response.credential);
    if (userData) {
      onLoginSuccess({
        name: userData.name || userData.given_name,
        email: userData.email,
        picture: userData.picture
      });
    }
  };

  const triggerGoogleLogin = () => {
    if ((window as any).google) {
      (window as any).google.accounts.id.prompt(); // One Tap 프롬프트
      // 또는 명시적 팝업 호출을 위해 가상 버튼 클릭 효과
      (window as any).google.accounts.id.requestCode(); // Auth Code 방식 (필요시)
      
      // 가장 간단한 방식: 팝업 로그인 창 띄우기
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        scope: "openid profile email",
        callback: (tokenResponse: any) => {
            // 이 방식은 Access Token을 받습니다. 
            // 여기서는 ID Token(Credential) 방식이 프로필 정보 획득에 더 간편하므로 
            // .id.initialize 방식을 주력으로 사용합니다.
        },
      });
      
      // 실제 구현에서는 버튼 렌더링이 가장 안정적입니다.
      const googleBtnWrapper = document.getElementById('google-btn-wrapper');
      if (googleBtnWrapper) {
        (window as any).google.accounts.id.renderButton(
          googleBtnWrapper,
          { theme: 'outline', size: 'large', width: googleBtnWrapper.offsetWidth }
        );
        // 버튼이 나타나면 사용자가 직접 클릭하도록 안내하거나, 
        // prompt()를 사용하여 즉시 팝업을 띄울 수 있습니다.
        (window as any).google.accounts.id.prompt();
      }
    } else {
      alert("구글 로그인 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    onLoginSuccess({ name: email.split('@')[0], email });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md p-8 md:p-12 animate-in fade-in zoom-in duration-200 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-light uppercase tracking-tight mb-8 text-center">즐거운 쇼핑의 시작</h2>

        <div className="flex border-b border-gray-100 mb-8">
          <button 
            onClick={() => setTab('login')}
            className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest relative ${tab === 'login' ? 'text-black' : 'text-gray-400'}`}
          >
            로그인
            {tab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
          </button>
          <button 
            onClick={() => setTab('register')}
            className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest relative ${tab === 'register' ? 'text-black' : 'text-gray-400'}`}
          >
            신규 회원
            {tab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
          </button>
        </div>

        <form onSubmit={handleMockLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">이메일 주소</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          
          <button type="button" className="text-[10px] font-medium text-gray-500 underline underline-offset-4 hover:text-black">
            비밀번호를 잊으셨나요?
          </button>

          <button 
            type="submit"
            className="w-full bg-[#191919] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
          >
            {tab === 'login' ? '로그인' : '가입하기'}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold bg-white px-4 text-gray-400 tracking-widest">또는</div>
        </div>

        <div className="space-y-3">
          <div id="google-btn-wrapper" className="w-full">
            <button 
              onClick={triggerGoogleLogin} 
              className="w-full border border-gray-200 py-3.5 flex items-center justify-center space-x-3 text-xs font-medium hover:border-black transition-colors"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
              <span>구글 계정으로 로그인</span>
            </button>
          </div>
          <button className="w-full border border-gray-200 py-3.5 flex items-center justify-center space-x-3 text-xs font-medium hover:border-black transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-4 h-4" alt="Apple" />
            <span>애플 계정으로 로그인</span>
          </button>
          <button className="w-full border border-gray-200 py-3.5 flex items-center justify-center space-x-3 text-xs font-medium hover:border-black transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_2023.png" className="w-4 h-4" alt="Facebook" />
            <span>페이스북 계정으로 로그인</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} className="text-[11px] font-bold underline underline-offset-4 uppercase tracking-widest">
            {tab === 'login' ? '회원 가입' : '이미 계정이 있으신가요?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
