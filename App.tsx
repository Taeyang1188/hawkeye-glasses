
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBrands from './components/FeaturedBrands';
import ServiceInfo from './components/ServiceInfo';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Sale Banner (Farfetch Style) */}
      <div className="bg-black text-white text-[10px] md:text-xs py-2 text-center farfetch-font uppercase tracking-widest">
        Hawkeye Optical Grand Opening: Premium Quality at Reasonable Prices
      </div>
      
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Category Navigation (Desktop) */}
        <section className="hidden md:block py-12 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-center space-x-12 text-sm font-medium uppercase tracking-widest">
              <a href="#" className="hover:underline underline-offset-8 decoration-2 transition-all">New Arrivals</a>
              <a href="#" className="hover:underline underline-offset-8 decoration-2 transition-all">Rimless (무테)</a>
              <a href="#" className="hover:underline underline-offset-8 decoration-2 transition-all">Premium Lenses</a>
              <a href="#" className="hover:underline underline-offset-8 decoration-2 transition-all">Veteran Optician's Pick</a>
              <a href="#" className="hover:underline underline-offset-8 decoration-2 transition-all">HUVITS Tech</a>
            </div>
          </div>
        </section>

        <FeaturedBrands />
        
        <ServiceInfo />

        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-light uppercase tracking-tight">Trending Eyewear</h2>
            <a href="#" className="text-sm border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Shop All</a>
          </div>
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
