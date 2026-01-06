
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image_url: string;
}

interface WishlistPageProps {
  wishlist: number[];
  isLoggedIn: boolean;
  onUserClick: () => void;
  toggleWishlist: (id: number) => void;
  addToCart: (id: number) => void;
  onShopNow: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, isLoggedIn, onUserClick, toggleWishlist, addToCart, onShopNow }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }
      setLoading(true);
      const { data } = await supabase.from('products').select('*').in('id', wishlist);
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchWishlistProducts();
  }, [wishlist]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
        <h1 className="text-3xl font-light uppercase tracking-tight mb-4">위시리스트</h1>
        <div className="border-t border-gray-100 py-12 flex flex-col items-start">
          <p className="text-sm text-gray-500 mb-8">마음에 드는 상품을 저장하려면 로그인하세요.</p>
          <button onClick={onUserClick} className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em]">로그인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <h1 className="text-3xl font-light uppercase tracking-tight mb-2">위시리스트</h1>
      <p className="text-xs text-gray-500 mb-12 uppercase tracking-widest">{products.length} Items</p>
      
      {products.length === 0 ? (
        <div className="border-t border-gray-100 py-20 text-center">
          <p className="text-sm text-gray-500 mb-8 italic">저장된 상품이 없습니다.</p>
          <button onClick={onShopNow} className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em]">컬렉션 보기</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map(item => (
            <div key={item.id} className="group space-y-4">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={item.name} />
                <button onClick={() => toggleWishlist(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                   <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{item.brand}</p>
                   <h3 className="text-sm font-medium">{item.name}</h3>
                   <p className="text-sm font-bold mt-1">₩{item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => addToCart(item.id)} className="w-full border border-black py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all">쇼핑백에 담기</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
