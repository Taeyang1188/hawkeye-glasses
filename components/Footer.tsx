
import React from 'react';
import { MapPin, Phone, Facebook, Clock, Instagram } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
  onNavigateFitting?: () => void;
  onNavigatePolicy?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onNavigateFitting, onNavigatePolicy }) => {
  const keywords = [
    "명동안경", "명동안경점", "명동안경원", "무테안경 전문", "시청역안경", 
    "myeongdong optical shop", "myeongdong eyewear shop", "best eyeglasses seoul", 
    "korean fashion glasses", "myeongdong shopping guide", "eye exam seoul"
  ];

  return (
    <footer className="bg-[#191919] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <img 
              src="https://i.imgur.com/sTJufRT.png" 
              alt="Hawkeye Optical Myeongdong" 
              className="h-24 md:h-32 w-auto invert brightness-0 object-contain"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              <strong>Hawkeye Optical Myeongdong</strong> delivers premium eyewear with 17 years of expertise. 
              Precision, style, and care for your vision in the heart of Seoul.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/hawk_eye_optical/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://www.google.com/viewer/place?mid=/g/11ym3bh3tg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.91 3.22-1.92 4.22-1.2 1.2-3.1 2.5-6.84 2.5-6.04 0-10.74-4.9-10.74-10.94S5.54 1.14 11.58 1.14c3.26 0 5.61 1.28 7.37 2.96l2.31-2.31C19.24.4 16.14-1 11.58-1 5.2-1 0 4.2 0 10.5s5.2 11.5 11.58 11.5c3.43 0 6.03-1.13 8.24-3.43 2.27-2.27 2.99-5.46 2.99-8.1 0-.77-.07-1.48-.2-2.15h-10.13z" />
                </svg>
              </a>
              <a 
                href="https://blog.naver.com/hawkeye_optical" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-[11px] font-bold hover:bg-white hover:text-black transition-all"
              >
                B
              </a>
              <a 
                href="https://naver.me/5noAk25v" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-[11px] font-bold hover:bg-white hover:text-black transition-all"
              >
                N
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Contact & Location</h4>
            <div className="space-y-4 text-sm font-light text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="shrink-0 text-white" />
                <span>서울 중구 소공로 102 소공지하쇼핑센터 30호 (명동역/시청역 인근)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0 text-white" />
                <span>02-3789-0691</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="shrink-0 mt-0.5 text-white" />
                <div className="flex flex-col space-y-0.5">
                  <span>월-토: 10:00 - 19:00</span>
                  <span className="text-red-500 font-medium">일요일: 정기휴무 (Regular Holiday)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Customer Service</h4>
            <nav className="flex flex-col space-y-3 text-sm font-light text-gray-400">
              <button 
                onClick={onNavigateFitting} 
                className="text-left hover:text-white transition-colors uppercase tracking-widest"
              >
                1:1 핏팅 서비스
              </button>
              <button 
                onClick={onNavigatePolicy} 
                className="text-left hover:text-white transition-colors uppercase tracking-widest"
              >
                교환 및 반품 안내 (CS)
              </button>
              <a 
                href="https://talk.naver.com/ct/wklrhfk?frm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors uppercase tracking-widest"
              >
                네이버 톡톡 문의
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Newsletter</h4>
            <p className="text-sm font-light text-gray-400">
              Subscribe to get news on Korean eyewear trends and exclusive Myeongdong store offers.
            </p>
            <div className="flex border-b border-gray-600 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent text-sm w-full focus:outline-none"
              />
              <button className="text-xs font-bold uppercase tracking-widest">Sign Up</button>
            </div>
          </div>
        </div>

        {/* SEO Keywords Footer Section */}
        <div className="pt-10 border-t border-gray-800">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            {keywords.map(kw => (
              <span key={kw} className="text-[10px] text-gray-600 uppercase tracking-widest">{kw}</span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
            <p>&copy; 2024 Hawkeye Optical Myeongdong. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 items-center">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              {onAdminClick && (
                <button 
                  onClick={onAdminClick}
                  className="ml-4 opacity-40 hover:opacity-100 transition-opacity text-gray-500 hover:text-white"
                >
                  ADMIN
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
