import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();

  return (
    <div className="product-card glass">
      <div className="product-image">
        <img src={product.imageUrl || 'https://via.placeholder.com/300x300?text=ShopSphere'} alt={product.name} />
        <div className="product-badge">New</div>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="category">{product.category?.name || 'Category'}</span>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button onClick={() => addItem(product)} className="add-to-cart">
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
