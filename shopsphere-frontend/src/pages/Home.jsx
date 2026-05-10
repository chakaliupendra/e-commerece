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
    <div className="space-y-12 md:space-y-24 pb-20">
      {/* Hero Section - Balanced Padding & Centered */}
      <section className="relative text-center space-y-12 section-padding px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={14} className="mr-2" /> Global Showcase 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1] max-w-5xl mx-auto">
            Shop the <span className="text-primary italic">Extraordinary</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Elevate your lifestyle with our curated collection of high-performance tech 
            and premium essentials. Designed for those who demand the best.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Button onClick={() => navigate('/cart')} className="btn-primary h-16 rounded-[1.5rem] group">
            Explore Collection <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
          <div className="flex items-center gap-10 px-10 py-5 bg-card/50 backdrop-blur-sm rounded-[1.5rem] border border-border shadow-sm">
            <div className="flex items-center gap-3 text-sm font-black opacity-60">
              <Zap size={20} className="text-primary" /> Fast Shipping
            </div>
            <div className="h-8 w-[1px] bg-border" />
            <div className="flex items-center gap-3 text-sm font-black opacity-60">
              <ShieldCheck size={20} className="text-primary" /> Verified Secure
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid with standardized padding */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border pb-10 px-2">
          <div className="space-y-2 text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : 'Featured Drops'}
            </h2>
            <p className="text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px]">Real-time Inventory Update</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-black text-foreground/40 bg-foreground/5 px-5 py-2.5 rounded-2xl border border-border">
            <ShoppingBag size={18} className="text-primary" />
            {products.length} PRODUCTS FOUND
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[3/4] bg-foreground/5 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-x-12">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center space-y-6 bg-foreground/5 rounded-[4rem]">
                <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto border border-border">
                  <Search size={40} className="text-foreground/20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-foreground/30">No products found.</h3>
                  <Button variant="link" className="text-primary font-bold" onClick={() => navigate('/')}>
                    Return to Main Store
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Aesthetic Footer Branding */}
      <footer className="py-24 text-center border-t border-border mt-32 space-y-8">
        <div className="flex items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500 cursor-pointer">
          <Zap size={28} className="text-primary fill-primary" />
          <span className="text-3xl font-black tracking-tighter uppercase">SHOP<span className="text-primary">SPHERE</span></span>
        </div>
        <div className="flex justify-center gap-8 text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em]">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Support</span>
        </div>
        <p className="text-foreground/20 text-[10px] font-bold">© 2026 ShopSphere Global Inc.</p>
      </footer>
    </div>
  );
};

export default Home;
