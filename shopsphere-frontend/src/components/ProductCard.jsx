import React from 'react';
import { ShoppingCart, Plus, Star } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x300?text=ShopSphere'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-brand-primary border-none text-white font-bold px-2 py-0.5">
            -20%
          </Badge>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 shadow-sm">
            <Star size={10} className="fill-brand-accent text-brand-accent" />
            4.8
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            </div>
            <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
              Free Delivery
            </span>
          </div>
          
          <Button 
            onClick={() => addItem(product, 1, isAuthenticated)}
            className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-brand-primary text-white p-0 shadow-sm transition-all active:scale-95"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
