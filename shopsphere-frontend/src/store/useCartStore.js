import { create } from 'zustand';
import api from '../api/axios';

const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/cart');
      set({ cart: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch cart', loading: false });
    }
  },

  addItem: async (product, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity
      });
      set({ cart: response.data });
    } catch (error) {
      set({ error: 'Failed to add item' });
    }
  },

  removeItem: async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      set({ cart: response.data });
    } catch (error) {
      set({ error: 'Failed to remove item' });
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart/clear');
      set({ cart: null });
    } catch (error) {
      set({ error: 'Failed to clear cart' });
    }
  }
}));

export default useCartStore;
