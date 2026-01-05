
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top Nav */}
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex space-x-6 text-sm font-light uppercase tracking-wide">
            <a href="#" className="hover:text-gray-500 transition-colors">Glasses</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Sunglasses</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Brands</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Services</a>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img 
            src="https://i.imgur.com/4zenlLd.png" 
            alt="Hawkeye Optical Logo" 
            className="h-10 md:h-14 w-auto object-contain"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:flex items-center border-b border-gray-300 py-1">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-sm focus:outline-none w-32 xl:w-48 font-light"
            />
            <Search size={18} className="text-gray-400" />
          </div>
          <button className="md:hidden"><Search size={20} /></button>
          <button className="hidden sm:block"><User size={20} /></button>
          <button className="hidden sm:block"><Heart size={20} /></button>
          <button className="relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[110px] bg-white z-40 md:hidden p-6 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-6 text-2xl font-light uppercase tracking-tight">
            <a href="#" className="border-b border-gray-100 pb-4">Glasses</a>
            <a href="#" className="border-b border-gray-100 pb-4">Sunglasses</a>
            <a href="#" className="border-b border-gray-100 pb-4">Rimless Collection</a>
            <a href="#" className="border-b border-gray-100 pb-4">Expert Fitting</a>
            <a href="#" className="border-b border-gray-100 pb-4">Contact Lenses</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
