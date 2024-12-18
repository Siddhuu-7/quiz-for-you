import React from 'react';

export default function Categories() {
  const categories = [
    { name: 'Fashion Carnival', discount: '50-80% OFF', date: 'NOV 7-13' },
    { name: 'Wedding Season', discount: 'Up to 70% OFF', date: 'Limited Time' },
    { name: 'Beauty & Personal Care', discount: '30-70% OFF', date: 'Top Brands' }
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-2xl font-bold text-yellow-200">{category.discount}</p>
              <p className="text-sm mt-2">{category.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}