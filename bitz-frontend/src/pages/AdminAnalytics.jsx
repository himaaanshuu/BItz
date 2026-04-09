import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  Award,
  ChevronDown,
  Settings,
  LogOut,
  BarChart2
} from 'lucide-react';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [canteenData, setCanteenData] = useState(() => {
    const storedAdmin = localStorage.getItem('bitezAdmin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const [menuItems, setMenuItems] = useState(() => {
    const storedMenu = localStorage.getItem('bitezMenu');
    return storedMenu ? JSON.parse(storedMenu) : [];
  });

  const [stats, setStats] = useState(() => {
    const storedMenu = localStorage.getItem('bitezMenu');
    if (storedMenu) {
      const items = JSON.parse(storedMenu);
      const totalRevenue = items.reduce(
        (sum, item) => sum + item.price * (Math.floor(Math.random() * 20) + 5),
        0
      );
      const totalOrders = Math.floor(totalRevenue / 150);
      const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
      const itemsWithSales = items
        .map(item => ({ ...item, sales: Math.floor(Math.random() * 50) + 10 }))
        .sort((a, b) => b.sales - a.sales);

      return {
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        avgOrderValue,
        popularItems: itemsWithSales.slice(0, 5)
      };
    }
    return {
      totalRevenue: 0,
      totalOrders: 0,
      avgOrderValue: 0,
      popularItems: []
    };
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=admin'));
    if (!adminToken || !hasAuthCookie) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 pt-8 pb-10 px-8 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
              <TrendingUp size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Analytics</h1>
              <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                <span className="bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-rose-200">INSIGHTS</span>
                {canteenData?.canteenName || "Your Canteen"}
              </p>
            </div>
          </div>

          {/* ACCOUNT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-full font-bold flex items-center gap-3 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
            >
              <div className="bg-orange-50 text-orange-600 p-1 rounded-full"><TrendingUp size={16} /></div>
              Manage <ChevronDown size={16} className={`text-slate-400 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => navigate('/admin-dashboard')}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-600 transition-colors"
                  >
                    <BarChart2 size={16} /> Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/admin-settings')}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-600 transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </button>
                  <div className="border-t border-slate-100 my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-red-50 text-red-600 font-bold transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto p-8 relative z-10">

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={DollarSign} label="Total Revenue" value={`₹${stats.totalRevenue}`} color="text-emerald-500" bg="bg-emerald-50" />
          <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders} color="text-indigo-500" bg="bg-indigo-50" />
          <StatCard icon={Users} label="Avg Order Value" value={`₹${stats.avgOrderValue}`} color="text-orange-500" bg="bg-orange-50" />
          <StatCard icon={Award} label="Menu Items" value={menuItems.length} color="text-rose-500" bg="bg-rose-50" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Items */}
          <div className="glass-panel p-8 rounded-[2rem] border border-white">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
              <div className="bg-amber-100 text-amber-600 p-2 rounded-xl"><Award size={20} /></div>
              Top Selling Items
            </h2>

            <div className="space-y-4">
              {stats.popularItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-xl font-black text-slate-300 group-hover:text-amber-400 transition-colors">#{index + 1}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-lg">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-slate-400">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-amber-500 text-xl">{item.sales}</p>
                    <p className="text-xs font-bold text-amber-500/70 uppercase">sales</p>
                  </div>
                </div>
              ))}
              {stats.popularItems.length === 0 && (
                <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-bold">No sales data yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-panel p-8 rounded-[2rem] border border-white h-fit">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
              <div className="bg-sky-100 text-sky-600 p-2 rounded-xl"><Clock size={20} /></div>
              Recent Activity
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-emerald-100 rounded-full border-[4px] border-white z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="font-bold text-slate-800">New order placed</p>
                <p className="text-sm font-semibold text-slate-400">2 mins ago</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-blue-100 rounded-full border-[4px] border-white z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <p className="font-bold text-slate-800">Menu item updated</p>
                <p className="text-sm font-semibold text-slate-400">15 mins ago</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-fuchsia-100 rounded-full border-[4px] border-white z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
                </div>
                <p className="font-bold text-slate-800">New item added</p>
                <p className="text-sm font-semibold text-slate-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable stat card */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="glass p-6 rounded-[2rem] border border-white hover:-translate-y-1 transition-all">
    <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-4 border border-white`}>
      <Icon size={28} />
    </div>
    <h3 className="text-4xl font-black text-slate-800 mb-1">{value}</h3>
    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</p>
  </div>
);

export default AdminAnalytics;