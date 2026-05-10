import React from 'react';
import { ShoppingCart, Plus, Star, Zap, PackageSearch, AlertCircle } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="group relative flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-foreground/5 rounded-[2.5rem] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <Badge className="bg-primary text-primary-foreground border-none font-black px-4 py-1.5 rounded-2xl text-[10px] tracking-widest shadow-xl uppercase">
            {product.category?.name || 'New Arrival'}
          </Badge>
        </div>
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <Button
              onClick={() => addItem(product, 1, isAuthenticated)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500"
            >
              <Plus size={28} />
            </Button>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge variant="destructive" className="px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
              Sold Out
            </Badge>
          </div>
        )}
      </div>
      <div className="px-2 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              ID: {product.id}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-black text-foreground/40">
              <Star size={10} className="fill-primary text-primary" />
              Verified
            </div>
          </div>
          <h3 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-foreground/40 font-medium line-clamp-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-foreground">
            ${product.price.toFixed(2)}
          </div>
          <Badge
            variant="outline"
            className={`font-bold text-[10px] rounded-lg border-2 ${isOutOfStock ? 'text-red-500 border-red-500/20' : 'text-green-500 border-green-500/20'}`}
          >
            {isOutOfStock ? 'OUT OF STOCK' : `${product.stockQuantity} IN STOCK`}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
