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

const CanteenDashboard = () => {
  const [canteenData, setCanteenData] = useState(null);
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
    const storedData = localStorage.getItem('bitezAdmin');
    if (storedData) setCanteenData(JSON.parse(storedData));

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
  }, []);

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
    localStorage.removeItem('bitezAdminToken');
    window.location.href = '/';
  };

  if (!canteenData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <Store size={64} className="text-orange-600" />
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