
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';
import { Category, FilterConfig } from '../App.tsx';

interface HeaderProps {
  onNavigateShop: (config?: FilterConfig) => void;
  onNavigateHome: () => void;
  onNavigateCart: () => void;
  onNavigateWishlist: () => void;
  onNavigateHuvits: () => void;
  onNavigateFitting: () => void;
  onNavigateBrands: () => void;
  onNavigateReviews: () => void;
  onUserClick: () => void;
  wishlistCount: number;
  cartCount: number;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateShop, 
  onNavigateHome, 
  onNavigateCart,
  onNavigateWishlist,
  onNavigateHuvits,
  onNavigateFitting,
  onNavigateBrands,
  onNavigateReviews,
  onUserClick,
  wishlistCount, 
  cartCount,
  isLoggedIn
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileNav = (config?: FilterConfig | 'home' | 'cart' | 'wishlist' | 'huvits' | 'fitting' | 'brands' | 'latest-review') => {
    setIsMenuOpen(false);
    if (config === 'home') onNavigateHome();
    else if (config === 'cart') onNavigateCart();
    else if (config === 'wishlist') onNavigateWishlist();
    else if (config === 'huvits') onNavigateHuvits();
    else if (config === 'fitting') onNavigateFitting();
    else if (config === 'brands') onNavigateBrands();
    else if (config === 'latest-review') onNavigateReviews();
    else onNavigateShop(config as FilterConfig);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="md:hidden p-1" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
          <div className="hidden md:flex space-x-8 text-[13px] font-bold uppercase tracking-widest">
            <button onClick={() => onNavigateShop({ category: '안경테', tab: 'ALL' })} className="hover:text-gray-500 transition-colors">안경테</button>
            <button onClick={() => onNavigateShop({ category: '렌즈', tab: 'ALL' })} className="hover:text-gray-500 transition-colors">렌즈</button>
            <button onClick={() => onNavigateShop({ category: '선글라스', tab: 'ALL' })} className="hover:text-gray-500 transition-colors">선글라스</button>
            <button onClick={() => onNavigateShop({ category: '콘택트렌즈', tab: 'ALL' })} className="hover:text-gray-500 transition-colors">콘택트렌즈</button>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 cursor-pointer" onClick={onNavigateHome}>
          <img src="https://i.imgur.com/sTJufRT.png" alt="Hawkeye Optical Logo" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:flex items-center border-b border-gray-300 py-1">
            <input type="text" placeholder="찾고 계신 상품을 검색하세요" className="bg-transparent text-[13px] focus:outline-none w-32 xl:w-48 font-light" />
            <Search size={18} className="text-gray-400" />
          </div>
          <button onClick={onUserClick} className={`relative flex items-center space-x-2 ${isLoggedIn ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            <User size={20} />
            {isLoggedIn && <span className="hidden lg:inline text-[12px] font-bold uppercase tracking-tight">Peter Johnson</span>}
          </button>
          <button onClick={onNavigateWishlist} className="relative hover:text-gray-500 transition-colors">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{wishlistCount}</span>}
          </button>
          <button onClick={onNavigateCart} className="relative hover:text-gray-500 transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-center space-x-10 py-3 bg-white border-b border-gray-100 text-[12px] font-bold uppercase tracking-widest">
        <button onClick={() => onNavigateShop({ tab: 'NEW IN' })} className="text-red-600">NEW IN</button>
        <button onClick={() => onNavigateShop({ tab: '베스트셀러' })}>베스트셀러</button>
        <button onClick={() => onNavigateShop({ category: '안경테', tab: '무테 컬렉션' })}>무테 컬렉션</button>
        <button onClick={() => onNavigateShop({ category: '렌즈', tab: '프리미엄 렌즈' })}>프리미엄 렌즈</button>
        <button onClick={onNavigateHuvits}>HUVITS 정밀검안</button>
        <button onClick={onNavigateFitting}>1:1 핏팅서비스</button>
        <button onClick={onNavigateBrands}>브랜드관</button>
        <button onClick={onNavigateReviews}>LATEST REVIEW</button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white transition-transform duration-300 ease-out flex flex-col shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <img src="https://i.imgur.com/sTJufRT.png" alt="Hawkeye Logo" className="h-10 w-auto object-contain" />
             <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={28} /></button>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            <div className="p-8 space-y-12">
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Categories</p>
                <div className="flex flex-col space-y-6">
                  {['안경테', '렌즈', '선글라스', '콘택트렌즈'].map(cat => (
                    <button key={cat} onClick={() => handleMobileNav({ category: cat as Category, tab: 'ALL' })} className="flex justify-between items-center text-lg font-medium uppercase tracking-[0.1em] text-left">
                      <span>{cat}</span> <ChevronRight size={20} className="text-gray-300" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-gray-50">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Discover</p>
                <div className="flex flex-col space-y-6">
                  <button onClick={() => handleMobileNav({ tab: 'NEW IN' })} className="text-lg font-bold uppercase tracking-[0.1em] text-left text-red-600">NEW IN</button>
                  <button onClick={() => handleMobileNav({ tab: '베스트셀러' })} className="text-lg font-medium uppercase tracking-[0.1em] text-left">베스트셀러</button>
                  <button onClick={() => handleMobileNav({ category: '안경테', tab: '무테 컬렉션' })} className="text-lg font-medium uppercase tracking-[0.1em] text-left">무테 컬렉션</button>
                  <button onClick={() => handleMobileNav({ category: '렌즈', tab: '프리미엄 렌즈' })} className="text-lg font-medium uppercase tracking-[0.1em] text-left">프리미엄 렌즈</button>
                  <button onClick={() => handleMobileNav('huvits')} className="text-lg font-medium uppercase tracking-[0.1em] text-left">HUVITS 정밀검안</button>
                  <button onClick={() => handleMobileNav('fitting')} className="text-lg font-medium uppercase tracking-[0.1em] text-left">1:1 핏팅서비스</button>
                  <button onClick={() => handleMobileNav('brands')} className="text-lg font-medium uppercase tracking-[0.1em] text-left">브랜드관</button>
                  <button onClick={() => handleMobileNav('latest-review')} className="text-lg font-medium uppercase tracking-[0.1em] text-left">LATEST REVIEW</button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-100 bg-gray-50">
            <button onClick={() => handleMobileNav('home')} className="w-full text-sm font-bold uppercase tracking-[0.2em] py-5 border border-black text-center mb-4 hover:bg-black hover:text-white transition-all">홈으로 가기</button>
            <div className="flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest font-bold">
              <span>Customer Support</span>
              <span>02-3789-0691</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
