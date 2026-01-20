import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import Navbar from '../components/Navbar';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Check if student is logged in
    const token = localStorage.getItem('bitezToken');
    if (!token || !token.startsWith('student_')) {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">Order History</h1>
          <p className="text-gray-600">View all your past orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">Start ordering delicious food from our canteens!</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 hover:border-purple-300 transition">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      <Clock size={14} className="inline mr-1" />
                      {order.date} at {order.time}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {order.canteen}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-semibold border-2 flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-purple-600">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="pt-4 border-t-2 border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-black text-purple-600">₹{order.total}</span>
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