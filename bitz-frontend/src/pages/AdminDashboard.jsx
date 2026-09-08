import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store, LogOut, Clock, CheckCircle, XCircle, Package, DollarSign,
  Users, Settings, BarChart2, Plus, Trash2, ToggleLeft,
  ToggleRight, MapPin, Phone, Mail, UtensilsCrossed, AlertCircle, Image, Pencil
} from 'lucide-react';
import { api } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canteenData, setCanteenData] = useState(null);
  const [canteenForm, setCanteenForm] = useState({ name: '', location: '', timings: '', contactPhone: '', contactEmail: '' });
  const [menuDraft, setMenuDraft] = useState({ name: '', price: '', category: '', available: true, imageUrl: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [stats, setStats] = useState({ pending: 0, preparing: 0, ready: 0, completed: 0, todayRevenue: 0, totalOrders: 0 });
  const [editingImageUrl, setEditingImageUrl] = useState(null);
  const [editImageUrlValue, setEditImageUrlValue] = useState('');

  useEffect(() => {
    const loadCanteen = async () => {
      const storedAdmin = localStorage.getItem('bitezAdmin');
      if (!storedAdmin || !localStorage.getItem('bitezAuthToken')) { navigate('/admin-login'); return; }
      try {
        const response = await api.getCanteen();
        const canteen = response.canteen || { name: '', location: '', timings: '', contactPhone: '', contactEmail: '', menuItems: [] };
        setCanteenData(canteen);
        setCanteenForm({ name: canteen.name, location: canteen.location, timings: canteen.timings, contactPhone: canteen.contactPhone, contactEmail: canteen.contactEmail });
      } catch (err) { setError(err.message); }
    };
    loadCanteen();
    setOrders([]);
    setStats({ pending: 0, preparing: 0, ready: 0, completed: 0, todayRevenue: 0, totalOrders: 0 });
  }, [navigate]);

  const handleCanteenChange = (field, value) => setCanteenForm(prev => ({ ...prev, [field]: value }));
  const handleSaveCanteen = async () => {
    setMessage(''); setError(''); setIsSaving(true);
    try {
      const response = canteenData ? await api.updateCanteen(canteenForm) : await api.createCanteen(canteenForm);
      setCanteenData(response.canteen); setMessage('Profile saved.');
    } catch (err) { setError(err.message); } finally { setIsSaving(false); }
  };
  const handleAddMenuItem = async () => {
    setMessage(''); setError(''); setIsSaving(true);
    try {
      const response = await api.addMenuItem({ ...menuDraft, price: Number(menuDraft.price) });
      setCanteenData(response.canteen); setMenuDraft({ name: '', price: '', category: '', available: true, imageUrl: '' }); setMessage('Item added.');
    } catch (err) { setError(err.message); } finally { setIsSaving(false); }
  };
  const handleToggleAvailability = async (item) => {
    try { const response = await api.updateMenuItem(item._id, { available: !item.available }); setCanteenData(response.canteen); } catch (err) { setError(err.message); }
  };
  const handleDeleteMenuItem = async (itemId) => {
    try { const response = await api.deleteMenuItem(itemId); setCanteenData(response.canteen); } catch (err) { setError(err.message); }
  };
  const handleUpdateImageUrl = async (itemId, imageUrl) => {
    try { const response = await api.updateMenuItem(itemId, { imageUrl }); setCanteenData(response.canteen); } catch (err) { setError(err.message); }
  };
  const handleLogout = () => {
    localStorage.removeItem('bitezAdmin'); localStorage.removeItem('bitezAuthToken'); localStorage.removeItem('bitezAdminLoginTime');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; navigate('/');
  };

  if (!canteenData) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Preparing', value: stats.preparing, icon: Package, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'Ready', value: stats.ready, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Revenue', value: `₹${stats.todayRevenue}`, icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const navItems = [
    { icon: <Package size={22} />, label: 'Orders', path: 'orders' },
    { icon: <UtensilsCrossed size={22} />, label: 'Menu', path: 'menu' },
    { icon: <Store size={22} />, label: 'Profile', path: 'profile' },
    { icon: <BarChart2 size={22} />, label: 'Analytics', path: '/admin-analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Store size={20} />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">{canteenData.name || 'Your Canteen'}</h1>
              <p className="text-xs text-slate-400 font-medium">{canteenData.location || 'Location not set'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-5">
        {/* Alerts */}
        <AnimatePresence>
          {message && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-semibold flex items-center gap-2"><CheckCircle size={16} />{message}</motion.div>}
          {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 font-semibold flex items-center gap-2"><AlertCircle size={16} />{error}</motion.div>}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
              <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <stat.icon size={14} />
              </div>
              <p className="text-lg font-black text-slate-800">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-black text-sm text-slate-400 uppercase tracking-wider mb-3">Live Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                  <Package size={36} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold text-sm">No active orders</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order, idx) => {
                    const config = { pending: { bg: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700' }, preparing: { bg: 'bg-sky-50 border-sky-200', badge: 'bg-sky-100 text-sky-700' }, ready: { bg: 'bg-emerald-50 border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' } }[order.status] || { bg: 'bg-white border-slate-100', badge: 'bg-slate-100 text-slate-600' };
                    return (
                      <div key={order.id} className={`bg-white rounded-xl border p-4 ${config.bg}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-black text-sm text-slate-800">#{order.tokenNumber}</p>
                            <p className="text-xs text-slate-500">{order.customerName}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge}`}>{order.status}</span>
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'pending' && <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="flex-1 bg-sky-500 text-white py-2 rounded-lg font-bold text-xs">Start</button>}
                          {order.status === 'preparing' && <button onClick={() => updateOrderStatus(order.id, 'ready')} className="flex-1 bg-emerald-500 text-white py-2 rounded-lg font-bold text-xs">Ready</button>}
                          {order.status === 'ready' && <button onClick={() => updateOrderStatus(order.id, 'completed')} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-bold text-xs">Done</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Add Form */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4 shadow-sm">
                <h3 className="font-black text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <Plus size={14} className="text-orange-500" /> Add Item
                </h3>
                <div className="space-y-2">
                  <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Name" value={menuDraft.name} onChange={e => setMenuDraft({ ...menuDraft, name: e.target.value })} />
                  <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Category" value={menuDraft.category} onChange={e => setMenuDraft({ ...menuDraft, category: e.target.value })} />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                    <input type="number" className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Price" value={menuDraft.price} onChange={e => setMenuDraft({ ...menuDraft, price: e.target.value })} />
                  </div>
                  <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Image URL (optional)" value={menuDraft.imageUrl || ''} onChange={e => setMenuDraft({ ...menuDraft, imageUrl: e.target.value })} />
                  <button onClick={handleAddMenuItem} disabled={isSaving || !menuDraft.name || !menuDraft.price || !menuDraft.category}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-50">
                    {isSaving ? 'Adding...' : 'Add to Menu'}
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              {canteenData.menuItems?.length ? (
                <div className="space-y-3">
                  {canteenData.menuItems.map((item, idx) => (
                    <div key={item._id} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-black text-sm text-slate-800">{item.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</p>
                        </div>
                        <span className="text-lg font-black text-orange-600">₹{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleToggleAvailability(item)} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${item.available ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </button>
                        <button onClick={() => handleDeleteMenuItem(item._id)} className="px-3 py-2 rounded-lg text-xs font-bold border border-slate-200 text-slate-500 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                  <UtensilsCrossed size={32} className="text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">No items yet</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <h3 className="font-black text-sm text-slate-800 mb-4 flex items-center gap-2">
                  <Store size={14} className="text-orange-500" /> Canteen Profile
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Name</label>
                    <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Canteen Name" value={canteenForm.name} onChange={e => handleCanteenChange('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Location</label>
                    <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="Location" value={canteenForm.location} onChange={e => handleCanteenChange('location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Timings</label>
                    <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="e.g. 8AM - 8PM" value={canteenForm.timings} onChange={e => handleCanteenChange('timings', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Phone</label>
                      <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="+91..." value={canteenForm.contactPhone} onChange={e => handleCanteenChange('contactPhone', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Email</label>
                      <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" placeholder="email@..." value={canteenForm.contactEmail} onChange={e => handleCanteenChange('contactEmail', e.target.value)} />
                    </div>
                  </div>
                  <button onClick={handleSaveCanteen} disabled={isSaving} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm disabled:opacity-70 mt-2">
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item, i) => {
            const isActive = item.path.startsWith('/') ? false : activeTab === item.path;
            return (
              <button
                key={i}
                onClick={() => {
                  if (item.path.startsWith('/')) navigate(item.path);
                  else setActiveTab(item.path);
                }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${isActive ? 'text-orange-600' : 'text-slate-400'}`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                  {isActive && <motion.div layoutId="adminNav" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />}
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

export default AdminDashboard;
