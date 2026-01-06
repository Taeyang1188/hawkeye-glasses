
import React, { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const brands = [
  { name: 'Four Nines', nameKo: '포나인즈', logo: 'https://i.imgur.com/luChXlh.png', country: 'Japan' },
  { name: 'Silhouette', nameKo: '실루엣', logo: 'https://i.imgur.com/fszXYXh.png', country: 'Austria' },
  { name: 'Viktor & Rolf', nameKo: '빅터앤롤프', logo: 'https://i.imgur.com/VCmPkpT.png', country: 'Netherlands' },
  { name: 'Oakley', nameKo: '오클리', logo: 'https://i.imgur.com/x1srvm7.png', country: 'USA' },
  { name: 'Rawrow', nameKo: '로우로우', logo: 'https://i.imgur.com/jD4GyxQ.png', country: 'South Korea' },
  { name: 'Venetique', nameKo: '베네티크', logo: 'https://i.imgur.com/EPFPRDL.png', country: 'South Korea' },
  { name: 'Piovino', nameKo: '피오비노', logo: 'https://i.imgur.com/GrrbGs9.png', country: 'South Korea' },
  { name: 'Black Monster', nameKo: '블랙몬스터', logo: 'https://i.imgur.com/R2MPUbd.png', country: 'South Korea' }
];

interface BrandSelectionPageProps {
  onBrandSelect: (brand: string) => void;
}

const BrandSelectionPage: React.FC<BrandSelectionPageProps> = ({ onBrandSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // 검색 로직: 영문 이름 또는 한글 이름에 검색어가 포함되어 있는지 확인
  const filteredBrands = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return brands;
    
    return brands.filter(brand => 
      brand.name.toLowerCase().includes(term) || 
      brand.nameKo.includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="border-b border-gray-100 py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tight">Premium Brands</h1>
          <p className="text-sm text-gray-400 uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
            호크아이안경이 큐레이션한 글로벌 명품 아이웨어 브랜드를 만나보세요.
          </p>
          <div className="max-w-md mx-auto relative pt-8">
             <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="찾으시는 브랜드 (오클리, 로우로우...)" 
              className="w-full border-b border-gray-300 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors bg-transparent pr-10"
             />
             <div className="absolute right-0 bottom-3 flex items-center space-x-2">
               {searchTerm && (
                 <button onClick={() => setSearchTerm('')} className="text-gray-300 hover:text-black">
                   <X size={16} />
                 </button>
               )}
               <Search size={16} className="text-gray-400" />
             </div>
          </div>
          {searchTerm && (
            <p className="text-[10px] text-gray-400 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
              '{searchTerm}'에 대한 {filteredBrands.length}개의 결과
            </p>
          )}
        </div>
      </section>

      {/* Brand Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.name} 
                onClick={() => onBrandSelect(brand.name)}
                className="group cursor-pointer border border-gray-50 hover:border-black transition-all duration-500 p-10 flex flex-col items-center justify-center space-y-6 aspect-square"
              >
                <div className="flex-grow flex items-center justify-center w-full h-24">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">{brand.name}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{brand.country}</p>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  View Collection
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <p className="text-sm text-gray-400 font-light italic uppercase tracking-widest">
              No brands found for "{searchTerm}"
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Featured Quote */}
      <section className="bg-gray-50 py-20 text-center px-6">
        <div className="max-w-2xl mx-auto space-y-4">
           <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Curated with Pride</h4>
           <p className="text-xl font-light leading-relaxed">
             "우리는 단순히 유행을 파는 것이 아니라,<br />
             개인의 품격을 완성하는 시대를 초월한 가치를 선별합니다."
           </p>
        </div>
      </section>
    </div>
  );
};

export default BrandSelectionPage;
