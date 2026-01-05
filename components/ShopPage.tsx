
import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ChevronLeft, Share2, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { Category, FilterConfig } from '../App.tsx';

interface Product {
  id: number;
  category: Category;
  name: string;
  brand: string;
  price: number | '상담 필요';
  image: string;
  detailImages?: string[];
  description?: string;
  tags: string[];
  filters: Record<string, string>;
  createdAt: string; // "YYYY-MM-DD"
  isNew?: boolean;   // 운영자 지정 NEW
  isPremium?: boolean; // 프리미엄 렌즈 등
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 100, category: '안경테', name: 'Classic Round Rimless', brand: 'Hawkeye Signature', price: 185000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    tags: ['BESTSELLER', '당일완성'], filters: { '형태': 'Rimless', '소재': 'Titanium' },
    createdAt: '2023-12-01', isNew: false
  },
  {
    id: 101, category: '안경테', name: 'Modern Square Titanium', brand: 'Hawkeye Signature', price: 210000,
    image: 'https://images.unsplash.com/photo-1591076482161-421a3aaee5f2?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'], filters: { '형태': 'Square', '소재': 'Titanium' },
    createdAt: new Date().toISOString().split('T')[0], isNew: true
  },
  {
    id: 102, category: '렌즈', name: 'Zeiss Digital Premium', brand: 'ZEISS', price: 450000,
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=600',
    tags: ['PREMIUM'], filters: { '목적': '블루라이트', '굴절률': '1.74' },
    createdAt: '2024-01-15', isPremium: true
  },
  {
    id: 103, category: '안경테', name: 'Acetate Boston Frame', brand: 'Oliver Peoples', price: 340000,
    image: 'https://images.unsplash.com/photo-1577803645773-f9337f846d1f?auto=format&fit=crop&q=80&w=600',
    tags: [], filters: { '형태': 'Boston', '소재': 'Acetate' },
    createdAt: '2024-02-10'
  },
  {
    id: 104, category: '안경테', name: 'KUBO Geometric', brand: 'Gentle Monster', price: 289000,
    image: 'https://images.unsplash.com/photo-1512411333314-9343949f6974?auto=format&fit=crop&q=80&w=600',
    tags: ['TRENDING'], filters: { '형태': 'Geometric', '소재': 'Acetate' },
    createdAt: '2024-03-01'
  },
  {
    // Fix: Using double quotes to handle single quote in product name
    id: 105, category: '선글라스', name: "L'Aveugle Par Amour", brand: 'Gucci', price: 420000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    tags: ['LUXURY'], filters: { '형태': 'Round', '소재': 'Metal' },
    createdAt: '2024-03-05'
  },
  {
    id: 106, category: '안경테', name: 'Heritage Titanium', brand: 'Lindberg', price: 780000,
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600',
    tags: ['PREMIUM'], filters: { '형태': 'Oval', '소재': 'Titanium' },
    createdAt: '2024-01-20', isPremium: true
  },
  {
    id: 107, category: '선글라스', name: 'Classic Aviator', brand: 'Tom Ford', price: 380000,
    image: 'https://images.unsplash.com/photo-1577803645773-f9337f846d1f?auto=format&fit=crop&q=80&w=600',
    tags: [], filters: { '형태': 'Aviator', '소재': 'Metal' },
    createdAt: '2024-02-15'
  }
];

// Added missing ShopPageProps interface to fix "Cannot find name 'ShopPageProps'"
interface ShopPageProps {
  initialConfig: FilterConfig;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToCart: (id: number) => void;
  productStats: Record<number, number>;
  onProductView: (id: number) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ initialConfig, wishlist, toggleWishlist, addToCart, productStats, onProductView }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'BRAND'>(initialConfig.brand ? 'BRAND' : (initialConfig.category || '안경테'));
  const [activeTab, setActiveTab] = useState(initialConfig.tab || 'ALL');
  const [activeBrand, setActiveBrand] = useState<string | null>(initialConfig.brand || null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    if (initialConfig.brand) {
      setActiveBrand(initialConfig.brand);
      setActiveCategory('BRAND');
    } else if (initialConfig.category) {
      setActiveCategory(initialConfig.category);
      setActiveBrand(null);
    }
    
    if (initialConfig.tab) setActiveTab(initialConfig.tab);
    setSelectedFilters({});
  }, [initialConfig]);

  const selectedProduct = useMemo(() => MOCK_PRODUCTS.find(p => p.id === selectedProductId), [selectedProductId]);

  const handleProductClick = (id: number) => {
    onProductView(id);
    setSelectedProductId(id);
  };

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // 1. 브랜드 필터링 (최우선)
    if (activeCategory === 'BRAND' && activeBrand) {
      result = result.filter(p => p.brand.toLowerCase() === activeBrand.toLowerCase());
    } else {
      // 카테고리 필터링
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. 탭 필터링
    if (activeTab === 'NEW IN') {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
      result = result.filter(p => p.isNew || new Date(p.createdAt) >= fourteenDaysAgo);
    } else if (activeTab === '베스트셀러') {
      result = result.sort((a, b) => (productStats[b.id] || 0) - (productStats[a.id] || 0));
    } else if (activeTab === '무테 컬렉션') {
      result = result.filter(p => p.category === '안경테' && p.filters['형태'] === 'Rimless');
    } else if (activeTab === '프리미엄 렌즈') {
      result = result.filter(p => p.category === '렌즈' && p.isPremium);
    }

    // 3. 사이드바 상세 필터 적용
    Object.entries(selectedFilters).forEach(([group, values]) => {
      if (values.length > 0) result = result.filter(p => values.includes(p.filters[group]));
    });

    return result;
  }, [activeCategory, activeTab, activeBrand, selectedFilters, productStats]);

  if (selectedProduct) {
    const isWished = wishlist.includes(selectedProduct.id);
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <button onClick={() => setSelectedProductId(null)} className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest mb-12 hover:text-gray-500">
            <ChevronLeft size={16} /> <span>Back to Collection</span>
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 aspect-[4/5] bg-gray-50"><img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} /></div>
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{selectedProduct.brand}</p>
                <h1 className="text-3xl font-light uppercase tracking-tight">{selectedProduct.name}</h1>
                <p className="text-xl font-medium">₩{selectedProduct.price.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">실시간 조회수: {productStats[selectedProduct.id] || 0}회</p>
              </div>
              <button onClick={() => addToCart(selectedProduct.id)} className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest">ADD TO CART</button>
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
          {activeCategory === 'BRAND' && activeBrand && (
            <div className="py-6 text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-black flex items-center space-x-2">
              <span className="text-gray-400 font-light">BRAND:</span>
              <span>{activeBrand}</span>
            </div>
          )}
          
          {['안경테', '렌즈', '선글라스', '콘택트렌즈'].map(cat => (
            <button key={cat} onClick={() => {setActiveCategory(cat as Category); setActiveTab('ALL'); setActiveBrand(null);}} 
                    className={`py-6 text-sm uppercase tracking-widest relative ${activeCategory === cat ? 'text-black font-bold' : 'text-gray-400'}`}>
              {cat}
              {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
            </button>
          ))}
          <button onClick={() => setActiveTab('NEW IN')} className={`py-6 text-sm uppercase tracking-widest relative ${activeTab === 'NEW IN' ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
            NEW IN {activeTab === 'NEW IN' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 italic">해당 조건에 맞는 상품이 아직 준비되지 않았습니다.</p>
            <button onClick={() => {setActiveCategory('안경테'); setActiveTab('ALL'); setActiveBrand(null);}} className="mt-4 text-xs font-bold uppercase underline underline-offset-4">모든 상품 보기</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <div className="relative aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={product.name} />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && <span className="bg-red-600 text-white px-2 py-1 text-[8px] font-bold uppercase tracking-widest">NEW</span>}
                    {product.isPremium && <span className="bg-black text-white px-2 py-1 text-[8px] font-bold uppercase tracking-widest">PREMIUM</span>}
                  </div>
                </div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{product.brand}</p>
                <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                <p className="text-sm font-bold">₩{product.price.toLocaleString()}</p>
                <p className="text-[9px] text-gray-300 mt-2 uppercase tracking-tighter">Views: {productStats[product.id] || 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
