import React, { useState, useEffect } from 'react';
import {
  Store, LogOut, Clock, CheckCircle, XCircle, Package, DollarSign,
  Users, ChevronDown, Settings, BarChart2, Plus, Trash2, ToggleLeft,
  ToggleRight, MapPin, Phone, Mail, UtensilsCrossed, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import ScrollReveal from '../components/ScrollReveal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [canteenData, setCanteenData] = useState(null);
  const [canteenForm, setCanteenForm] = useState({ name: '', location: '', timings: '', contactPhone: '', contactEmail: '' });
  const [menuDraft, setMenuDraft] = useState({ name: '', price: '', category: '', available: true });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [stats, setStats] = useState({ pending: 0, preparing: 0, ready: 0, completed: 0, todayRevenue: 0, totalOrders: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showAccountMenu && !e.target.closest('.mobile-menu-container')) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAccountMenu]);

  useEffect(() => {
    const loadCanteen = async () => {
      try {
        const storedAdmin = localStorage.getItem('bitezAdmin');
        if (!storedAdmin || !localStorage.getItem('bitezAuthToken')) {
          navigate('/admin-login');
          return;
        }
        const response = await api.getCanteen();
        const canteen = response.canteen || { name: '', location: '', timings: '', contactPhone: '', contactEmail: '', menuItems: [] };
        setCanteenData(canteen);
        setCanteenForm({ name: canteen.name, location: canteen.location, timings: canteen.timings, contactPhone: canteen.contactPhone, contactEmail: canteen.contactEmail });
      } catch (err) {
        setError(err.message);
      }
    };
    loadCanteen();

    const mockOrders = [
      { id: 1, tokenNumber: 456, customerName: 'Rahul Sharma', items: [{ name: 'Veg Burger', quantity: 1, price: 60 }, { name: 'Cold Coffee', quantity: 2, price: 50 }], total: 160, status: 'pending', paymentMethod: 'Cash', time: '2:30 PM' },
      { id: 2, tokenNumber: 457, customerName: 'Priya Singh', items: [{ name: 'Paneer Tikka Pizza', quantity: 2, price: 120 }, { name: 'French Fries', quantity: 1, price: 45 }], total: 285, status: 'preparing', paymentMethod: 'UPI', time: '2:35 PM' },
      { id: 3, tokenNumber: 458, customerName: 'Amit Kumar', items: [{ name: 'Samosa (2 pcs)', quantity: 2, price: 25 }, { name: 'Masala Chai', quantity: 2, price: 20 }], total: 90, status: 'ready', paymentMethod: 'Cash', time: '2:40 PM' },
      { id: 4, tokenNumber: 459, customerName: 'Sneha Patel', items: [{ name: 'Veg Fried Rice', quantity: 1, price: 70 }, { name: 'Gulab Jamun (2 pcs)', quantity: 1, price: 35 }], total: 105, status: 'completed', paymentMethod: 'UPI', time: '2:15 PM' },
    ];
    setOrders(mockOrders);
    setStats({
      pending: mockOrders.filter(o => o.status === 'pending').length,
      preparing: mockOrders.filter(o => o.status === 'preparing').length,
      ready: mockOrders.filter(o => o.status === 'ready').length,
      completed: mockOrders.filter(o => o.status === 'completed').length,
      todayRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
      totalOrders: mockOrders.length,
    });
  }, [navigate]);

  const handleCanteenChange = (field, value) => setCanteenForm(prev => ({ ...prev, [field]: value }));

  const handleSaveCanteen = async () => {
    setMessage(''); setError(''); setIsSaving(true);
    try {
      const response = canteenData ? await api.updateCanteen(canteenForm) : await api.createCanteen(canteenForm);
      setCanteenData(response.canteen);
      setMessage('Canteen profile saved.');
    } catch (err) { setError(err.message); } finally { setIsSaving(false); }
  };

  const handleAddMenuItem = async () => {
    setMessage(''); setError(''); setIsSaving(true);
    try {
      const response = await api.addMenuItem({ ...menuDraft, price: Number(menuDraft.price) });
      setCanteenData(response.canteen);
      setMenuDraft({ name: '', price: '', category: '', available: true });
      setMessage('Menu item added.');
    } catch (err) { setError(err.message); } finally { setIsSaving(false); }
  };

  const handleToggleAvailability = async (item) => {
    setMessage(''); setError('');
    try {
      const response = await api.updateMenuItem(item._id, { available: !item.available });
      setCanteenData(response.canteen);
    } catch (err) { setError(err.message); }
  };

  const handleDeleteMenuItem = async (itemId) => {
    setMessage(''); setError('');
    try {
      const response = await api.deleteMenuItem(itemId);
      setCanteenData(response.canteen);
    } catch (err) { setError(err.message); }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    setStats({
      ...stats,
      pending: updated.filter(o => o.status === 'pending').length,
      preparing: updated.filter(o => o.status === 'preparing').length,
      ready: updated.filter(o => o.status === 'ready').length,
      completed: updated.filter(o => o.status === 'completed').length,
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Pending' },
      preparing: { bg: 'bg-sky-50', border: 'border-sky-200', badge: 'bg-sky-100 text-sky-700', icon: Package, label: 'Preparing' },
      ready: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Ready' },
      completed: { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-600', icon: XCircle, label: 'Completed' },
    };
    return configs[status] || configs.pending;
  };

  const handleLogout = () => {
    localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/';
  };

  if (!canteenData) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-10 glass rounded-3xl">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold text-lg">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const statCards = [
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Preparing', value: stats.preparing, icon: Package, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'Ready', value: stats.ready, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Completed', value: stats.completed, icon: XCircle, color: 'text-slate-400', bg: 'bg-slate-50' },
    { label: 'Revenue', value: `₹${stats.todayRevenue}`, icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Total Orders', value: stats.totalOrders, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const tabs = [
    { id: 'orders', label: 'Live Orders', icon: Package },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'profile', label: 'Canteen Profile', icon: Store },
  ];

  const activeOrders = orders.filter(o => o.status !== 'completed');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Store size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{canteenData.name || 'Your Canteen'}</h1>
              <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">ADMIN</span>
                {canteenData.location || 'Location not set'}
              </p>
            </div>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/admin-analytics')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all border border-slate-200">
              <BarChart2 size={16} /> Analytics
            </button>
            <button onClick={() => navigate('/admin-settings')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all border border-slate-200">
              <Settings size={16} /> Settings
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all border border-red-200">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden relative mobile-menu-container">
            <button onClick={() => setShowAccountMenu(!showAccountMenu)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 hover:border-orange-400 transition-all">
              <Settings size={16} /> Menu <ChevronDown size={14} className={`transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showAccountMenu && (
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <button onClick={() => { navigate('/admin-analytics'); setShowAccountMenu(false); }} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-600 transition-colors text-sm">
                    <BarChart2 size={16} /> Analytics
                  </button>
                  <button onClick={() => { navigate('/admin-settings'); setShowAccountMenu(false); }} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-600 transition-colors text-sm">
                    <Settings size={16} /> Settings
                  </button>
                  <div className="border-t border-slate-100" />
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 font-bold transition-colors text-sm">
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8 relative z-10">
        {/* Alerts */}
        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold flex items-center gap-2">
              <CheckCircle size={18} /> {message}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid - Horizontal scroll on mobile */}
        <ScrollReveal variant="fadeUp">
          <div className="flex gap-4 mb-8 overflow-x-auto scrollbar-hide pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {statCards.map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm min-w-[140px] flex-shrink-0 lg:min-w-0">
                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid lg:grid-cols-2 gap-5">
                {activeOrders.length === 0 ? (
                  <div className="lg:col-span-2 text-center py-16 bg-white rounded-3xl border border-slate-100">
                    <Package size={48} className="text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold text-lg">No active orders</p>
                    <p className="text-slate-300 text-sm mt-1">New orders will appear here</p>
                  </div>
                ) : (
                  activeOrders.map((order, idx) => {
                    const config = getStatusConfig(order.status);
                    const StatusIcon = config.icon;
                    return (
                      <motion.div key={order.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * idx }} whileHover={{ y: -2 }} className={`bg-white rounded-2xl border ${config.border} p-5 shadow-sm`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Token</span>
                              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-sm font-black">#{order.tokenNumber}</span>
                            </div>
                            <p className="font-bold text-slate-800">{order.customerName}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${config.badge}`}>
                              <StatusIcon size={12} /> {config.label}
                            </span>
                            <p className="text-xs text-slate-400 mt-1 font-medium">{order.time}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm py-1">
                              <span className="text-slate-600 font-medium">{item.quantity}x {item.name}</span>
                              <span className="font-bold text-slate-700">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm pt-2 mt-2 border-t border-slate-200">
                            <span className="font-bold text-slate-700">Total</span>
                            <span className="font-black text-orange-600 text-lg">₹{order.total}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl font-bold text-sm transition-colors">
                              Start Preparing
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button onClick={() => updateOrderStatus(order.id, 'ready')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm transition-colors">
                              Mark Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button onClick={() => updateOrderStatus(order.id, 'completed')} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl font-bold text-sm transition-colors">
                              Handed Over
                            </button>
                          )}
                          <span className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100">{order.paymentMethod}</span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Add Item Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-6">
                    <h3 className="font-black text-lg text-slate-800 mb-5 flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center"><Plus size={16} /></div>
                      Add Menu Item
                    </h3>
                    <div className="space-y-3">
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Item name" value={menuDraft.name} onChange={e => setMenuDraft({ ...menuDraft, name: e.target.value })} />
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Category" value={menuDraft.category} onChange={e => setMenuDraft({ ...menuDraft, category: e.target.value })} />
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                        <input type="number" className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Price" value={menuDraft.price} onChange={e => setMenuDraft({ ...menuDraft, price: e.target.value })} />
                      </div>
                      <label className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-orange-600" checked={menuDraft.available} onChange={e => setMenuDraft({ ...menuDraft, available: e.target.checked })} />
                        Available
                      </label>
                      <button onClick={handleAddMenuItem} disabled={isSaving || !menuDraft.name || !menuDraft.price || !menuDraft.category} className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 transition-all">
                        {isSaving ? 'Adding...' : 'Add to Menu'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="lg:col-span-2">
                  {canteenData.menuItems?.length ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {canteenData.menuItems.map((item, idx) => (
                        <motion.div key={item._id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-black text-lg text-slate-800">{item.name}</p>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</p>
                            </div>
                            <span className="text-2xl font-black text-orange-600">₹{item.price}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleToggleAvailability(item)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-colors ${item.available ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'}`}>
                              {item.available ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                              {item.available ? 'Available' : 'Unavailable'}
                            </button>
                            <button onClick={() => handleDeleteMenuItem(item._id)} className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                      <UtensilsCrossed size={40} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 font-bold">No menu items yet</p>
                      <p className="text-slate-300 text-sm mt-1">Add your first item using the form</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="max-w-2xl">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                  <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center"><Store size={16} /></div>
                    Canteen Profile
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5"><Store size={12} /> Canteen Name</label>
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Canteen Name" value={canteenForm.name} onChange={e => handleCanteenChange('name', e.target.value)} />
                    </div>
                    <div>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5"><MapPin size={12} /> Location</label>
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Location" value={canteenForm.location} onChange={e => handleCanteenChange('location', e.target.value)} />
                    </div>
                    <div>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5"><Clock size={12} /> Timings</label>
                      <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="e.g. 8:00 AM - 8:00 PM" value={canteenForm.timings} onChange={e => handleCanteenChange('timings', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5"><Phone size={12} /> Contact Phone</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="+91 98765 43210" value={canteenForm.contactPhone} onChange={e => handleCanteenChange('contactPhone', e.target.value)} />
                      </div>
                      <div>
                        <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5"><Mail size={12} /> Contact Email</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="email@example.com" value={canteenForm.contactEmail} onChange={e => handleCanteenChange('contactEmail', e.target.value)} />
                      </div>
                    </div>
                    <button onClick={handleSaveCanteen} disabled={isSaving} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-70 shadow-lg hover:shadow-xl transition-all mt-2">
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
