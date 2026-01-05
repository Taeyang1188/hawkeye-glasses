
import React from 'react';
import { X, Heart } from 'lucide-react';

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

interface CartPageProps {
  cartItems: number[];
  isLoggedIn: boolean;
  onUserClick: () => void;
  onRemove: (id: number) => void;
  onShopNow: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, isLoggedIn, onUserClick, onRemove, onShopNow }) => {
  const itemsInCart = cartItems.map(id => MOCK_DATA.find(p => p.id === id) || { 
    id, name: "Premium Eyes", brand: "HAWKEYE", price: 190000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600" 
  }).filter(Boolean) as Product[];

  const totalPrice = itemsInCart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);

  if (!isLoggedIn) {
    return (
       <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
        <h1 className="text-3xl font-light uppercase tracking-tight mb-4">쇼핑백</h1>
        <div className="border-t border-gray-100 py-12 flex flex-col items-start">
          <p className="text-sm text-gray-500 mb-8 max-w-lg">
             쇼핑백에 담긴 상품이 없습니다. 로그인 또는 회원 가입 후, 회원 전용 혜택 및 맞춤 셀렉션을 만나보세요.
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
      <div className="flex justify-between items-baseline mb-8">
        <h1 className="text-3xl font-light uppercase tracking-tight">쇼핑백</h1>
        <button onClick={onShopNow} className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">계속 쇼핑하기</button>
      </div>
      
      {itemsInCart.length === 0 ? (
        <div className="border-t border-gray-100 py-12">
          <p className="text-sm text-gray-500 italic">쇼핑백이 비어 있습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-100 pb-2 text-right">
              정확한 가격 및 재고 정보는 실시간으로 업데이트됩니다.
            </div>
            {itemsInCart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-8 pb-12 border-b border-gray-50 relative">
                <button onClick={() => onRemove(item.id)} className="absolute top-0 right-0 text-gray-400 hover:text-black">
                  <X size={20} />
                </button>
                <div className="w-32 md:w-48 aspect-[3/4] bg-gray-50 overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                       <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">추천 상품</p>
                       <p className="text-sm font-bold uppercase tracking-widest">{item.brand}</p>
                       <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
                    </div>
                  </div>
                  <div className="md:text-right space-y-6">
                    <div>
                       <p className="text-sm font-bold">₩{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest">수량</p>
                      <p className="text-[11px] font-bold">1</p>
                    </div>
                    <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-8">
                      <Heart size={14} />
                      <span className="underline underline-offset-4">위시리스트로 옮기</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-lg font-light uppercase tracking-widest mb-4">주문 내역</h3>
            <div className="space-y-4 text-xs font-bold uppercase tracking-widest pb-8 border-b border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">총 상품 금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">배송비</span>
                <span className="text-green-600">무료</span>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
              <span>총 예상 결제 금액</span>
              <div className="text-right">
                <p>KRW ₩{totalPrice.toLocaleString()}</p>
              </div>
            </div>
            <button className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors">
              주문 진행하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
