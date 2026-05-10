import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Home, Truck, ShieldCheck, Landmark } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import api from '../api/axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'CARD'
  });

  const items = cart?.items || [];
  const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // 1. Create Razorpay Order on Backend
      const response = await api.post('/payments/create-order', { amount: totalAmount });
      const orderData = JSON.parse(response.data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Should be in .env
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ShopSphere",
        description: "Payment for your order",
        order_id: orderData.id,
        handler: async (response) => {
          // 2. Verify Payment on Backend
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };
          
          const isVerified = await api.post('/payments/verify', verifyData);
          
          if (isVerified.data) {
            // 3. Save Order in Database
            const orderPayload = {
              items: items,
              totalAmount: totalAmount,
              shippingAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
              phoneNumber: formData.phone,
              paymentMethod: 'RAZORPAY',
              status: 'PAID'
            };
            
            await api.post('/orders', orderPayload);
            clearCart();
            setStep(4); // Success step
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: formData.phone
        },
        theme: {
          color: "#2874f0"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
      alert('Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <CheckCircle2 size={80} className="text-green-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping with ShopSphere. Your order will be delivered in 3-5 business days.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')} className="bg-blue-600">Continue Shopping</Button>
          <Button variant="outline" onClick={() => navigate('/my-orders')}>View My Orders</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4 overflow-x-auto gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border'}`}>
                {s}
              </div>
              <span className={`text-sm font-semibold whitespace-nowrap ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
                {s === 1 ? 'Delivery Address' : s === 2 ? 'Order Summary' : 'Payment'}
              </span>
              {s < 3 && <div className={`w-12 h-[2px] hidden sm:block ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            
            {/* Step 1: Address */}
            {step === 1 && (
              <Card className="border-none shadow-sm rounded-sm">
                <CardHeader className="bg-[#2874f0] text-white p-4 rounded-t-sm">
                  <CardTitle className="text-lg flex items-center gap-2 uppercase">
                    <Home size={18} /> 1. Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        placeholder="10-digit mobile number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Detailed Address</Label>
                    <Input 
                      placeholder="House No, Building, Street, Area" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City / Town</Label>
                      <Input 
                        placeholder="e.g. Bangalore" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pincode</Label>
                      <Input 
                        placeholder="6-digit code" 
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 h-12 uppercase font-bold mt-4"
                    onClick={() => setStep(2)}
                  >
                    Deliver Here
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Order Summary */}
            {step === 2 && (
              <Card className="border-none shadow-sm rounded-sm">
                <CardHeader className="bg-[#2874f0] text-white p-4 rounded-t-sm">
                  <CardTitle className="text-lg flex items-center gap-2 uppercase">
                    <Truck size={18} /> 2. Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4 p-4 border-b">
                      <div className="w-16 h-16 bg-gray-50 border rounded p-1">
                        <img src="https://via.placeholder.com/64" alt={item.productName} className="object-contain" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.productName}</h4>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="font-bold mt-1 text-blue-600">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm font-semibold">Total Price: <span className="text-lg">${totalAmount.toFixed(2)}</span></span>
                    <Button onClick={() => setStep(3)} className="bg-orange-500 px-12">Continue</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card className="border-none shadow-sm rounded-sm">
                <CardHeader className="bg-[#2874f0] text-white p-4 rounded-t-sm">
                  <CardTitle className="text-lg flex items-center gap-2 uppercase">
                    <CreditCard size={18} /> 3. Payment Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className={`p-4 border rounded-sm flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'CARD' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:bg-gray-50'}`} onClick={() => setFormData({...formData, paymentMethod: 'CARD'})}>
                      <CreditCard className="text-blue-600" />
                      <div>
                        <p className="font-bold">Credit / Debit / ATM Card</p>
                        <p className="text-xs text-gray-500">Pay securely using your bank card</p>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'CARD' && (
                      <div className="p-4 bg-blue-50/50 border rounded-sm space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <Input placeholder="Card Number (XXXX XXXX XXXX XXXX)" maxLength={16} />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Expiry (MM/YY)" maxLength={5} />
                          <Input placeholder="CVV" type="password" maxLength={3} />
                        </div>
                      </div>
                    )}

                    <div className={`p-4 border rounded-sm flex items-center gap-4 cursor-pointer transition-all ${formData.paymentMethod === 'NETBANK' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:bg-gray-50'}`} onClick={() => setFormData({...formData, paymentMethod: 'NETBANK'})}>
                      <Landmark className="text-blue-600" />
                      <div>
                        <p className="font-bold">Net Banking</p>
                        <p className="text-xs text-gray-500">All major banks supported</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#fb641b] hover:bg-[#e65a19] h-12 uppercase font-extrabold text-lg shadow-lg"
                    disabled={loading}
                    onClick={handlePlaceOrder}
                  >
                    {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                  </Button>
                  <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                    <ShieldCheck size={16} className="text-green-600" />
                    Payments are 100% secure and encrypted.
                  </p>
                </CardContent>
              </Card>
            )}

          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-4 hidden md:block">
            <Card className="border-none shadow-sm rounded-sm overflow-hidden">
              <div className="p-4 border-b bg-white text-gray-500 font-bold uppercase text-xs">Price Details</div>
              <CardContent className="p-4 space-y-4 bg-white text-sm">
                <div className="flex justify-between">
                  <span>Price ({items.length} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Payable</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
