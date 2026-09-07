import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import BiteNinja from '../components/BiteNinja';
import { Zap, MapPin, CreditCard, ChevronRight, ArrowLeft, Utensils, Clock, Smartphone, Gamepad2, Sparkles, Star, Flame, Timer, Trophy } from 'lucide-react';

const floatingEmojis = ['🍕', '🍔', '🌮', '🍣', '🍜', '🍩', '🍦', '🧁', '🍰', '🧋'];

const StudentLanding = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const features = [
    { icon: <Zap size={32} className="text-orange-500" />, title: 'Zero Wait Time', desc: 'Pre-order from your classroom. Just show your digital receipt and grab your meal instantly.', color: 'from-orange-500 to-amber-500' },
    { icon: <MapPin size={32} className="text-rose-500" />, title: 'Live Tracking', desc: 'Get real-time notifications the moment your chef starts preparing your delicious food.', color: 'from-rose-500 to-pink-500' },
    { icon: <CreditCard size={32} className="text-emerald-500" />, title: 'One-Tap Pay', desc: 'Securely pay with UPI, Card, or Cash on pickup for lightning-fast checkouts.', color: 'from-emerald-500 to-teal-500' },
  ];

  const steps = [
    { icon: <Smartphone size={24} />, title: 'Login', desc: 'Sign in with your phone number via OTP' },
    { icon: <Utensils size={24} />, title: 'Order', desc: 'Browse menu and add items to your cart' },
    { icon: <CreditCard size={24} />, title: 'Pay', desc: 'Complete payment with your preferred method' },
    { icon: <Clock size={24} />, title: 'Pickup', desc: 'Get notified when ready and collect your order' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative overflow-hidden">
      {/* Animated Background Decorators */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating Food Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-10"
            style={{
              left: `${10 + (i * 9) % 80}%`,
              top: `${5 + (i * 13) % 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

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
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGame(true)}
              className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25"
            >
              <Gamepad2 size={16} />
              Play
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/student-login')}
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition"
            >
              Student Login
            </motion.button>
          </div>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-200 text-orange-600 font-semibold text-sm"
              animate={{ boxShadow: ['0 0 0 0 rgba(249,115,22,0)', '0 0 0 8px rgba(249,115,22,0.1)', '0 0 0 0 rgba(249,115,22,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Student Portal
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Skip The Queue.<br />
              <motion.span
                className="text-gradient inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Savor The Flavor.
              </motion.span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.4}>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Order your favorite meals ahead of time. Pick them up exactly when they're hot and ready.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -12px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/student-login')}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Start Ordering
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowGame(true)}
                className="group flex items-center justify-center gap-3 bg-yellow-400 text-yellow-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-yellow-300"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Gamepad2 size={20} />
                  Play Bite Ninja
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Stats with animated counters */}
      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2,000+', label: 'Students', icon: <Star size={20} /> },
              { value: '15+', label: 'Menu Items', icon: <Utensils size={20} /> },
              { value: '1', label: 'Canteen', icon: <Flame size={20} /> },
              { value: '4.8', label: 'Rating', icon: <Trophy size={20} /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="text-center p-6 glass rounded-2xl border border-white/60 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform relative z-10">
                  {stat.icon}
                </div>
                <p className="text-3xl font-black text-orange-600 relative z-10">{stat.value}</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-2 relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Features with enhanced animations */}
      <div className="max-w-7xl mx-auto px-6 mt-16 mb-20">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.div
              className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm mb-4"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} />
              WHY CHOOSE US
              <Sparkles size={16} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Why Choose <span className="text-gradient">Bitez</span>?
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              We've redesigned the campus dining experience from the ground up to save you time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.15 * (i + 1)}>
              <motion.div
                whileHover={{ y: -12, boxShadow: '0 30px 60px -15px rgba(249, 115, 22, 0.2)' }}
                className="glass p-10 rounded-3xl transition-all group h-full relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all relative z-10"
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

      {/* How It Works with animated steps */}
      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Timer size={16} />
              SIMPLE PROCESS
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 opacity-20" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.1 + i * 0.12}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25 relative z-10"
                >
                  {step.icon}
                </motion.div>
                <motion.div
                  className="text-sm font-black text-orange-500 mb-2"
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

      {/* Game Promo Banner */}
      <div className="max-w-5xl mx-auto px-6 my-16">
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 p-1"
          >
            <div className="bg-white rounded-[2.3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                  <Gamepad2 size={24} className="text-orange-500" />
                  <span className="text-sm font-black text-orange-500 uppercase tracking-wider">Mini Game</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-3">
                  Bite Ninja
                </h3>
                <p className="text-slate-500 font-medium mb-6">
                  Slice flying food, avoid bombs, and chase the high score while you wait for your order!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGame(true)}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/25 hover:shadow-xl transition"
                >
                  Play Now
                </motion.button>
              </div>
              <div className="flex gap-3 text-5xl">
                {['🍕', '🍔', '🌮', '🍩', '🍣'].map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 px-6 py-24 text-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

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
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍕
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to ditch the queue?
              </h2>
              <p className="text-xl text-white/80 font-medium mb-10">
                Join thousands of students who have already upgraded their campus dining experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/student-login')}
                  className="bg-white text-orange-600 px-10 py-5 rounded-full font-black text-xl hover:bg-orange-50 transition-colors shadow-2xl"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGame(true)}
                  className="bg-white/20 text-white px-8 py-5 rounded-full font-black text-xl hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
                >
                  <span className="flex items-center gap-2">
                    <Gamepad2 size={22} />
                    Play Game
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* BiteNinja Game Modal */}
      <AnimatePresence>
        {showGame && <BiteNinja onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default StudentLanding;
