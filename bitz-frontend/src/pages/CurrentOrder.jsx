import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Package, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';

const CurrentOrder = () => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('preparing'); // preparing, ready, completed

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

    // Load current order from localStorage
    const storedOrder = localStorage.getItem('bitezCurrentOrder');
    if (storedOrder) {
      setCurrentOrder(JSON.parse(storedOrder));
    } else {
      // Mock current order for demonstration
      const mockOrder = {
        id: 4,
        date: '2024-01-19',
        time: '1:45 PM',
        canteen: 'Main Cafeteria',
        location: 'Ground Floor, Building A',
        phone: '+91 98765 43210',
        items: [
          { name: 'Veg Burger', quantity: 1, price: 60 },
          { name: 'Cold Coffee', quantity: 1, price: 50 }
        ],
        total: 110,
        estimatedTime: 12,
        queueNumber: 3
      };
      setCurrentOrder(mockOrder);
      localStorage.setItem('bitezCurrentOrder', JSON.stringify(mockOrder));
    }
  }, [navigate]);

  const getProgressPercentage = () => {
    switch (orderStatus) {
      case 'preparing':
        return 33;
      case 'ready':
        return 66;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">Current Order</h1>
          <p className="text-gray-600">Track your order in real-time</p>
        </div>

        {!currentOrder ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Active Orders</h3>
            <p className="text-gray-600 mb-6">You don't have any orders in progress right now</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Place New Order
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">Order #{currentOrder.id}</h2>
                  <p className="text-purple-100">Queue Number: #{currentOrder.queueNumber}</p>
                </div>
                <div className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold">
                  <Clock size={20} className="inline mr-2" />
                  ~{currentOrder.estimatedTime} min
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-purple-300 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'preparing' || orderStatus === 'ready' || orderStatus === 'completed' ? 'bg-yellow-400 text-purple-900' : 'bg-purple-300 text-purple-600'}`}>
                      <Package size={24} />
                    </div>
                    <p className="text-sm font-semibold">Preparing</p>
                  </div>
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'ready' || orderStatus === 'completed' ? 'bg-yellow-400 text-purple-900' : 'bg-purple-300 text-purple-600'}`}>
                      <CheckCircle size={24} />
                    </div>
                    <p className="text-sm font-semibold">Ready</p>
                  </div>
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'completed' ? 'bg-yellow-400 text-purple-900' : 'bg-purple-300 text-purple-600'}`}>
                      <CheckCircle size={24} />
                    </div>
                    <p className="text-sm font-semibold">Completed</p>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <p className="text-xl font-bold">
                  {orderStatus === 'preparing' && '👨‍🍳 Your order is being prepared...'}
                  {orderStatus === 'ready' && '✅ Your order is ready for pickup!'}
                  {orderStatus === 'completed' && '🎉 Order completed! Enjoy your meal!'}
                </p>
              </div>
            </div>

            {/* Canteen Details */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Pickup Location</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="text-purple-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">{currentOrder.canteen}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-purple-600" size={24} />
                  <p className="text-gray-700">{currentOrder.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-purple-600" size={24} />
                  <p className="text-gray-700">{currentOrder.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-3">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
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
              <div className="mt-6 pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total Amount</span>
                  <span className="text-3xl font-black text-purple-600">₹{currentOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Demo Status Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Demo Controls (For Testing)</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrderStatus('preparing')}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
                >
                  Set Preparing
                </button>
                <button
                  onClick={() => setOrderStatus('ready')}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  Set Ready
                </button>
                <button
                  onClick={() => setOrderStatus('completed')}
                  className="flex-1 bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 transition"
                >
                  Set Completed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentOrder;