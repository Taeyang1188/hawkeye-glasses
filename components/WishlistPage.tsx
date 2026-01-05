
import React from 'react';
import { ShoppingBag, X, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number | '상담 필요';
  image: string;
}

const MOCK_DATA: Product[] = [
  { id: 100, name: "Premium Frame 1", brand: "Hawkeye Signature", price: 150000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600" },
  { id: 101, name: "Premium Frame 2", brand: "Oliver Peoples", price: 170000, image: "https://images.unsplash.com/photo-1572635196238-14b3f281503f?auto=format&fit=crop&q=80&w=600" },
];

interface WishlistPageProps {
  wishlist: number[];
  isLoggedIn: boolean;
  onUserClick: () => void;
  toggleWishlist: (id: number) => void;
  addToCart: (id: number) => void;
  onShopNow: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, isLoggedIn, onUserClick, toggleWishlist, addToCart, onShopNow }) => {
  const items = wishlist.map(id => MOCK_DATA.find(p => p.id === id)).filter(Boolean) as Product[];

  if (!isLoggedIn) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
        <h1 className="text-3xl font-light uppercase tracking-tight mb-4">위시리스트</h1>
        <div className="border-t border-gray-100 py-12 flex flex-col items-start">
          <p className="text-sm text-gray-500 mb-8 max-w-lg">
            위시리스트 상품을 찾고 계신가요? 로그인 또는 회원 가입 후 마음에 든 상품을 살펴보고 쇼핑해 보세요.
          </p>
          <button 
            onClick={onUserClick}
            className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <h1 className="text-3xl font-light uppercase tracking-tight mb-2">위시리스트</h1>
      <p className="text-xs text-gray-500 mb-12 uppercase tracking-widest">{items.length}개의 상품</p>
      
      {items.length === 0 ? (
        <div className="border-t border-gray-100 py-20 text-center">
          <p className="text-sm text-gray-500 mb-8 italic">위시리스트에 담긴 상품이 없습니다.</p>
          <button 
            onClick={onShopNow}
            className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
          >
            상품 보러 가기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map(item => (
            <div key={item.id} className="group space-y-4">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={item.name} />
                <button 
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                   <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{item.brand}</p>
                   <h3 className="text-sm font-medium">{item.name}</h3>
                   <p className="text-sm font-bold mt-1">₩{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}</p>
                </div>
                
                <div className="space-y-2">
                  <select className="w-full border border-gray-200 py-3 text-xs focus:outline-none px-2 uppercase tracking-widest font-bold">
                    <option>사이즈 선택</option>
                    <option>Standard Fit</option>
                  </select>
                  <button 
                    onClick={() => addToCart(item.id)}
                    className="w-full border border-black py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    쇼핑백에 담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
