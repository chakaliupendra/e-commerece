import React from 'react';
import { ShoppingCart, Plus, Zap } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="group glass rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-white/5">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x300?text=ShopSphere'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-purple-600/80 backdrop-blur-md border-none text-[10px] font-bold uppercase tracking-wider">
            Premium
          </Badge>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 opacity-80">
            {product.category?.name || 'Electronics'}
          </span>
          <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 h-10 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white">${product.price}</span>
            <span className="text-[10px] text-green-400 font-bold">In Stock</span>
          </div>
          
          <Button 
            onClick={() => addItem(product, 1, isAuthenticated)}
            className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 p-0 shadow-lg shadow-purple-500/20 group-active:scale-95 transition-all"
          >
            <Plus size={24} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
