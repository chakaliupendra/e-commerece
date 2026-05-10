import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Package size={28} />
          <span>Shop<span>Sphere</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-item">Products</Link>
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-item cart-btn">
                <ShoppingCart size={20} />
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
              <div className="user-menu">
                <User size={20} />
                <span className="username">{user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
