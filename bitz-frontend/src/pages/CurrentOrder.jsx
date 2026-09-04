import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, MapPin, Phone, ChefHat, Check, PartyPopper, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';

const CurrentOrder = () => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('preparing');

  useEffect(() => {
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    if (!token || !hasAuthCookie) {
      navigate('/student-login');
      return;
    }

    const storedOrder = localStorage.getItem('bitezCurrentOrder');
    if (storedOrder) {
      setCurrentOrder(JSON.parse(storedOrder));
    } else {
      const mockOrder = {
        id: 4, date: '2024-01-19', time: '1:45 PM', canteen: 'Main Cafeteria',
        location: 'Ground Floor, Building A', phone: '+91 98765 43210',
        items: [{ name: 'Veg Burger', quantity: 1, price: 60 }, { name: 'Cold Coffee', quantity: 1, price: 50 }],
        total: 110, estimatedTime: 12, queueNumber: 3
      };
      setCurrentOrder(mockOrder);
      localStorage.setItem('bitezCurrentOrder', JSON.stringify(mockOrder));
    }
  }, [navigate]);

  const getProgressPercentage = () => {
    switch (orderStatus) {
      case 'preparing': return 33;
      case 'ready': return 66;
      case 'completed': return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Live Order Tracker</h1>
            <p className="text-slate-500 font-medium">Watch your culinary delight come to life</p>
          </div>
        </ScrollReveal>

        {!currentOrder ? (
          <ScrollReveal variant="scaleUp">
            <div className="glass-panel rounded-[2.5rem] p-16 text-center border border-white shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                <Package size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-2">No Active Orders</h3>
              <p className="text-slate-500 font-medium mb-8">You don't have any orders in progress right now</p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/order')}
                className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl shadow-orange-600/30 transition-all shadow-lg flex items-center gap-3 mx-auto"
              >
                Start Ordering
              </motion.button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-6">
            {/* Order Status Card */}
            <ScrollReveal variant="fadeUp">
              <div className="glass bg-slate-900/95 rounded-[2.5rem] p-10 text-white shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-orange-500/30 rounded-full filter blur-[80px]" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-10">
                  <div>
                    <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                      Order #{currentOrder.id}
                      <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-white/80 font-bold tracking-widest uppercase">Live</span>
                    </h2>
                    <p className="text-orange-200/80 font-semibold tracking-wider text-sm mt-1 uppercase">Queue Position: <span className="text-white font-black text-lg">#{currentOrder.queueNumber}</span></p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white text-orange-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Clock size={20} className="animate-pulse" />
                    ~{currentOrder.estimatedTime} min left
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 relative z-10">
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                      className="bg-orange-500 h-full rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="flex justify-between mt-6 relative">
                    <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10" />

                    {[
                      { label: 'Preparing', icon: <ChefHat size={24} />, active: ['preparing', 'ready', 'completed'].includes(orderStatus) },
                      { label: 'Ready', icon: <CheckCircle size={24} />, active: ['ready', 'completed'].includes(orderStatus) },
                      { label: 'Served', icon: <Check size={24} strokeWidth={3} />, active: orderStatus === 'completed', green: orderStatus === 'completed' },
                    ].map((step, i) => (
                      <div key={i} className="text-center w-1/3">
                        <motion.div
                          animate={step.active ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-500 transform ${
                            step.active
                              ? `${step.green ? 'bg-emerald-500' : 'bg-orange-500'} text-white scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)]`
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {step.icon}
                        </motion.div>
                        <p className={`text-sm font-bold tracking-wider uppercase ${step.active ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Message */}
                <motion.div
                  key={orderStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-white/10 relative z-10"
                >
                  <p className="text-lg font-bold tracking-wide flex items-center justify-center gap-2">
                    {orderStatus === 'preparing' && <><ChefHat className="animate-bounce" /> Your order is being masterfully prepared...</>}
                    {orderStatus === 'ready' && <><CheckCircle className="text-emerald-400" /> Action required: Your delicious order is ready for pickup!</>}
                    {orderStatus === 'completed' && <><PartyPopper className="text-amber-400" /> Order completed! Enjoy your amazing meal!</>}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Canteen Details */}
              <ScrollReveal variant="fadeLeft" delay={0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-[2rem] p-8 border border-white shadow-lg h-full"
                >
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><MapPin size={18} /></div>
                    Pickup Location
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Package size={20} />, label: 'Canteen', value: currentOrder.canteen },
                      { icon: <MapPin size={20} />, label: 'Directions', value: currentOrder.location },
                      { icon: <Phone size={20} />, label: 'Contact', value: currentOrder.phone },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">{item.icon}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className="font-bold text-slate-700">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Order Items */}
              <ScrollReveal variant="fadeRight" delay={0.2}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-[2rem] p-8 border border-white shadow-lg flex flex-col h-full"
                >
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-xl"><ShoppingBag size={18} /></div>
                    Order Details
                  </h3>
                  <div className="flex-1 space-y-3 overflow-y-auto pr-2 mb-6 max-h-[260px]">
                    {currentOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white/60 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100 font-black">
                            {item.quantity}x
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.name}</p>
                          </div>
                        </div>
                        <p className="font-black text-slate-800">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5 border-t border-slate-200">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
                      <span className="text-3xl font-black text-orange-600">₹{currentOrder.total}</span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Demo Status Buttons */}
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="glass-panel rounded-2xl p-4 border border-dashed border-slate-300 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">Developer Tools</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { status: 'preparing', label: 'Set Preparing', color: 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200' },
                    { status: 'ready', label: 'Set Ready', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-200' },
                    { status: 'completed', label: 'Set Completed', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-200' },
                  ].map((btn) => (
                    <motion.button
                      key={btn.status}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOrderStatus(btn.status)}
                      className={`${btn.color} px-4 py-2 rounded-xl font-bold text-sm transition-colors border`}
                    >
                      {btn.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentOrder;
