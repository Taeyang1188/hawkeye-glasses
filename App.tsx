
import React, { useState, useEffect } from 'react';
import { supabase, testConnection } from './lib/supabase.ts';
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
import ConsultationFAB from './components/ConsultationFAB.tsx';
import PolicyPage from './components/PolicyPage.tsx';

export type Category = '안경테' | '렌즈' | '선글라스' | '콘택트렌즈';
export type FilterConfig = {
  category?: Category;
  tab?: 'NEW IN' | '베스트셀러' | '무테 컬렉션' | '프리미엄 렌즈' | 'ALL';
  brand?: string;
  search?: string;
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'shop' | 'cart' | 'wishlist' | 'mypage' | 'huvits' | 'fitting' | 'brands' | 'latest-review' | 'admin-login' | 'admin-dashboard' | 'policy'>('home');
  const [shopFilter, setShopFilter] = useState<FilterConfig>({ category: '안경테', tab: 'ALL' });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasWelcomeCoupon, setHasWelcomeCoupon] = useState(false);
  const [productStats, setProductStats] = useState<Record<number, number>>({});

  useEffect(() => {
    testConnection();
    fetchProductStats();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
          email: session.user.email || ''
        });
        fetchUserWishlist(session.user.id);
      } else {
        setUser(null);
        setWishlist([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // SEO: 페이지 뷰에 따른 브라우저 타이틀 동적 변경
  useEffect(() => {
    const titles: Record<string, string> = {
      home: '호크아이안경 | 명동 안경원 추천 - 프리미엄 안경 & 정밀 검안',
      shop: '아이웨어 컬렉션 | 호크아이안경 - 명동 프리미엄 안경테 & 렌즈',
      huvits: 'HUVITS 정밀 검안 서비스 | 호크아이안경 - 최첨단 시력 측정',
      fitting: '1:1 퍼스널 핏팅 서비스 | 호크아이안경 - 완벽한 안경 피팅',
      brands: '브랜드관 | 호크아이안경 - 글로벌 명품 아이웨어 큐레이션',
      'latest-review': '고객 리뷰 | 호크아이안경 - 명동 안경원 실제 착용 후기',
      policy: '이용 가이드 & 정책 | 호크아이안경'
    };
    
    document.title = titles[view] || '호크아이안경 | 명동 안경원';
    
    // 강력한 스크롤 상단 이동 로직
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
    
    return () => clearTimeout(timeoutId);
  }, [view, shopFilter]);

  const fetchProductStats = async () => {
    const { data, error } = await supabase.from('products').select('id, view_count');
    if (!error && data) {
      const stats: Record<number, number> = {};
      data.forEach(p => stats[p.id] = p.view_count);
      setProductStats(stats);
    }
  };

  const fetchUserWishlist = async (userId: string) => {
    const { data, error } = await supabase.from('wishlist').select('product_id').eq('user_id', userId);
    if (!error && data) {
      setWishlist(data.map(item => item.product_id));
    }
  };

  const navigateToShop = (config: FilterConfig = { category: '안경테', tab: 'ALL' }) => {
    setShopFilter(config);
    setView('shop');
  };

  const handleSearch = (query: string) => {
    navigateToShop({ search: query, tab: 'ALL' });
  };

  const incrementView = async (productId: number) => {
    setProductStats(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    const { data } = await supabase.from('products').select('view_count').eq('id', productId).single();
    if (data) {
      await supabase.from('products').update({ view_count: data.view_count + 1 }).eq('id', productId);
    }
  };

  const toggleWishlist = async (productId: number) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const isWished = wishlist.includes(productId);
    if (isWished) {
      setWishlist(prev => prev.filter(id => id !== productId));
      await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId);
    } else {
      setWishlist(prev => [...prev, productId]);
      await supabase.from('wishlist').insert({ user_id: user.id, product_id: productId });
    }
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
          onUserClick={() => (!user ? setIsLoginModalOpen(true) : setView('mypage'))}
          onSearch={handleSearch}
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
              <ProductGrid onDetailClick={(id) => navigateToShop({ search: id.toString() })} />
            </div>
          </>
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
          <CartPage cartItems={cart} isLoggedIn={!!user} userId={user?.id} onUserClick={() => setIsLoginModalOpen(true)} onRemove={(id) => setCart(prev => prev.filter(p => p !== id))} onShopNow={() => navigateToShop()} />
        )}

        {view === 'wishlist' && (
          <WishlistPage wishlist={wishlist} isLoggedIn={!!user} onUserClick={() => setIsLoginModalOpen(true)} toggleWishlist={toggleWishlist} addToCart={addToCart} onShopNow={() => navigateToShop()} />
        )}

        {view === 'mypage' && user && (
          <MyPage 
            user={user} 
            hasCoupon={hasWelcomeCoupon}
            onDownloadCoupon={() => setHasWelcomeCoupon(true)}
            onLogout={async () => { await supabase.auth.signOut(); setView('home'); }} 
            onShopNow={() => navigateToShop()} 
          />
        )}
        
        {view === 'huvits' && <HuvitsService onShopNow={() => navigateToShop({ category: '렌즈', tab: '프리미엄 렌즈' })} />}
        {view === 'fitting' && <FittingService />}
        {view === 'policy' && <PolicyPage onBack={() => setView('home')} />}
        {view === 'brands' && <BrandSelectionPage onBrandSelect={(brand) => navigateToShop({ brand, tab: 'ALL' })} />}
        {view === 'latest-review' && <LatestReview />}
        {view === 'admin-login' && <AdminLogin onLoginSuccess={() => setView('admin-dashboard')} onCancel={() => setView('home')} />}
        {view === 'admin-dashboard' && <AdminDashboard onLogout={() => setView('home')} />}
      </main>

      {!view.startsWith('admin') && (
        <Footer 
          onAdminClick={() => setView('admin-login')} 
          onNavigateFitting={() => setView('fitting')}
          onNavigatePolicy={() => setView('policy')}
        />
      )}
      {!view.startsWith('admin') && <ConsultationFAB />}

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={(u) => { setView('mypage'); setIsLoginModalOpen(false); }} />
      )}
    </div>
  );
};

export default App;
