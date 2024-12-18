import React from 'react';

export default function Banner() {
  return (
    <div className="mt-4">
      <div className="relative">
        <div className="bg-pink-700 rounded-lg overflow-hidden">
          <div className="px-8 py-6 text-center">
            <h2 className="text-3xl font-bold text-yellow-200 mb-2">FLAT ₹300 OFF</h2>
            <p className="text-xl text-yellow-100">+ Free Shipping On Your 1st Order</p>
            <div className="mt-4 inline-block bg-yellow-200 px-4 py-2 rounded-md">
              <span className="font-bold text-pink-700">CODE: MYNTRA300</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}