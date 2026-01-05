
import React from 'react';

const brands = [
  { name: 'Gentle Monster', logo: 'https://i.imgur.com/qxDnVCn.png' },
  { name: 'Gucci', logo: 'https://i.imgur.com/GpTjvgm.png' },
  { name: 'Prada', logo: 'https://i.imgur.com/BOauoPu.png' },
  { name: 'Saint Laurent', logo: 'https://i.imgur.com/gZbvS7c.png' },
  { name: 'Cartier', logo: 'https://i.imgur.com/GQ9rHae.png' },
  { name: 'Tom Ford', logo: 'https://i.imgur.com/ahxCcAH.png' },
  { name: 'Oliver Peoples', logo: 'https://i.imgur.com/xT4wx2f.png' },
  { name: 'Lindberg', logo: 'https://i.imgur.com/d0NMS52.png' }
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
