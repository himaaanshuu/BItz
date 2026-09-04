import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import ScrollReveal from '../components/ScrollReveal';
import { FileText, ChefHat, CheckCircle, Bike, PartyPopper, Package, UtensilsCrossed } from 'lucide-react';

const TrackOrder = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));

    if (!userData || !token || !hasAuthCookie) {
      navigate('/student-login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { orders: list } = await api.getOrdersMe();
        if (!cancelled)
          setOrders((list || []).map((o) => ({
            id: o._id,
            _id: o._id,
            date: o.createdAt ? new Date(o.createdAt).toLocaleString() : '',
            status: o.status || 'pending',
            total: o.total,
            items: o.items || [],
            deliveryAddress: o.deliveryAddress,
            tokenNumber: o.tokenNumber,
            canteen: o.canteenId?.name || 'Canteen',
          })));
      } catch (error) {
        if (!cancelled) console.error('Error loading orders:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-600';
      case 'preparing': return 'bg-blue-600';
      case 'ready': return 'bg-amber-600';
      case 'out for delivery': return 'bg-orange-600';
      case 'delivered': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getOrderProgress = (status) => {
    const statuses = { 'pending': 25, 'preparing': 50, 'ready': 75, 'out for delivery': 90, 'delivered': 100, 'cancelled': 0 };
    return statuses[status.toLowerCase()] || 0;
  };

  const OrderTimeline = ({ status }) => {
    const steps = [
      { name: 'Order Placed', icon: <FileText size={18} />, key: 'pending' },
      { name: 'Preparing', icon: <ChefHat size={18} />, key: 'preparing' },
      { name: 'Ready', icon: <CheckCircle size={18} />, key: 'ready' },
      { name: 'Out for Delivery', icon: <Bike size={18} />, key: 'out for delivery' },
      { name: 'Delivered', icon: <PartyPopper size={18} />, key: 'delivered' }
    ];

    const currentStatusIndex = steps.findIndex(step => step.key === status.toLowerCase());

    return (
      <div className="py-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-700 z-0">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getOrderProgress(status)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>

          {steps.map((step, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={step.key} className="flex flex-col items-center z-10 relative">
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110 shadow-lg shadow-orange-500/50'
                      : 'bg-gray-800 border-2 border-gray-700'
                  } ${isCurrent ? 'animate-pulse' : ''}`}
                >
                  {step.icon}
                </motion.div>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 glass-panel rounded-3xl mt-12"
        >
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80" alt="Loading burger" className="w-full h-full object-cover rounded-full animate-bounce shadow-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center animate-spin">
              <div className="w-5 h-5 border-t-2 border-orange-500 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">Tracking Order...</h2>
          <p className="text-gray-400 font-medium">Please wait while we fetch your details</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Track Your Orders</h1>
            <p className="text-red-100 mt-1">Monitor your food delivery status</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/order')}
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 transition"
          >
            ← Back
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-orange-500 mb-4">Your Orders</h2>
              {orders.map((order, i) => (
                <ScrollReveal key={order.id} variant="fadeRight" delay={0.05 * (i + 1)}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedOrder(order)}
                    className={`bg-gradient-to-br from-gray-900 to-black border-2 p-4 rounded-xl cursor-pointer transition ${
                      selectedOrder?.id === order.id
                        ? 'border-orange-500 shadow-lg shadow-orange-500/30'
                        : 'border-gray-700 hover:border-orange-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-white">Order #{order.tokenNumber ?? order.id}</p>
                        <p className="text-gray-400 text-sm">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full text-white font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-orange-500 font-bold text-lg">₹{order.total}</p>
                    <p className="text-gray-400 text-sm mt-1">{order.items?.length || 0} items</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-orange-500">Order #{selectedOrder.tokenNumber ?? selectedOrder.id}</h2>
                      <p className="text-gray-400 mt-1">{selectedOrder.date}</p>
                    </div>
                    <span className={`px-4 py-2 text-sm rounded-full text-white font-bold ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>

                  {selectedOrder.status.toLowerCase() !== 'cancelled' && (
                    <OrderTimeline status={selectedOrder.status} />
                  )}

                  {selectedOrder.status.toLowerCase() === 'cancelled' && (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                      <p className="text-red-500 font-semibold">❌ This order has been cancelled</p>
                      <p className="text-gray-400 text-sm mt-1">Refund will be processed within 5-7 business days</p>
                    </div>
                  )}

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-white">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 4 }}
                          className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-orange-500 font-bold">₹{item.price * item.quantity}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h3 className="font-bold text-white mb-2">Delivery Information</h3>
                    <p className="text-gray-400 text-sm">{selectedOrder.deliveryAddress || 'Campus Hostel Block A, Room 204'}</p>
                    <p className="text-gray-400 text-sm mt-1">Phone: {user?.phone || 'Not provided'}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-white">Total Amount</span>
                      <span className="font-black text-orange-500 text-2xl">₹{selectedOrder.total}</span>
                    </div>
                  </div>

                  {selectedOrder.status.toLowerCase() !== 'delivered' && selectedOrder.status.toLowerCase() !== 'cancelled' && (
                    <motion.div
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-6 bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg text-center"
                    >
                      <p className="text-white font-bold">Estimated Delivery Time</p>
                      <p className="text-2xl font-black text-white mt-1">{selectedOrder.estimatedTime || '25-30 mins'}</p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <Package size={32} className="text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ScrollReveal variant="scaleUp">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <UtensilsCrossed size={40} className="text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">No Orders Yet!</h2>
              <p className="text-gray-400 text-lg mb-6">You haven't placed any orders. Start ordering now!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/order')}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-red-700 hover:to-orange-700 transition shadow-lg shadow-red-500/50"
              >
                Browse Menu
              </motion.button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
