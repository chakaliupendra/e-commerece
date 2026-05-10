import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, ArrowLeft, Zap } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Cart = () => {
  const { cart, loading, fetchCart, removeItem, addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart(isAuthenticated);
  }, [isAuthenticated, fetchCart]);

  const items = cart?.items || [];
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = totalPrice * 0.1;
  const deliveryCharges = totalPrice > 500 ? 0 : 40;
  const finalAmount = totalPrice - totalDiscount + deliveryCharges;

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-32 h-32 bg-brand-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-brand-500" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your bag is empty</h2>
        <p className="text-slate-500 mb-8 max-w-xs text-center font-medium">Looks like you haven't added any premium products to your bag yet.</p>
        <Link to="/">
          <Button className="btn-premium px-12 h-12 rounded-2xl font-bold">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              Your Bag <Badge className="bg-brand-500 text-white font-black rounded-lg">{items.length}</Badge>
            </h1>
            <p className="text-slate-500 font-medium">Review your items and proceed to secure checkout</p>
          </div>
          <Button variant="ghost" className="text-slate-500 hover:text-brand-500 font-bold" onClick={() => navigate('/')}>
            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row gap-6 group hover:border-brand-500/30 transition-all duration-300">
                <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden p-2">
                  <img src="https://via.placeholder.com/150" alt={item.productName} className="img-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-500 transition-colors">{item.productName}</h3>
                      <p className="text-sm text-slate-500 font-medium">Premium Quality • ShopSphere Certified</p>
                    </div>
                    <button onClick={() => removeItem(item.productId, isAuthenticated)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                          onClick={() => addItem({ id: item.productId, name: item.productName, price: item.price }, -1, isAuthenticated)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          onClick={() => addItem({ id: item.productId, name: item.productName, price: item.price }, 1, isAuthenticated)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-brand-500 font-bold uppercase tracking-widest">${item.price} per unit</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <div className="glass-dark rounded-3xl p-8 text-white space-y-6 sticky top-24 shadow-2xl">
              <h2 className="text-xl font-black uppercase tracking-widest text-brand-500">Order Summary</h2>
              
              <div className="space-y-4 font-medium opacity-90">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal ({items.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Premium Discount</span>
                  <span className="text-brand-500">-${totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping</span>
                  <span className={deliveryCharges === 0 ? "text-brand-500 font-bold" : ""}>
                    {deliveryCharges === 0 ? "FREE" : `$${deliveryCharges.toFixed(2)}`}
                  </span>
                </div>
              </div>
              
              <div className="h-[1px] bg-white/10 w-full" />
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Amount</span>
                  <div className="text-4xl font-black text-white">${finalAmount.toFixed(2)}</div>
                </div>
                <Badge className="bg-brand-500/20 text-brand-500 border-none font-bold py-1">Save 10%</Badge>
              </div>

              <Button 
                onClick={() => navigate('/checkout')}
                className="w-full h-14 btn-premium rounded-2xl font-black text-lg uppercase tracking-widest shadow-brand-500/20 mt-4"
              >
                Checkout Now
              </Button>

              <div className="flex items-center justify-center gap-3 text-slate-400 text-xs font-bold pt-4">
                <ShieldCheck size={18} className="text-brand-500" />
                SECURE SSL ENCRYPTED PAYMENT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
