import React from 'react';
// import Navbar from '../components/Navbar';
import Navbar from './components/Navbar'
import Banner from './components/Banner';
import Categories from './components/Categories';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Banner />
        <Categories />
      </main>
    </div>
  );
}

export default App;