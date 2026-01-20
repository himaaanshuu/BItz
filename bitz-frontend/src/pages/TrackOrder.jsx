import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezToken');
    
    if (!userData || !token) {
      navigate('/student-login');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
      
      // Load orders from localStorage
      const savedOrders = localStorage.getItem('bitezOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-600';
      case 'preparing':
        return 'bg-blue-600';
      case 'ready':
        return 'bg-purple-600';
      case 'out for delivery':
        return 'bg-orange-600';
      case 'delivered':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getOrderProgress = (status) => {
    const statuses = {
      'pending': 25,
      'preparing': 50,
      'ready': 75,
      'out for delivery': 90,
      'delivered': 100,
      'cancelled': 0
    };
    return statuses[status.toLowerCase()] || 0;
  };

  const OrderTimeline = ({ status }) => {
    const steps = [
      { name: 'Order Placed', icon: '📝', key: 'pending' },
      { name: 'Preparing', icon: '👨‍🍳', key: 'preparing' },
      { name: 'Ready', icon: '✅', key: 'ready' },
      { name: 'Out for Delivery', icon: '🚴', key: 'out for delivery' },
      { name: 'Delivered', icon: '🎉', key: 'delivered' }
    ];

    const currentStatusIndex = steps.findIndex(step => step.key === status.toLowerCase());

    return (
      <div className="py-6">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-700 z-0">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
              style={{ width: `${getOrderProgress(status)}%` }}
            ></div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center z-10 relative">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110 shadow-lg shadow-orange-500/50' 
                      : 'bg-gray-800 border-2 border-gray-700'
                  } ${isCurrent ? 'animate-pulse' : ''}`}
                >
                  {step.icon}
                </div>
                <p className={`text-xs font-semibold text-center ${isCompleted ? 'text-orange-500' : 'text-gray-500'}`}>
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Track Your Orders 📦</h1>
            <p className="text-red-100 mt-1">Monitor your food delivery status</p>
          </div>
          <button
            onClick={() => navigate('/order')}
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 transition"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-orange-500 mb-4">Your Orders</h2>
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-gradient-to-br from-gray-900 to-black border-2 p-4 rounded-xl cursor-pointer transition transform hover:scale-105 ${
                    selectedOrder?.id === order.id 
                      ? 'border-orange-500 shadow-lg shadow-orange-500/30' 
                      : 'border-gray-700 hover:border-orange-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-white">Order #{order.id}</p>
                      <p className="text-gray-400 text-sm">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full text-white font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-orange-500 font-bold text-lg">₹{order.total}</p>
                  <p className="text-gray-400 text-sm mt-1">{order.items?.length || 0} items</p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-orange-500">Order #{selectedOrder.id}</h2>
                      <p className="text-gray-400 mt-1">{selectedOrder.date}</p>
                    </div>
                    <span className={`px-4 py-2 text-sm rounded-full text-white font-bold ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Timeline */}
                  {selectedOrder.status.toLowerCase() !== 'cancelled' && (
                    <OrderTimeline status={selectedOrder.status} />
                  )}

                  {selectedOrder.status.toLowerCase() === 'cancelled' && (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                      <p className="text-red-500 font-semibold">❌ This order has been cancelled</p>
                      <p className="text-gray-400 text-sm mt-1">Refund will be processed within 5-7 business days</p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-white">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-orange-500 font-bold">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h3 className="font-bold text-white mb-2">Delivery Information</h3>
                    <p className="text-gray-400 text-sm">{selectedOrder.deliveryAddress || 'Campus Hostel Block A, Room 204'}</p>
                    <p className="text-gray-400 text-sm mt-1">Phone: {user?.phone || 'Not provided'}</p>
                  </div>

                  {/* Total */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-white">Total Amount</span>
                      <span className="font-black text-orange-500 text-2xl">₹{selectedOrder.total}</span>
                    </div>
                  </div>

                  {/* Estimated Time */}
                  {selectedOrder.status.toLowerCase() !== 'delivered' && selectedOrder.status.toLowerCase() !== 'cancelled' && (
                    <div className="mt-6 bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg text-center">
                      <p className="text-white font-bold">Estimated Delivery Time</p>
                      <p className="text-2xl font-black text-white mt-1">{selectedOrder.estimatedTime || '25-30 mins'}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-gray-400 text-lg">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-12 text-center">
            <div className="text-8xl mb-6">🍽️</div>
            <h2 className="text-3xl font-bold text-white mb-4">No Orders Yet!</h2>
            <p className="text-gray-400 text-lg mb-6">You haven't placed any orders. Start ordering now!</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-red-700 hover:to-orange-700 transition shadow-lg shadow-red-500/50"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;