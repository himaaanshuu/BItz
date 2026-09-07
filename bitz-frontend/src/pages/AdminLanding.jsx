import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { BarChart3, Package, UtensilsCrossed, Clock, ChevronRight, ShieldCheck, ArrowLeft, Settings, Users, DollarSign, Sparkles, TrendingUp, Zap, Bell } from 'lucide-react';

const AdminLanding = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const features = [
    { icon: <BarChart3 size={32} className="text-orange-500" />, title: 'Real-time Dashboard', desc: 'Monitor all orders, revenue, and performance at a glance with live analytics.', color: 'from-orange-500 to-amber-500' },
    { icon: <UtensilsCrossed size={32} className="text-rose-500" />, title: 'Menu Management', desc: 'Add, edit, and toggle menu items. Set prices, categories, and availability instantly.', color: 'from-rose-500 to-pink-500' },
    { icon: <Package size={32} className="text-emerald-500" />, title: 'Order Tracking', desc: 'Manage incoming orders, update preparation status, and notify students when ready.', color: 'from-emerald-500 to-teal-500' },
  ];

  const steps = [
    { icon: <ShieldCheck size={24} />, title: 'Login', desc: 'Secure admin login with email, password & OTP' },
    { icon: <Settings size={24} />, title: 'Setup', desc: 'Configure your canteen profile, timings & contact' },
    { icon: <UtensilsCrossed size={24} />, title: 'Manage Menu', desc: 'Add items, set prices, upload images' },
    { icon: <BarChart3 size={24} />, title: 'Track Orders', desc: 'Accept orders, update status, view analytics' },
  ];

  const stats = [
    { icon: <Package size={24} />, value: 'Live', label: 'Order Tracking', color: 'text-emerald-500' },
    { icon: <DollarSign size={24} />, value: 'Real-time', label: 'Revenue Data', color: 'text-orange-500' },
    { icon: <Users size={24} />, value: '24/7', label: 'Dashboard Access', color: 'text-rose-500' },
    { icon: <Clock size={24} />, value: 'Instant', label: 'Menu Updates', color: 'text-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative overflow-hidden">
      {/* Animated Background Decorators */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Floating grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full font-bold text-sm text-slate-600 hover:text-orange-600 border border-white/20 shadow-sm transition"
          >
            <ArrowLeft size={16} />
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin-login')}
            className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition shadow-lg"
          >
            Admin Login
          </motion.button>
        </div>
      </div>

      {/* Hero */}
      <motion.div
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-sm"
              animate={{ boxShadow: ['0 0 0 0 rgba(30,41,59,0)', '0 0 0 8px rgba(30,41,59,0.08)', '0 0 0 0 rgba(30,41,59,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Admin Portal
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Manage Your<br />
              <motion.span
                className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Canteen Like a Pro
              </motion.span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.4}>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Complete control over your canteen operations. Track orders, manage menus, and monitor analytics in one powerful dashboard.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -12px rgba(30,41,59,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/admin-login')}
                className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-slate-700"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Admin Login
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('admin-features')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-slate-400 transition shadow-sm relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-slate-50"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                  Explore Features
                </span>
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 bg-slate-100 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform relative z-10`}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-xl font-black text-slate-800 relative z-10">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Features */}
      <div id="admin-features" className="max-w-7xl mx-auto px-6 mt-16 mb-20">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.div
              className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={16} />
              POWERFUL TOOLS
              <Zap size={16} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Everything You <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Powerful tools to manage your canteen efficiently and grow your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.15 * (i + 1)}>
              <motion.div
                whileHover={{ y: -12, boxShadow: '0 30px 60px -15px rgba(30, 41, 59, 0.15)' }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm transition-all group h-full relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all relative z-10"
                >
                  {f.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 relative z-10">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium relative z-10">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <TrendingUp size={16} />
              SIMPLE PROCESS
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              How It <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Works</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 opacity-10" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.1 + i * 0.12}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
                >
                  {step.icon}
                </motion.div>
                <motion.div
                  className="text-sm font-black text-slate-400 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  Step {i + 1}
                </motion.div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Feature Highlight Cards */}
      <div className="max-w-5xl mx-auto px-6 my-20">
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Bell size={28} />, title: 'Instant Notifications', desc: 'Get alerted the moment a new order comes in. Never miss an order again.', gradient: 'from-orange-500 to-rose-500' },
              { icon: <TrendingUp size={28} />, title: 'Revenue Analytics', desc: 'Track daily, weekly, and monthly revenue with beautiful charts and insights.', gradient: 'from-slate-800 to-slate-600' },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${card.gradient} p-8 text-white shadow-xl`}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/30">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-3">{card.title}</h3>
                  <p className="text-white/80 font-medium">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black px-6 py-24 text-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{ top: `${15 + i * 15}%`, left: `${10 + i * 15}%` }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1], y: [0, -20, 0] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}

            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                className="text-5xl mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏪
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-white/70 font-medium mb-10">
                Contact us to set up your canteen admin account and start managing orders today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/admin-login')}
                className="bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xl hover:bg-slate-100 transition-colors shadow-2xl"
              >
                Admin Login
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AdminLanding;
