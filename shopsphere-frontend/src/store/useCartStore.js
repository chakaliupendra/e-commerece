import { create } from 'zustand';
import api from '../api/axios';

const getStoredCart = () => {
  try {
    const cart = localStorage.getItem('guest_cart');
    if (cart === null || cart === 'undefined') return { items: [] };
    return JSON.parse(cart);
  } catch (e) {
    return { items: [] };
  }
};

const useCartStore = create((set, get) => ({
  cart: getStoredCart(),
  loading: false,
  error: null,

  fetchCart: async (isAuthenticated) => {
    if (!isAuthenticated) return;
    set({ loading: true });
    try {
      const response = await api.get('/cart');
      set({ cart: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch cart', error);
      set({ loading: false });
    }
  },

  addItem: async (product, quantity = 1, isAuthenticated) => {
    if (isAuthenticated) {
      try {
        const response = await api.post('/cart/add', {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity
        });
        set({ cart: response.data });
      } catch (error) {
        console.error('Failed to add item', error);
      }
    } else {
      // Guest local cart logic
      const currentCart = get().cart;
      const items = [...(currentCart.items || [])];
      const existingItem = items.find(i => i.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity <= 0) {
          const newItems = items.filter(i => i.productId !== product.id);
          const newCart = { items: newItems };
          set({ cart: newCart });
          localStorage.setItem('guest_cart', JSON.stringify(newCart));
          return;
        }
      } else {
        items.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity
        });
      }
      const newCart = { items };
      set({ cart: newCart });
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
  },

  removeItem: async (productId, isAuthenticated) => {
    if (isAuthenticated) {
      try {
        const response = await api.delete(`/cart/remove/${productId}`);
        set({ cart: response.data });
      } catch (error) {
        console.error('Failed to remove item', error);
      }
    } else {
      const currentCart = get().cart;
      const newItems = currentCart.items.filter(i => i.productId !== productId);
      const newCart = { items: newItems };
      set({ cart: newCart });
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
  },

  clearCart: async (isAuthenticated) => {
    if (isAuthenticated) {
      try {
        await api.delete('/cart/clear');
      } catch (error) {}
    }
    set({ cart: { items: [] } });
    localStorage.removeItem('guest_cart');
  }
}));

export default useCartStore;
