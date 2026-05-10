import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Package, ChevronDown, LayoutDashboard, Menu, X, Sun, Moon, Zap } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import useThemeStore from '../store/useThemeStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();
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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between gap-8 max-w-7xl">
        
        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground/70"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-all duration-300">
            <Zap size={22} className="text-primary-foreground fill-current" />
          </div>
          <div className="hidden xs:block">
            <h1 className="text-xl font-black tracking-tighter leading-none">
              SHOP<span className="text-primary">SPHERE</span>
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Exclusive Hub</span>
          </div>
        </Link>

        {/* Desktop Search - Perfectly Centered */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden lg:block mx-auto">
          <div className="relative group">
            <Input
              type="text"
              placeholder="Search premium products..."
              className="w-full bg-foreground/5 border-none text-foreground placeholder:text-foreground/40 pr-12 h-12 rounded-2xl focus-visible:ring-primary/40 focus-visible:bg-foreground/[0.08] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-primary transition-all"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="group relative">
                <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 bg-foreground/5 rounded-2xl hover:bg-foreground/10 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {user?.name?.[0]}
                  </div>
                  <ChevronDown size={14} className="text-foreground/40 group-hover:rotate-180 transition-transform" />
                </div>
                
                <div className="absolute top-full right-0 mt-2 w-56 bg-card rounded-2xl py-2 hidden group-hover:block border border-border shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-border mb-1">
                    <p className="text-sm font-bold truncate">{user?.name}</p>
                    <p className="text-[10px] text-foreground/40 uppercase font-black tracking-widest">{user?.role}</p>
                  </div>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-foreground/5 text-sm font-medium transition-colors">
                      <LayoutDashboard size={18} className="text-primary" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-sm font-bold text-red-500 border-t border-border mt-1 transition-colors">
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button className="btn-indigo px-8 h-12 rounded-2xl">
                  Log In
                </Button>
              </Link>
            )}
          </div>

          <Link to="/cart" className="relative group p-3 bg-foreground/5 text-foreground/70 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-black border-2 border-background">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
