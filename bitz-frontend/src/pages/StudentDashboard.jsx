import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { UtensilsCrossed, MapPin, Settings, FileText, Utensils } from 'lucide-react';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = localStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));

    if (!userData || !token || !hasAuthCookie) {
      alert('No user data found. Please login first.');
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      const savedOrders = sessionStorage.getItem('bitezOrders') || localStorage.getItem('bitezOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      alert('Error loading user data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bitezAuthToken');
    localStorage.removeItem('bitezUser');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    alert('Logged out successfully!');
    setUser(null);
    navigate('/student-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 glass-panel rounded-3xl"
        >
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80" alt="Loading burger" className="w-full h-full object-cover rounded-full animate-bounce shadow-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center animate-spin">
              <div className="w-5 h-5 border-t-2 border-orange-500 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-800">Loading your taste profile...</h2>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-10 glass rounded-3xl max-w-sm w-full mx-4 shadow-xl border border-white"
        >
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-2xl mx-auto mb-6 flex justify-center items-center">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <p className="text-2xl font-black text-slate-800 mb-2">Access Denied</p>
          <p className="text-slate-500 font-medium border-b border-slate-200 pb-6 mb-6">You need to log in to view this page.</p>
          <button onClick={() => navigate('/auth')} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg w-full">
            Log In Now
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative">
      {/* Background Decorators */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Header Profile Section */}
      <ScrollReveal variant="fadeDown">
        <div className="relative z-10 pt-10 pb-20 px-6 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-400 to-rose-500 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-orange-500/20 rotate-3"
              >
                {user.name?.charAt(0) || 'S'}
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome, {user.name}</h1>
                <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full text-sm font-bold border border-orange-200">Student</span>
                  ID: {user.studentId || 'Not assigned'}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, x: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="group flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-2.5 rounded-full font-bold hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 -mt-10 relative z-10">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              onClick: () => navigate('/order'),
              gradient: 'bg-gradient-to-br from-orange-500 to-rose-500',
              icon: <UtensilsCrossed size={24} className="text-white" />,
              title: 'Order Food',
              desc: 'Skip the queue & eat fresh',
              textColor: 'text-white',
              whiteCard: false,
            },
            {
              onClick: () => navigate('/track'),
              gradient: 'bg-white',
              icon: <MapPin size={24} className="text-orange-500" />,
              title: 'Track Orders',
              desc: 'View live order status',
              textColor: 'text-slate-800',
              whiteCard: true,
            },
            {
              onClick: () => navigate('/profile'),
              gradient: 'bg-white',
              icon: <Settings size={24} className="text-orange-500" />,
              title: 'My Profile',
              desc: 'Manage details & wallet',
              textColor: 'text-slate-800',
              whiteCard: true,
            },
          ].map((card, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.1 * (i + 1)}>
              <motion.div
                whileHover={{ y: -6 }}
                onClick={card.onClick}
                className={`group ${card.gradient} p-8 rounded-[2rem] transition-all shadow-lg hover:shadow-xl border ${card.whiteCard ? 'border-slate-100' : 'border-transparent'} cursor-pointer relative overflow-hidden h-full`}
              >
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/30">
                  {card.icon}
                </div>
                <h3 className={`text-2xl font-black mb-2 ${card.textColor}`}>{card.title}</h3>
                <p className={`${card.whiteCard ? 'text-slate-500' : 'text-white/80'} font-medium`}>{card.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-full">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-black text-slate-800">Recent Orders</h2>
                <button className="text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-1.5 rounded-full">View All</button>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="group flex items-center justify-between p-5 rounded-2xl border border-transparent hover:border-orange-100 hover:bg-orange-50/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-200 group-hover:border-orange-200">
                          <FileText size={20} className="text-slate-400 group-hover:text-orange-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">Order #{order.id}</p>
                          <p className="text-slate-400 text-sm font-medium">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-900 font-bold block mb-1">₹{order.total}</p>
                        <span className={`inline-block px-3 py-1 text-xs rounded-full font-bold
                          ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}
                        `}>
                          {order.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                    <Utensils size={32} className="text-slate-300" />
                  </div>
                  <p className="text-slate-800 font-bold text-xl mb-2">No orders yet!</p>
                  <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto">Your tummy is calling. Why not treat yourself to something delicious?</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/order')}
                    className="inline-block bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition cursor-pointer shadow-lg"
                  >
                    Start an Order
                  </motion.button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* User Info Card */}
          <ScrollReveal variant="fadeRight" delay={0.3} className="lg:col-span-1">
            <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full mix-blend-overlay -translate-y-10 translate-x-10 pointer-events-none" />

              <h2 className="text-xl font-bold mb-8 text-orange-400">Account Details</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-semibold text-lg text-slate-100 break-all">{user.email || 'N/A'}</p>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="font-semibold text-lg text-slate-100">{user.phone || 'N/A'}</p>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Member Status</p>
                  <div className="inline-flex mt-1 items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active Student
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
