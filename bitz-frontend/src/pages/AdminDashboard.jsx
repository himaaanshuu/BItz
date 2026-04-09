import React, { useState, useEffect } from 'react';
import {
  Store,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  DollarSign,
  Users,
  ChevronDown,
  Settings,
  BarChart2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const CanteenDashboard = () => {
  const [canteenData, setCanteenData] = useState(null);
  const [canteenForm, setCanteenForm] = useState({
    name: '',
    location: '',
    timings: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [menuDraft, setMenuDraft] = useState({
    name: '',
    price: '',
    category: '',
    available: true,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const [stats, setStats] = useState({
    pending: 0,
    preparing: 0,
    ready: 0,
    completed: 0,
    todayRevenue: 0,
    totalOrders: 0
  });

  useEffect(() => {
    const loadCanteen = async () => {
      try {
        const storedAdmin = localStorage.getItem('bitezAdmin');
        if (!storedAdmin || !localStorage.getItem('bitezAuthToken')) {
          navigate('/admin-login');
          return;
        }

        const response = await api.getCanteen();
        const canteen = response.canteen || {
          name: '',
          location: '',
          timings: '',
          contactPhone: '',
          contactEmail: '',
          menuItems: [],
        };
        setCanteenData(canteen);
        setCanteenForm({
          name: canteen.name,
          location: canteen.location,
          timings: canteen.timings,
          contactPhone: canteen.contactPhone,
          contactEmail: canteen.contactEmail,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    loadCanteen();

    const mockOrders = [
      {
        id: 1,
        tokenNumber: 456,
        customerName: 'Rahul Sharma',
        items: [
          { name: 'Veg Burger', quantity: 1, price: 60 },
          { name: 'Cold Coffee', quantity: 2, price: 50 }
        ],
        total: 160,
        status: 'pending',
        paymentMethod: 'Cash',
        time: '2:30 PM'
      },
      {
        id: 2,
        tokenNumber: 457,
        customerName: 'Priya Singh',
        items: [
          { name: 'Pizza Slice', quantity: 2, price: 80 },
          { name: 'French Fries', quantity: 1, price: 40 }
        ],
        total: 200,
        status: 'preparing',
        paymentMethod: 'UPI',
        time: '2:35 PM'
      },
      {
        id: 3,
        tokenNumber: 458,
        customerName: 'Amit Kumar',
        items: [
          { name: 'Sandwich', quantity: 1, price: 45 }
        ],
        total: 45,
        status: 'ready',
        paymentMethod: 'Cash',
        time: '2:40 PM'
      },
      {
        id: 4,
        tokenNumber: 459,
        customerName: 'Sneha Patel',
        items: [
          { name: 'Masala Dosa', quantity: 1, price: 70 },
          { name: 'Filter Coffee', quantity: 1, price: 25 }
        ],
        total: 95,
        status: 'completed',
        paymentMethod: 'UPI',
        time: '2:15 PM'
      }
    ];

  setOrders(mockOrders);

    const pending = mockOrders.filter(o => o.status === 'pending').length;
    const preparing = mockOrders.filter(o => o.status === 'preparing').length;
    const ready = mockOrders.filter(o => o.status === 'ready').length;
    const completed = mockOrders.filter(o => o.status === 'completed').length;
    const revenue = mockOrders.reduce((sum, o) => sum + o.total, 0);

    setStats({
      pending,
      preparing,
      ready,
      completed,
      todayRevenue: revenue,
      totalOrders: mockOrders.length
    });
  }, [navigate]);

  const handleCanteenChange = (field, value) => {
    setCanteenForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCanteen = async () => {
    setMessage('');
    setError('');
    setIsSaving(true);
    try {
      const response = canteenData
        ? await api.updateCanteen(canteenForm)
        : await api.createCanteen(canteenForm);
      setCanteenData(response.canteen);
      setMessage('Canteen details saved successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMenuDraft = (field, value) => {
    setMenuDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMenuItem = async () => {
    setMessage('');
    setError('');
    setIsSaving(true);
    try {
      const response = await api.addMenuItem({
        ...menuDraft,
        price: Number(menuDraft.price),
      });
      setCanteenData(response.canteen);
      setMenuDraft({ name: '', price: '', category: '', available: true });
      setMessage('Menu item added.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAvailability = async (item) => {
    setMessage('');
    setError('');
    try {
      const response = await api.updateMenuItem(item._id, {
        available: !item.available,
      });
      setCanteenData(response.canteen);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    setMessage('');
    setError('');
    try {
      const response = await api.deleteMenuItem(itemId);
      setCanteenData(response.canteen);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    setStats({
      ...stats,
      pending: updatedOrders.filter(o => o.status === 'pending').length,
      preparing: updatedOrders.filter(o => o.status === 'preparing').length,
      ready: updatedOrders.filter(o => o.status === 'ready').length,
      completed: updatedOrders.filter(o => o.status === 'completed').length
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/';
  };

  if (!canteenData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center animate-pulse">
          <Store size={64} className="text-orange-500 mx-auto" />
          <p className="mt-6 text-slate-500 font-bold text-xl">Loading your canteen universe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 pt-8 pb-10 px-8 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
              <Store size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">{canteenData.canteenName || 'Your Canteen'}</h1>
              <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                <span className="bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-sky-200">ADMIN</span>
                📍 {canteenData.location || "Location not set"}
              </p>
            </div>
          </div>

          {/* ACCOUNT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-full font-bold flex items-center gap-3 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
            >
              <div className="bg-orange-50 text-orange-600 p-1 rounded-full"><Store size={16} /></div>
              Manage <ChevronDown size={16} className={`text-slate-400 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => window.location.href = '/admin-analytics'}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-600 transition-colors"
                  >
                    <BarChart2 size={16} /> Analytics
                  </button>
                  <button
                    onClick={() => window.location.href = '/admin-settings'}
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

      {/* DASHBOARD CONTENT */}
      <div className="max-w-[1400px] mx-auto p-8 relative z-10">
        {(message || error) && (
          <div className="mb-6">
            {message && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 glass-panel p-8 rounded-[2rem] border border-white">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Canteen Profile</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                className="px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Canteen Name"
                value={canteenForm.name}
                onChange={(e) => handleCanteenChange('name', e.target.value)}
              />
              <input
                className="px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Location"
                value={canteenForm.location}
                onChange={(e) => handleCanteenChange('location', e.target.value)}
              />
              <input
                className="px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Timings"
                value={canteenForm.timings}
                onChange={(e) => handleCanteenChange('timings', e.target.value)}
              />
              <input
                className="px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Contact Phone"
                value={canteenForm.contactPhone}
                onChange={(e) => handleCanteenChange('contactPhone', e.target.value)}
              />
              <input
                className="px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm md:col-span-2"
                placeholder="Contact Email"
                value={canteenForm.contactEmail}
                onChange={(e) => handleCanteenChange('contactEmail', e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveCanteen}
              disabled={isSaving}
              className="mt-6 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
            >
              {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-white">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Add Menu Item</h2>
            <div className="space-y-4">
              <input
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Item Name"
                value={menuDraft.name}
                onChange={(e) => handleMenuDraft('name', e.target.value)}
              />
              <input
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                placeholder="Category (e.g. Snacks, Drinks)"
                value={menuDraft.category}
                onChange={(e) => handleMenuDraft('category', e.target.value)}
              />
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  className="w-full pl-10 pr-5 py-3.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                  placeholder="Price"
                  value={menuDraft.price}
                  onChange={(e) => handleMenuDraft('price', e.target.value)}
                />
              </div>
              <label className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-orange-300 transition-colors">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500"
                  checked={menuDraft.available}
                  onChange={(e) => handleMenuDraft('available', e.target.checked)}
                />
                Mark as Available
              </label>
              <button
                onClick={handleAddMenuItem}
                disabled={isSaving}
                className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Store size={18} />
                Add Item to Menu
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] border border-white p-8 mb-10">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Your Menu</h2>
          {canteenData.menuItems?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {canteenData.menuItems.map((item) => (
                <div key={item._id} className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className={`absolute top-0 inset-x-0 h-1.5 ${item.available ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  <p className="font-black text-xl text-slate-800 mb-1">{item.name}</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{item.category}</p>
                  <p className="text-3xl font-black text-slate-900 mb-4">₹{item.price}</p>
                  
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleToggleAvailability(item)}
                      className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                        item.available 
                          ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {item.available ? 'Set Unavailable' : 'Set Available'}
                    </button>
                    <button
                      onClick={() => handleDeleteMenuItem(item._id)}
                      className="px-4 py-2 rounded-xl text-sm font-bold border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-bold text-lg">Your menu is empty.</p>
              <p className="text-slate-400 font-medium">Add some delicious items above!</p>
            </div>
          )}
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
          {[
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Preparing', value: stats.preparing, icon: Package, color: 'text-sky-500', bg: 'bg-sky-50' },
            { label: 'Ready', value: stats.ready, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Completed', value: stats.completed, icon: XCircle, color: 'text-slate-500', bg: 'bg-slate-50' },
            { label: 'Revenue', value: `₹${stats.todayRevenue}`, icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Orders', value: stats.totalOrders, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' }
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-[2rem] hover:-translate-y-1 transition-all">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 border border-white`}>
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-black text-slate-800">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-8 border-b border-slate-100 pb-4">Live Kitchen Feed</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {orders.filter(o => o.status !== 'completed').map(order => (
              <div
                key={order.id}
                className={`border-2 rounded-[1.5rem] p-6 shadow-sm transition-all hover:shadow-md ${getStatusColor(order.status)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="bg-white border text-slate-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm inline-block mb-3">
                      Token #{order.tokenNumber}
                    </span>
                    <h3 className="font-bold text-2xl text-slate-900 border-b border-black/5 pb-2 mb-2">
                       ₹{order.total} • <span className="capitalize">{order.status}</span>
                    </h3>
                    <p className="text-sm font-semibold opacity-70">Ordered by: {order.customerName}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-bold opacity-70">{order.time}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 border-t border-black/5 pt-4">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-colors w-full"
                    >
                      Fire Order (Start Prep)
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-colors w-full"
                    >
                      Food is Ready!
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-colors w-full"
                    >
                      Handed Over (Complete)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenDashboard;