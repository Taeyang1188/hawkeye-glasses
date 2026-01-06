
import React from 'react';
import { MapPin, Phone, Facebook, Clock, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const keywords = ["명동안경", "명동안경점", "명동안경원", "무테안경", "시청역안경", "myeongdong glasses", "myeongdong optical shop", "myeongdong eyewear", "seoul eyeglasses"];

  return (
    <footer className="bg-[#191919] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <img 
              src="https://i.imgur.com/sTJufRT.png" 
              alt="Hawkeye Optical" 
              className="h-24 md:h-32 w-auto invert brightness-0 object-contain"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              Hawkeye Optical delivers premium eyewear with 17 years of expertise. 
              Precision, style, and care for your vision.
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
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Contact Us</h4>
            <div className="space-y-4 text-sm font-light text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="shrink-0 text-white" />
                <span>서울 중구 소공로 102 소공지하쇼핑센터 30호</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0 text-white" />
                <span>02-3789-0691</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="shrink-0 mt-0.5 text-white" />
                <div className="flex flex-col space-y-0.5">
                  <span>월-토: 10:00 - 19:00</span>
                  <span className="text-red-500 font-medium">일요일: 정기휴무</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Customer Service</h4>
            <nav className="flex flex-col space-y-3 text-sm font-light text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Vision Checkups</a>
              <a href="#" className="hover:text-white transition-colors">Frame Repairs</a>
              <a href="#" className="hover:text-white transition-colors">Custom Fitting</a>
              <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
              <a href="#" className="hover:text-white transition-colors">Contact Expert</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em]">Newsletter</h4>
            <p className="text-sm font-light text-gray-400">
              Subscribe to receive updates, access to exclusive deals, and more.
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
            <p>&copy; 2024 Hawkeye Optical. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
