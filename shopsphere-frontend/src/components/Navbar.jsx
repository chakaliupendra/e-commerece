import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, LayoutDashboard, Menu, X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setIsMobileMenuOpen(false);
    }
  };

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 py-2 sm:py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 max-w-7xl">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 orange-gradient rounded-lg flex items-center justify-center shadow-orange">
            <Package size={20} className="text-white sm:size-[24px]" />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tighter text-gray-900 hidden xs:block">
            SHOP<span className="text-brand-primary">SPHERE</span>
          </h1>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg relative hidden lg:block">
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-gray-50 border-gray-200 text-gray-900 pr-10 focus-visible:ring-brand-primary/50 h-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary transition-colors">
            <Search size={18} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="group relative">
                <div className="flex items-center gap-1 cursor-pointer hover:text-brand-primary transition-colors py-2">
                  <User size={20} className="text-gray-600" />
                  <span className="text-sm font-semibold hidden md:inline">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </div>
                
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl py-2 hidden group-hover:block border border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-1">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-orange-50 text-sm transition-colors">
                      <LayoutDashboard size={16} className="text-brand-primary" />
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm text-red-600 border-t border-gray-50 mt-1 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-sm font-bold text-gray-700 hover:text-brand-primary">
                  Login
                </Button>
              </Link>
            )}
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-orange-50 rounded-full transition-colors group">
            <ShoppingCart size={22} className="text-gray-600 group-hover:text-brand-primary" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-brand-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl p-4 space-y-4 animate-in slide-in-from-top-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 h-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search size={18} className="text-gray-400" />
            </button>
          </form>
          
          <div className="space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm font-bold text-gray-400 uppercase tracking-widest">Account</div>
                {isAdmin && (
                  <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 hover:bg-orange-50 rounded-lg font-semibold">
                    <LayoutDashboard size={20} className="text-brand-primary" />
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 hover:bg-red-50 text-red-600 rounded-lg font-semibold">
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 bg-brand-primary text-white rounded-lg font-bold">
                <User size={20} />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
