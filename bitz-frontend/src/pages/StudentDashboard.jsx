import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, MapPin, User, LogOut, ShoppingBag, Home } from 'lucide-react';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuth = document.cookie.split(';').some(c => c.trim().startsWith('bitezAuth=student'));
    if (!userData || !token || !hasAuth) { setLoading(false); return; }
    try { setUser(JSON.parse(userData)); } catch {} finally { setLoading(false); }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bitezAuthToken');
    localStorage.removeItem('bitezUser');
    localStorage.removeItem('bitezStudentLoginTime');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/student-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
        <div className="text-center bg-white rounded-3xl p-8 shadow-sm border border-slate-100 w-full max-w-sm">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <LogOut size={28} />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 text-sm mb-6">Please log in to continue</p>
          <button onClick={() => navigate('/student-login')} className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-xl font-bold shadow-lg">
            Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/student-dashboard' },
    { icon: <UtensilsCrossed size={22} />, label: 'Order', path: '/order' },
    { icon: <MapPin size={22} />, label: 'Track', path: '/track' },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center text-lg font-black shadow-md shadow-orange-500/20">
              {user.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Welcome back</p>
              <h1 className="text-lg font-black text-slate-900 leading-tight">{user.name}</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/order')}
            className="bg-gradient-to-br from-orange-500 to-rose-500 p-6 rounded-2xl text-white shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <ShoppingBag size={28} className="mb-3 opacity-90" />
            <h3 className="font-black text-lg">Order Food</h3>
            <p className="text-white/70 text-xs mt-1">Skip the queue</p>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/track')}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer"
          >
            <MapPin size={28} className="text-orange-500 mb-3" />
            <h3 className="font-black text-lg text-slate-800">Track Order</h3>
            <p className="text-slate-400 text-xs mt-1">Live status</p>
          </motion.div>
        </div>

        {/* Account Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <h2 className="font-black text-sm text-slate-400 uppercase tracking-wider mb-4">Account Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Email</span>
              <span className="text-sm font-bold text-slate-800 text-right max-w-[200px] truncate">{user.email || 'N/A'}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Phone</span>
              <span className="text-sm font-bold text-slate-800">{user.phone || 'N/A'}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          {[
            { icon: <UtensilsCrossed size={18} />, label: 'Order History', path: '/order-history' },
            { icon: <ShoppingBag size={18} />, label: 'Current Order', path: '/current-order' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 cursor-pointer shadow-sm"
            >
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">{item.icon}</div>
              <span className="font-bold text-sm text-slate-700">{item.label}</span>
              <svg className="w-4 h-4 text-slate-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${isActive ? 'text-orange-600' : 'text-slate-400'}`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                  {isActive && <motion.div layoutId="studentNav" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />}
                </div>
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
