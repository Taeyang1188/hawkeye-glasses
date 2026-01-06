
import React from 'react';

const brands = [
  { name: 'Four Nines', logo: 'https://i.imgur.com/luChXlh.png' },
  { name: 'Silhouette', logo: 'https://i.imgur.com/fszXYXh.png' },
  { name: 'Viktor & Rolf', logo: 'https://i.imgur.com/VCmPkpT.png' },
  { name: 'Oakley', logo: 'https://i.imgur.com/x1srvm7.png' },
  { name: 'Rawrow', logo: 'https://i.imgur.com/jD4GyxQ.png' },
  { name: 'Venetique', logo: 'https://i.imgur.com/EPFPRDL.png' },
  { name: 'Piovino', logo: 'https://i.imgur.com/GrrbGs9.png' },
  { name: 'Black Monster', logo: 'https://i.imgur.com/R2MPUbd.png' }
];

interface FeaturedBrandsProps {
  onBrandClick: (brand: string) => void;
}

const FeaturedBrands: React.FC<FeaturedBrandsProps> = ({ onBrandClick }) => {
  return (
    <section className="py-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-12 text-center">
          AVAILABLE PREMIUM BRANDS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              onClick={() => onBrandClick(brand.name)}
              className="group cursor-pointer flex justify-center items-center h-16 px-4 transition-all hover:scale-105"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
