import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Zap, Sparkles, Rocket } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery 
          ? `/products/search?name=${searchQuery}` 
          : '/products';
        const response = await api.get(endpoint);
        setProducts(response.data.content || response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple-600/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sparkles size={14} />
            The Future of Shopping is Here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            Code Your <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Style</span> with ShopSphere
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of premium products designed for the modern era. 
            Fast delivery, secure payments, and a tech-first experience.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl glass font-bold text-sm">
              <Zap size={18} className="text-purple-500" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl glass font-bold text-sm">
              <Rocket size={18} className="text-pink-500" />
              Premium Quality
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-purple-600 rounded-full" />
              Featured Catalog
            </h2>
            <p className="text-gray-500 font-mono text-sm">/inventory/latest_drops.json</p>
          </div>
          {searchQuery && (
            <div className="text-purple-400 font-bold bg-purple-500/10 px-4 py-1 rounded-lg border border-purple-500/20">
              Showing results for: "{searchQuery}"
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-gray-500 font-mono animate-pulse">Loading modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 glass rounded-3xl">
                <h3 className="text-2xl font-bold text-gray-500">No products found in this branch.</h3>
                <p className="text-gray-600 mt-2">Try a different search query or check back later.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="text-2xl font-black text-white/20">SHOP<span className="text-purple-500/20">SPHERE</span></div>
          <p className="text-gray-600 text-xs font-mono">© 2026 Crafted with Chai & Code</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
