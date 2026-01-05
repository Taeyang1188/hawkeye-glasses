
import React from 'react';

const brands = [
  'Gentle Monster', 'Gucci', 'Prada', 'Saint Laurent', 'Cartier', 'Tom Ford', 'Oliver Peoples', 'Lindberg'
];

const FeaturedBrands: React.FC = () => {
  return (
    <section className="py-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-12 text-center">
          Available Premium Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center text-center">
          {brands.map((brand) => (
            <div key={brand} className="text-sm font-medium uppercase text-gray-800 hover:text-black transition-colors cursor-default tracking-wider">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
