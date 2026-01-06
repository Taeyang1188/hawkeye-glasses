
import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image_url: string;
}

interface CartPageProps {
  cartItems: number[];
  isLoggedIn: boolean;
  userId?: string;
  onUserClick: () => void;
  onRemove: (id: number) => void;
  onShopNow: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, isLoggedIn, userId, onUserClick, onRemove, onShopNow }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) return;
      const { data } = await supabase.from('products').select('*').in('id', cartItems);
      if (data) setProducts(data);
    };
    fetchCartProducts();
  }, [cartItems]);

  const itemsInCart = cartItems.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
  const totalPrice = itemsInCart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      onUserClick();
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('orders').insert({
      customer_id: userId,
      total_price: totalPrice,
      status: 'pending'
    });

    if (error) {
      alert('주문 처리 중 오류가 발생했습니다.');
    } else {
      alert('주문이 정상적으로 접수되었습니다. 곧 안내 드리겠습니다.');
      // 실제 구현 시 장바구니 비우기 로직 필요
    }
    setLoading(false);
  };

  if (!isLoggedIn && cartItems.length === 0) {
    return (
       <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
        <h1 className="text-3xl font-light uppercase tracking-tight mb-4">쇼핑백</h1>
        <div className="border-t border-gray-100 py-12 flex flex-col items-start">
          <p className="text-sm text-gray-500 mb-8 max-w-lg">
             쇼핑백에 담긴 상품이 없습니다. 로그인 후 나만의 스타일을 완성해보세요.
          </p>
          <button onClick={onUserClick} className="bg-[#191919] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">로그인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-baseline mb-8">
        <h1 className="text-3xl font-light uppercase tracking-tight">쇼핑백</h1>
        <button onClick={onShopNow} className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">계속 쇼핑하기</button>
      </div>
      
      {itemsInCart.length === 0 ? (
        <div className="border-t border-gray-100 py-12"><p className="text-sm text-gray-500 italic">쇼핑백이 비어 있습니다.</p></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            {itemsInCart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-8 pb-12 border-b border-gray-50 relative">
                <button onClick={() => onRemove(item.id)} className="absolute top-0 right-0 text-gray-400 hover:text-black"><X size={20} /></button>
                <div className="w-32 md:w-48 aspect-[3/4] bg-gray-50 overflow-hidden shrink-0">
                  <img src={item.image_url} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                       <p className="text-sm font-bold uppercase tracking-widest">{item.brand}</p>
                       <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
                    </div>
                  </div>
                  <div className="md:text-right space-y-6">
                    <p className="text-sm font-bold">₩{item.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-lg font-light uppercase tracking-widest mb-4">주문 요약</h3>
            <div className="flex justify-between text-sm font-bold uppercase tracking-widest border-t pt-4">
              <span>총 예상 결제 금액</span>
              <span>₩{totalPrice.toLocaleString()}</span>
            </div>
            <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors">
              {loading ? '처리 중...' : '주문 진행하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
