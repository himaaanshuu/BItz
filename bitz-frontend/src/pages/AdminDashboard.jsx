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
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <div className="text-center">
          <Store size={64} className="text-orange-600 mx-auto" />
          <p className="mt-4 text-gray-700">Loading canteen profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">{canteenData.canteenName}</h1>
            <p className="opacity-90">📍 {canteenData.location}</p>
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
                  onClick={() => window.location.href = '/admin-analytics'}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <BarChart2 size={18} className="text-blue-600" />
                  Analytics
                </button>

                <button
                  onClick={() => window.location.href = '/admin-settings'}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <Settings size={18} className="text-gray-600" />
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

      {/* DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto p-6">
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

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl border">
            <h2 className="text-2xl font-black mb-4">Canteen Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="px-4 py-3 border rounded-xl"
                placeholder="Canteen Name"
                value={canteenForm.name}
                onChange={(e) => handleCanteenChange('name', e.target.value)}
              />
              <input
                className="px-4 py-3 border rounded-xl"
                placeholder="Location"
                value={canteenForm.location}
                onChange={(e) => handleCanteenChange('location', e.target.value)}
              />
              <input
                className="px-4 py-3 border rounded-xl"
                placeholder="Timings"
                value={canteenForm.timings}
                onChange={(e) => handleCanteenChange('timings', e.target.value)}
              />
              <input
                className="px-4 py-3 border rounded-xl"
                placeholder="Contact Phone"
                value={canteenForm.contactPhone}
                onChange={(e) => handleCanteenChange('contactPhone', e.target.value)}
              />
              <input
                className="px-4 py-3 border rounded-xl md:col-span-2"
                placeholder="Contact Email"
                value={canteenForm.contactEmail}
                onChange={(e) => handleCanteenChange('contactEmail', e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveCanteen}
              disabled={isSaving}
              className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border">
            <h2 className="text-2xl font-black mb-4">Add Menu Item</h2>
            <div className="space-y-3">
              <input
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Item Name"
                value={menuDraft.name}
                onChange={(e) => handleMenuDraft('name', e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Category"
                value={menuDraft.category}
                onChange={(e) => handleMenuDraft('category', e.target.value)}
              />
              <input
                type="number"
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Price"
                value={menuDraft.price}
                onChange={(e) => handleMenuDraft('price', e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={menuDraft.available}
                  onChange={(e) => handleMenuDraft('available', e.target.checked)}
                />
                Available
              </label>
              <button
                onClick={handleAddMenuItem}
                disabled={isSaving}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black disabled:opacity-70"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border mb-10">
          <h2 className="text-2xl font-black mb-4">Menu Items</h2>
          {canteenData.menuItems?.length ? (
            <div className="space-y-4">
              {canteenData.menuItems.map((item) => (
                <div key={item._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-xl p-4">
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category} · ₹{item.price}</p>
                    <p className="text-xs text-gray-500">{item.available ? 'Available' : 'Unavailable'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleAvailability(item)}
                      className="px-4 py-2 rounded-lg border text-sm font-semibold"
                    >
                      {item.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button
                      onClick={() => handleDeleteMenuItem(item._id)}
                      className="px-4 py-2 rounded-lg border text-sm font-semibold text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No menu items yet. Add your first item.</p>
          )}
        </div>
        {/* Stats */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
            { label: 'Preparing', value: stats.preparing, icon: Package, color: 'blue' },
            { label: 'Ready', value: stats.ready, icon: CheckCircle, color: 'green' },
            { label: 'Completed', value: stats.completed, icon: XCircle, color: 'gray' },
            { label: 'Revenue', value: `₹${stats.todayRevenue}`, icon: DollarSign, color: 'orange' },
            { label: 'Orders', value: stats.totalOrders, icon: Users, color: 'purple' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border">
              <stat.icon size={28} />
              <p className="text-2xl font-black mt-2">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-black mb-6">Active Orders</h2>

          {orders.filter(o => o.status !== 'completed').map(order => (
            <div
              key={order.id}
              className={`border-2 rounded-xl p-6 mb-4 ${getStatusColor(order.status)}`}
            >
              <h3 className="font-bold text-xl mb-2">
                Token #{order.tokenNumber} – ₹{order.total}
              </h3>

              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanteenDashboard;