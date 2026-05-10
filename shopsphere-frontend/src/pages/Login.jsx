import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Package, Lock, Mail, ArrowRight, Zap } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-3xl relative">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-brand-500 to-orange-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30 mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Zap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Log in to your ShopSphere account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="email"
                placeholder="name@company.com"
                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500/20"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
              <Link to="#" className="text-xs font-bold text-brand-500 hover:text-brand-600">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:border-brand-500 focus:ring-brand-500/20"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 btn-premium rounded-xl font-bold text-base" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="ml-2" size={18} />}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-500 font-bold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
