import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
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
  const totalDiscount = totalPrice * 0.1; // Mock 10% discount
  const deliveryCharges = totalPrice > 500 ? 0 : 40;
  const finalAmount = totalPrice - totalDiscount + deliveryCharges;

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <img 
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
          alt="Empty Cart" 
          className="w-64 mb-4"
        />
        <h2 className="text-xl font-semibold">Your cart is empty!</h2>
        <p className="text-gray-500 mt-2 mb-6">Add items to it now.</p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700 px-12">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {!isAuthenticated && (
            <Card className="rounded-sm shadow-sm border-none bg-white p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Missing Cart items? Login to see items you added previously</span>
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">Login</Button>
              </Link>
            </Card>
          )}

          <Card className="rounded-sm shadow-sm border-none">
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Flipkart ({items.length})
              </h2>
            </div>
            
            <CardContent className="p-0 bg-white">
              {items.map((item) => (
                <div key={item.productId} className="p-6 border-b last:border-0 flex gap-6">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center border">
                    <img src="https://via.placeholder.com/100" alt={item.productName} className="object-contain" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg hover:text-blue-600 cursor-pointer">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Delivery by Sat May 17</p>
                    </div>
                    <p className="text-xs text-gray-500">Seller: ShopSphere Retail</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-900">${item.price}</span>
                      <span className="text-sm line-through text-gray-400">${(item.price * 1.2).toFixed(2)}</span>
                      <span className="text-sm font-semibold text-green-600">20% Off</span>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-4">
                      <div className="flex items-center border rounded-full">
                        <button 
                          className="p-1 px-3 hover:bg-gray-100 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                          onClick={() => addItem({ id: item.productId, name: item.productName, price: item.price }, -1, isAuthenticated)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-semibold text-sm">{item.quantity}</span>
                        <button 
                          className="p-1 px-3 hover:bg-gray-100"
                          onClick={() => addItem({ id: item.productId, name: item.productName, price: item.price }, 1, isAuthenticated)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        className="text-sm font-bold uppercase hover:text-blue-600 transition-colors"
                        onClick={() => removeItem(item.productId, isAuthenticated)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            
            <div className="p-4 bg-white flex justify-end sticky bottom-0 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
              <Button 
                onClick={() => navigate('/checkout')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase px-16 h-12 rounded-sm shadow-md"
              >
                Place Order
              </Button>
            </div>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="space-y-4">
          <Card className="rounded-sm shadow-sm border-none sticky top-24">
            <div className="p-4 border-b bg-white">
              <h2 className="text-gray-500 font-bold uppercase text-sm">Price Details</h2>
            </div>
            <CardContent className="p-4 space-y-4 bg-white">
              <div className="flex justify-between">
                <span>Price ({items.length} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-${totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className={deliveryCharges === 0 ? "text-green-600" : ""}>
                  {deliveryCharges === 0 ? "FREE" : `$${deliveryCharges}`}
                </span>
              </div>
              
              <div className="border-t border-dashed pt-4 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>${finalAmount.toFixed(2)}</span>
              </div>
              
              <div className="text-green-600 font-semibold text-sm pt-2">
                You will save ${totalDiscount.toFixed(2)} on this order
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center gap-3 text-gray-500 text-sm font-semibold p-2">
            <ShieldCheck size={28} className="text-gray-400" />
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
