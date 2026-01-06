
import React from 'react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  tag?: string;
}

interface ProductGridProps {
  onDetailClick: (productId: number) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Round Rimless",
    brand: "Hawkeye Signature",
    price: "₩185,000",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
    tag: "Bestseller"
  },
  {
    id: 2,
    name: "Architect Titanium",
    brand: "LINDBERG Style",
    price: "₩245,000",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
    tag: "New In"
  },
  {
    id: 3,
    name: "Acetate Cat-Eye",
    brand: "Gucci",
    price: "₩320,000",
    image: "https://images.unsplash.com/photo-1577803645773-f9337f846d1f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Modern Minimalist",
    brand: "Oliver Peoples",
    price: "₩280,000",
    image: "https://images.unsplash.com/photo-1591076482161-421a3aaee5f2?auto=format&fit=crop&q=80&w=600",
    tag: "Premium"
  }
];

const ProductGrid: React.FC<ProductGridProps> = ({ onDetailClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group cursor-pointer" onClick={() => onDetailClick(product.id)}>
          <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
            <img 
              src={product.image} 
              alt={`${product.brand} ${product.name} - 명동안경 호크아이 추천 아이웨어`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
                {product.tag}
              </span>
            )}
            <button className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 py-3 text-xs uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Details
            </button>
          </div>
          <p className="text-xs uppercase font-bold text-gray-500 mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium mb-1 group-hover:underline underline-offset-4">{product.name}</h3>
          <p className="text-sm font-light text-gray-900">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
