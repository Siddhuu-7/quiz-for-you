import React from 'react';
import { MagnifyingGlassIcon, UserCircleIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

 export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium">MEN</a>
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium">WOMEN</a>
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium">KIDS</a>
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium">HOME & LIVING</a>
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium">BEAUTY</a>
                <a href="#" className="text-gray-900 hover:text-pink-600 px-3 py-2 font-medium relative">
                  STUDIO
                  <span className="absolute -top-2 -right-6 text-xs text-pink-600">NEW</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="Search for products, brands and more"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 ml-4">
              <button className="flex flex-col items-center text-gray-700 hover:text-pink-600">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-xs">Profile</span>
              </button>
              <button className="flex flex-col items-center text-gray-700 hover:text-pink-600">
                <HeartIcon className="h-6 w-6" />
                <span className="text-xs">Wishlist</span>
              </button>
              <button className="flex flex-col items-center text-gray-700 hover:text-pink-600">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="text-xs">Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}