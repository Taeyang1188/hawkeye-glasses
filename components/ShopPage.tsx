
import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { SlidersHorizontal, ChevronLeft, Share2, Heart, MessageCircle, ShoppingBag, Info, Search } from 'lucide-react';
import { Category, FilterConfig } from '../App.tsx';

interface Product {
  id: number;
  category: Category;
  name: string;
  brand: string;
  price: number | '상담 필요';
  image_url: string;
  tags: string[];
  filters: Record<string, string>;
  is_new: boolean;
  is_premium: boolean;
}

interface ShopPageProps {
  initialConfig: FilterConfig;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToCart: (id: number) => void;
  productStats: Record<number, number>;
  onProductView: (id: number) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ initialConfig, wishlist, toggleWishlist, addToCart, productStats, onProductView }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | 'BRAND' | 'SEARCH'>(initialConfig.search ? 'SEARCH' : (initialConfig.brand ? 'BRAND' : (initialConfig.category || '안경테')));
  const [activeTab, setActiveTab] = useState(initialConfig.tab || 'ALL');
  const [activeBrand, setActiveBrand] = useState<string | null>(initialConfig.brand || null);
  const [searchQuery, setSearchQuery] = useState(initialConfig.search || '');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // 백엔드 데이터 패칭
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedProductId(null);
    if (initialConfig.search) {
      setSearchQuery(initialConfig.search);
      setActiveCategory('SEARCH');
      setActiveBrand(null);
    } else if (initialConfig.brand) {
      setActiveBrand(initialConfig.brand);
      setActiveCategory('BRAND');
      setSearchQuery('');
    } else if (initialConfig.category) {
      setActiveCategory(initialConfig.category);
      setActiveBrand(null);
      setSearchQuery('');
    }
    if (initialConfig.tab) setActiveTab(initialConfig.tab);
  }, [initialConfig]);

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [selectedProductId, products]);

  // SEO: 상품 상세 진입 시 타이틀 변경
  useEffect(() => {
    if (selectedProduct) {
      document.title = `${selectedProduct.brand} ${selectedProduct.name} | 호크아이안경 프리미엄 컬렉션`;
    }
  }, [selectedProduct]);

  const handleProductClick = (id: number) => {
    onProductView(id);
    setSelectedProductId(id);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory === 'SEARCH' && searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.id.toString() === q
      );
    } else if (activeCategory === 'BRAND' && activeBrand) {
      result = result.filter(p => p.brand.toLowerCase() === activeBrand.toLowerCase());
    } else if (activeCategory !== 'SEARCH' && activeCategory !== 'BRAND') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeTab === 'NEW IN') {
      result = result.filter(p => p.is_new);
    } else if (activeTab === '베스트셀러') {
      result = result.sort((a, b) => (productStats[b.id] || 0) - (productStats[a.id] || 0));
    }

    return result;
  }, [activeCategory, activeTab, activeBrand, searchQuery, products, productStats]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold tracking-widest text-gray-400">LOADING COLLECTION...</div>;
  }

  if (selectedProduct) {
    const isWished = wishlist.includes(selectedProduct.id);
    return (
      <div className="bg-white min-h-screen animate-in fade-in duration-500">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-12">
            <button onClick={() => setSelectedProductId(null)} className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest hover:text-gray-500">
              <ChevronLeft size={16} /> <span>Back to Collection</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 aspect-[4/5] bg-gray-50 overflow-hidden">
              <img 
                src={selectedProduct.image_url} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                alt={`${selectedProduct.brand} ${selectedProduct.name} - 명동 호크아이안경 상세 이미지`} 
              />
            </div>
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <div className="space-y-2">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Product Highlight</p>
                   <p className="text-sm font-bold uppercase tracking-[0.2em]">{selectedProduct.brand}</p>
                   <h1 className="text-3xl font-light uppercase tracking-tight">{selectedProduct.name}</h1>
                </div>
                <div className="flex items-baseline space-x-4">
                  <p className="text-2xl font-medium tracking-tight">₩{Number(selectedProduct.price).toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <button onClick={() => addToCart(selectedProduct.id)} className="w-full bg-[#191919] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">ADD TO CART</button>
                <button onClick={() => toggleWishlist(selectedProduct.id)} className="w-full border border-gray-200 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:border-black transition-all flex items-center justify-center space-x-3">
                  <Heart size={16} fill={isWished ? "black" : "none"} className={isWished ? "text-black" : "text-gray-400"} />
                  <span>{isWished ? "WISHLISTED" : "ADD TO WISHLIST"}</span>
                </button>
              </div>
              <div className="pt-12 border-t border-gray-100 space-y-6 text-sm text-gray-500 font-light leading-relaxed">
                <p>호크아이안경의 모든 제품은 17년 경력 안경사의 정밀한 검수와 핏팅 과정을 거쳐 배송됩니다. 매장 방문 시 1:1 맞춤 피팅 서비스를 받으실 수 있습니다.</p>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Live View</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">실시간 조회수: <span className="text-black font-bold">{productStats[selectedProduct.id] || 0}</span>회</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-100 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-6 flex space-x-12 whitespace-nowrap">
          {activeCategory === 'SEARCH' && (
            <div className="py-6 text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-black flex items-center space-x-2">
              <span className="text-gray-400 font-light">RESULTS FOR:</span>
              <span>"{searchQuery}"</span>
            </div>
          )}
          {['안경테', '렌즈', '선글라스', '콘택트렌즈'].map(cat => (
            <button key={cat} onClick={() => {setActiveCategory(cat as Category); setActiveTab('ALL'); setActiveBrand(null); setSearchQuery('');}} 
                    className={`py-6 text-sm uppercase tracking-widest relative ${activeCategory === cat ? 'text-black font-bold' : 'text-gray-400'}`}>
              {cat}
              {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => handleProductClick(product.id)}>
              <div className="relative aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                <img 
                  src={product.image_url} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                  alt={`${product.brand} ${product.name} - 명동안경 호크아이 아이웨어`} 
                />
              </div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{product.brand}</p>
              <h3 className="text-sm font-medium mb-1">{product.name}</h3>
              <p className="text-sm font-bold">₩{Number(product.price).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
