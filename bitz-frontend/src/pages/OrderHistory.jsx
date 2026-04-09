import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, CheckCircle, XCircle, Package, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Check if student is logged in
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    if (!token || !hasAuthCookie) {
      navigate('/student-login');
      return;
    }

    // Load order history from localStorage
    const storedOrders = localStorage.getItem('bitezOrderHistory');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      // Mock data for demonstration
      const mockOrders = [
        {
          id: 1,
          date: '2024-01-18',
          time: '12:30 PM',
          canteen: 'Main Cafeteria',
          items: [
            { name: 'Chicken Burger', quantity: 2, price: 120 },
            { name: 'French Fries', quantity: 1, price: 60 }
          ],
          total: 300,
          status: 'completed'
        },
        {
          id: 2,
          date: '2024-01-17',
          time: '2:15 PM',
          canteen: 'South Canteen',
          items: [
            { name: 'Masala Dosa', quantity: 1, price: 70 },
            { name: 'Filter Coffee', quantity: 1, price: 25 }
          ],
          total: 95,
          status: 'completed'
        },
        {
          id: 3,
          date: '2024-01-16',
          time: '1:00 PM',
          canteen: 'Quick Bites',
          items: [
            { name: 'Samosa', quantity: 3, price: 20 },
            { name: 'Coffee', quantity: 2, price: 30 }
          ],
          total: 120,
          status: 'cancelled'
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('bitezOrderHistory', JSON.stringify(mockOrders));
    }
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-600" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-600" />;
      default:
        return <Package size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Order History</h1>
          <p className="text-slate-500 font-medium">Review your past culinary adventures</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="glass-panel rounded-[2.5rem] p-16 text-center border border-white shadow-xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
              <ShoppingBag size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-2">No Orders Yet</h3>
            <p className="text-slate-500 font-medium mb-8">Start exploring delicious menus from our partner canteens!</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl shadow-orange-600/30 transition-all shadow-lg flex items-center gap-3 mx-auto"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="glass rounded-[2rem] p-8 border border-white shadow-lg hover:-translate-y-1 transition-transform duration-300">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-1">Order #{order.id}</h3>
                    <p className="text-sm font-semibold text-slate-400 flex items-center mt-1">
                      <Clock size={14} className="inline mr-1" />
                      {order.date} at {order.time}
                    </p>
                    <p className="text-sm font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                      <MapPin size={16} className="text-orange-500" />
                      {order.canteen}
                    </p>
                  </div>
                  <div className={`px-5 py-2.5 rounded-xl font-bold border-2 flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize tracking-wider uppercase text-sm">{order.status}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center border border-white shadow-sm">
                           <ShoppingBag size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">{item.name}</p>
                          <p className="text-sm font-semibold text-slate-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black text-slate-800 text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
                    <span className="text-3xl font-black text-orange-600">₹{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;