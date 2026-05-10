import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, LayoutDashboard } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 w-full bg-[#2874f0] text-white py-2.5 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <div className="flex items-center gap-1 italic font-bold text-xl">
            <span>ShopSphere</span>
            <Package size={20} className="text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[11px] italic text-gray-100 flex items-center gap-1 -mt-1">
            Explore <span className="text-yellow-400 font-bold">Plus</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden md:block">
          <Input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-white text-gray-900 pr-10 focus-visible:ring-0 border-none shadow-sm h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#2874f0]">
            <Search size={20} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6 font-semibold text-[15px]">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-90 group relative">
                <User size={18} />
                <span>{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                
                {/* Dropdown Placeholder */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 shadow-xl rounded-sm py-2 hidden group-hover:block border border-gray-100">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                      <LayoutDashboard size={16} className="text-blue-600" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-red-600 border-t mt-1">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="flipkart" size="sm" className="h-8">
                Login
              </Button>
            </Link>
          )}

          <div className="hidden lg:block cursor-pointer">Become a Seller</div>
          
          <div className="flex items-center gap-1 cursor-pointer group">
            <span>More</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>

          <Link to="/cart" className="flex items-center gap-2 hover:opacity-90 relative">
            <div className="relative">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <Badge variant="flipkart" className="absolute -top-2 -right-2 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]">
                  {itemCount}
                </Badge>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
