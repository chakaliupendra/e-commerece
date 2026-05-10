import React from 'react';
import { ShoppingCart, Plus, Star, Zap } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="group glass-card rounded-3xl overflow-hidden hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/400x500?text=ShopSphere'} 
            alt={product.name} 
            className="img-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <Badge className="bg-brand-500 border-none text-white font-black px-3 py-1 rounded-lg text-[10px] shadow-lg shadow-brand-500/20">
            PREMIUM
          </Badge>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black text-slate-900 shadow-sm border border-white">
            <Star size={10} className="fill-brand-500 text-brand-500" />
            4.9
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventory: 0{Math.floor(Math.random() * 9) + 1}</div>
          <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-brand-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <div className="text-2xl font-black text-slate-900 tracking-tight">${product.price}</div>
            <span className="text-[10px] text-brand-500 font-bold uppercase tracking-widest">
              Available Now
            </span>
          </div>
          
          <Button 
            onClick={() => addItem(product, 1, isAuthenticated)}
            className="w-12 h-12 rounded-2xl btn-premium p-0"
          >
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
