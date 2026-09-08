import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';
import { GraduationCap, Store, ArrowRight, Utensils, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative overflow-hidden">
      {/* Background Decorators */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-200 text-orange-600 font-semibold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Campus Food Ordering Platform
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Welcome to<br />
              <span className="text-gradient">Bitez</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.4}>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Choose how you want to use Bitez. Order food as a student or manage your canteen as an admin.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <ScrollReveal variant="fadeRight" delay={0.2}>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/student-landing')}
              className="cursor-pointer group relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 p-10 text-white shadow-2xl shadow-orange-500/20"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              <motion.div
                className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center mb-8 border border-white/30 group-hover:scale-110 transition-transform">
                  <GraduationCap size={40} />
                </div>

                <h2 className="text-4xl font-black mb-4">I'm a Student</h2>
                <p className="text-white/80 text-lg font-medium mb-8 leading-relaxed">
                  Order your favorite meals ahead of time. Skip long queues and pick up hot food exactly when you're ready.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: <Utensils size={18} />, text: 'Browse campus canteen menus' },
                    { icon: <Utensils size={18} />, text: 'Order with one-tap payment' },
                    { icon: <Utensils size={18} />, text: 'Track your order in real-time' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 font-medium">
                      <div className="bg-white/20 p-1.5 rounded-lg">{item.icon}</div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg group-hover:shadow-xl transition-all"
                >
                  Student Login
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Admin Card */}
          <ScrollReveal variant="fadeLeft" delay={0.3}>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin-landing')}
              className="cursor-pointer group relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black p-10 text-white shadow-2xl shadow-slate-900/30"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              <motion.div
                className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />

              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform">
                  <Store size={40} />
                </div>

                <h2 className="text-4xl font-black mb-4">I'm an Admin</h2>
                <p className="text-white/80 text-lg font-medium mb-8 leading-relaxed">
                  Manage your canteen operations. Track orders, update menus, and monitor analytics in real-time.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: <ShieldCheck size={18} />, text: 'Manage menu & availability' },
                    { icon: <ShieldCheck size={18} />, text: 'Track live orders & status' },
                    { icon: <ShieldCheck size={18} />, text: 'View analytics & revenue' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 font-medium">
                      <div className="bg-white/10 p-1.5 rounded-lg">{item.icon}</div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg group-hover:shadow-xl transition-all"
                >
                  Admin Login
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Engagement Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 'Freshly Made', label: 'Coming for your love' },
              { value: 'Zero Wait', label: 'Waiting for your order' },
              { value: 'Just For You', label: 'Curated with care' },
              { value: 'Always Ready', label: 'Waiting for your visit' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="text-center p-6 glass rounded-2xl border border-white/60"
              >
                <p className="text-xl font-black text-orange-600">{stat.value}</p>
                <p className="text-sm font-bold text-slate-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Home;
