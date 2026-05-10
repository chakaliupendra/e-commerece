import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Search, ShoppingBag, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="space-y-24">
      {/* Hero Section - Centered & Aesthetic */}
      <section className="relative text-center space-y-8 pt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2">
            <Sparkles size={14} className="mr-2" /> Summer Collection 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1] max-w-4xl mx-auto">
            Experience the Future of <span className="text-primary">E-Commerce</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover a handpicked collection of premium essentials designed for modern life. 
            Quality guaranteed, delivered to your doorstep.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-4">
          <Button onClick={() => navigate('/cart')} className="btn-indigo h-14 px-10 text-lg group">
            Shop Collection <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center gap-8 px-8 py-4 bg-foreground/5 rounded-3xl border border-border">
            <div className="flex items-center gap-2 text-sm font-bold opacity-70">
              <Zap size={18} className="text-primary" />
              Express Delivery
            </div>
            <div className="h-6 w-[1px] bg-border" />
            <div className="flex items-center gap-2 text-sm font-bold opacity-70">
              <ShieldCheck size={18} className="text-primary" />
              Secure Checkout
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-8">
          <div className="space-y-1 text-left">
            <h2 className="text-4xl font-black tracking-tight">
              {searchQuery ? `Search: "${searchQuery}"` : 'Curated Selection'}
            </h2>
            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Explore the latest inventory</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-black text-foreground/30 bg-foreground/5 px-4 py-2 rounded-xl">
            <ShoppingBag size={18} />
            {products.length} MODULES READY
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[3/4] bg-foreground/5 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center space-y-4 bg-foreground/5 rounded-[3rem]">
                <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto">
                  <Search size={40} className="text-foreground/20" />
                </div>
                <h3 className="text-2xl font-black text-foreground/40">No matches found in this collection.</h3>
                <Button variant="link" className="text-primary font-bold" onClick={() => navigate('/')}>
                  Reset search filters
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Centered Footer Branding */}
      <footer className="py-20 text-center border-t border-border space-y-6">
        <div className="flex items-center justify-center gap-2 opacity-20 hover:opacity-50 transition-opacity">
          <Zap size={24} className="text-primary" />
          <span className="text-2xl font-black tracking-tighter">SHOP<span className="text-primary">SPHERE</span></span>
        </div>
        <p className="text-foreground/30 text-xs font-bold uppercase tracking-[0.3em]">Built for the modern shopper • 2026</p>
      </footer>
    </div>
  );
};

export default Home;
