import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

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
    <div className="min-h-screen pb-20">
      <section className="bg-[#fff5f0] py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <Badge className="bg-orange-100 text-brand-primary border-none font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
              New Collection 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Quality Products. <br />
              <span className="text-brand-primary">Unbeatable</span> Prices.
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0">
              Discover over 1,000+ premium products curated just for you. Get the best deals on electronics, fashion, and more.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button className="bg-brand-primary hover:bg-brand-secondary h-12 px-8 rounded-full font-bold shadow-orange">
                Shop Now <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="outline" className="h-12 px-8 rounded-full font-bold border-gray-200">
                Explore Categories
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center relative">
            <div className="w-80 h-80 bg-brand-primary/10 rounded-full absolute -z-10 blur-3xl animate-pulse" />
            <img
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="Hero Illustration"
              className="w-full max-w-sm drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            <div className="w-20 h-1.5 bg-brand-primary rounded-full mt-2" />
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <ShoppingBag size={18} />
            <span>Showing {products.length} products</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                <p className="text-gray-500">Try checking your spelling or using more general terms</p>
                <Button variant="link" className="text-brand-primary mt-2" onClick={() => navigate('/')}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
