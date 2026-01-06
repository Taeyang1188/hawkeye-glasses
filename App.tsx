
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import FeaturedBrands from './components/FeaturedBrands.tsx';
import ServiceInfo from './components/ServiceInfo.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import ShopPage from './components/ShopPage.tsx';
import Footer from './components/Footer.tsx';
import CartPage from './components/CartPage.tsx';
import WishlistPage from './components/WishlistPage.tsx';
import LoginModal from './components/LoginModal.tsx';
import MyPage from './components/MyPage.tsx';
import HuvitsService from './components/HuvitsService.tsx';
import FittingService from './components/FittingService.tsx';
import BrandSelectionPage from './components/BrandSelectionPage.tsx';
import LatestReview from './components/LatestReview.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

export type Category = '안경테' | '렌즈' | '선글라스' | '콘택트렌즈';
export type FilterConfig = {
  category?: Category;
  tab?: 'NEW IN' | '베스트셀러' | '무테 컬렉션' | '프리미엄 렌즈' | 'ALL';
  brand?: string;
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'shop' | 'cart' | 'wishlist' | 'mypage' | 'huvits' | 'fitting' | 'brands' | 'latest-review' | 'admin-login' | 'admin-dashboard'>('home');
  const [shopFilter, setShopFilter] = useState<FilterConfig>({ category: '안경테', tab: 'ALL' });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasWelcomeCoupon, setHasWelcomeCoupon] = useState(false);

  const [productStats, setProductStats] = useState<Record<number, number>>({
    100: 52, 101: 48, 102: 95, 103: 30
  });

  // 자체 방문자 추적 시스템 (Native Daily Visitor Tracking)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const statsKey = 'hawkeye_visitor_stats';
    const visitedKey = `hawkeye_visited_${today}`;
    
    // 세션 내 중복 방문 방지 (오늘 이미 방문했는지 체크)
    if (!localStorage.getItem(visitedKey)) {
      const statsStr = localStorage.getItem(statsKey);
      const stats = statsStr ? JSON.parse(statsStr) : {};
      
      stats[today] = (stats[today] || 0) + 1;
      localStorage.setItem(statsKey, JSON.stringify(stats));
      localStorage.setItem(visitedKey, 'true'); // 오늘 방문 기록됨
    }
  }, []);

  const navigateToShop = (config: FilterConfig = { category: '안경테', tab: 'ALL' }) => {
    setShopFilter(config);
    setView('shop');
    window.scrollTo(0, 0);
  };

  const incrementView = (productId: number) => {
    setProductStats(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const handleUserIconClick = () => {
    if (!user) setIsLoginModalOpen(true);
    else setView('mypage');
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
    alert("상품이 쇼핑백에 담겼습니다.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-black text-white text-[10px] md:text-xs py-2 text-center farfetch-font uppercase tracking-widest cursor-pointer" onClick={() => setView('home')}>
        첫 방문시 10% 할인 혜택 제공
      </div>
      
      {/* 관리자 뷰일 때는 헤더를 숨길 수 있음 (선택 사항) */}
      {!view.startsWith('admin') && (
        <Header 
          onNavigateShop={navigateToShop} 
          onNavigateHome={() => setView('home')} 
          onNavigateCart={() => setView('cart')}
          onNavigateWishlist={() => setView('wishlist')}
          onNavigateHuvits={() => setView('huvits')}
          onNavigateFitting={() => setView('fitting')}
          onNavigateBrands={() => setView('brands')}
          onNavigateReviews={() => setView('latest-review')}
          onUserClick={handleUserIconClick}
          wishlistCount={wishlist.length}
          cartCount={cart.length}
          isLoggedIn={!!user}
        />
      )}
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onCtaClick={() => navigateToShop()} />
            <FeaturedBrands onBrandClick={(brand) => navigateToShop({ brand, tab: 'ALL' })} />
            <ServiceInfo />
            <div className="max-w-[1400px] mx-auto px-6 py-16">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-light uppercase tracking-tight">Trending Eyewear</h2>
                <button onClick={() => navigateToShop()} className="text-sm border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Shop All</button>
              </div>
              <ProductGrid onDetailClick={() => navigateToShop()} />
            </div>
          </>
        )}

        {view === 'admin-login' && (
          <AdminLogin onLoginSuccess={() => setView('admin-dashboard')} onCancel={() => setView('home')} />
        )}

        {view === 'admin-dashboard' && (
          <AdminDashboard onLogout={() => setView('home')} />
        )}

        {view === 'brands' && (
          <BrandSelectionPage onBrandSelect={(brand) => navigateToShop({ brand, tab: 'ALL' })} />
        )}

        {view === 'latest-review' && (
          <LatestReview />
        )}

        {view === 'shop' && (
          <ShopPage 
            initialConfig={shopFilter}
            wishlist={wishlist} 
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            productStats={productStats}
            onProductView={incrementView}
          />
        )}

        {view === 'cart' && (
          <CartPage cartItems={cart} isLoggedIn={!!user} onUserClick={handleUserIconClick} onRemove={(id) => setCart(prev => prev.filter(p => p !== id))} onShopNow={() => navigateToShop()} />
        )}

        {view === 'wishlist' && (
          <WishlistPage wishlist={wishlist} isLoggedIn={!!user} onUserClick={handleUserIconClick} toggleWishlist={toggleWishlist} addToCart={addToCart} onShopNow={() => navigateToShop()} />
        )}

        {view === 'mypage' && user && (
          <MyPage 
            user={user} 
            hasCoupon={hasWelcomeCoupon}
            onDownloadCoupon={() => setHasWelcomeCoupon(true)}
            onLogout={() => {setUser(null); setHasWelcomeCoupon(false); setView('home');}} 
            onShopNow={() => navigateToShop()} 
          />
        )}

        {view === 'huvits' && (
          <HuvitsService onShopNow={() => navigateToShop({ category: '렌즈', tab: '프리미엄 렌즈' })} />
        )}

        {view === 'fitting' && (
          <FittingService />
        )}
      </main>

      {!view.startsWith('admin') && <Footer onAdminClick={() => setView('admin-login')} />}

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={(u) => {setUser(u); setView('mypage'); setIsLoginModalOpen(false);}} />
      )}
    </div>
  );
};

export default App;
