import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, LayoutDashboard, Zap } from 'lucide-react';
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 py-3 shadow-2xl">
      <div className="container mx-auto px-4 flex items-center justify-between gap-6 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center glow-purple">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold tracking-tighter text-white">
              SHOP<span className="text-purple-500">SPHERE</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase -mt-1">By ChaiCode</p>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg relative hidden md:block">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500/50 h-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors">
            <Search size={18} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="group relative">
              <div className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs text-purple-400 font-bold">
                  {user?.name?.[0]}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </div>
              
              <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl py-2 hidden group-hover:block border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2">
                {isAdmin && (
                  <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm transition-colors">
                    <LayoutDashboard size={16} className="text-purple-500" />
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 text-sm text-red-400 border-t border-white/5 mt-1 transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white border-none rounded-xl px-6 h-10 font-bold shadow-lg shadow-purple-500/20">
                Sign In
              </Button>
            </Link>
          )}

          <Link to="/cart" className="relative group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
              <ShoppingCart size={20} className="text-gray-300 group-hover:text-purple-400" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#0a0a0a]">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
