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
  const [menuItems, setMenuItems] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [canteenData, setCanteenData] = useState(null);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    popularItems: []
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

    const storedAdmin = localStorage.getItem('bitezAdmin');
    if (storedAdmin) setCanteenData(JSON.parse(storedAdmin));

    const storedMenu = localStorage.getItem('bitezMenu');
    if (storedMenu) {
      const items = JSON.parse(storedMenu);
      setMenuItems(items);

      const totalRevenue = items.reduce(
        (sum, item) => sum + item.price * (Math.floor(Math.random() * 20) + 5),
        0
      );
      const totalOrders = Math.floor(totalRevenue / 150);
      const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

      const itemsWithSales = items
        .map(item => ({ ...item, sales: Math.floor(Math.random() * 50) + 10 }))
        .sort((a, b) => b.sales - a.sales);

      setStats({
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        avgOrderValue,
        popularItems: itemsWithSales.slice(0, 5)
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Analytics</h1>
            <p className="opacity-90">
              {canteenData?.canteenName} — Performance Insights
            </p>
          </div>

          {/* ACCOUNT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2"
            >
              👤 Account <ChevronDown size={18} />
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border z-50">
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <BarChart2 size={18} />
                  Dashboard
                </button>

                <button
                  onClick={() => navigate('/admin-settings')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <div className="border-t" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={DollarSign} label="Total Revenue" value={`₹${stats.totalRevenue}`} />
          <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders} />
          <StatCard icon={Users} label="Avg Order Value" value={`₹${stats.avgOrderValue}`} />
          <StatCard icon={Award} label="Menu Items" value={menuItems.length} />
        </div>

        {/* Top Items */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Award className="text-orange-600" /> Top Selling Items
          </h2>

          {stats.popularItems.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 mb-3 bg-orange-50 rounded-xl border"
            >
              <div>
                <p className="font-bold">
                  #{index + 1} {item.name}
                </p>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <p className="font-bold text-orange-600">{item.sales} sales</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="text-orange-600" /> Recent Activity
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>🟢 New order placed — 2 mins ago</li>
            <li>🔵 Menu item updated — 15 mins ago</li>
            <li>🟣 New item added — 1 hour ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* Reusable stat card */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-xl">
    <Icon size={36} className="text-orange-600 mb-3" />
    <h3 className="text-3xl font-black">{value}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default AdminAnalytics;