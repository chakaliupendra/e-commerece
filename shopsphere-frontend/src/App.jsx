import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import useAuthStore from './store/useAuthStore';
import useCartStore from './store/useCartStore';
import useThemeStore from './store/useThemeStore';
import './styles/variables.css';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { fetchCart } = useCartStore();
  const { theme } = useThemeStore();
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart(isAuthenticated);
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route 
              path="/admin/dashboard" 
              element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
