import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { Zap, MapPin, CreditCard, ChevronRight, ShieldCheck, ArrowLeft, Utensils, Clock, Smartphone } from 'lucide-react';

const StudentLanding = () => {
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
    { icon: <Zap size={32} className="text-orange-500" />, title: 'Zero Wait Time', desc: 'Pre-order from your classroom. Just show your digital receipt and grab your meal instantly.' },
    { icon: <MapPin size={32} className="text-rose-500" />, title: 'Live Tracking', desc: 'Get real-time notifications the moment your chef starts preparing your delicious food.' },
    { icon: <CreditCard size={32} className="text-emerald-500" />, title: 'One-Tap Pay', desc: 'Securely pay with UPI, Card, or Cash on pickup for lightning-fast checkouts.' },
  ];

  const steps = [
    { icon: <Smartphone size={24} />, title: 'Login', desc: 'Sign in with your phone number via OTP' },
    { icon: <Utensils size={24} />, title: 'Order', desc: 'Browse menu and add items to your cart' },
    { icon: <CreditCard size={24} />, title: 'Pay', desc: 'Complete payment with your preferred method' },
    { icon: <Clock size={24} />, title: 'Pickup', desc: 'Get notified when ready and collect your order' },
  ];

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

      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
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
            onClick={() => navigate('/student-login')}
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition"
          >
            Student Login
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-200 text-orange-600 font-semibold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Student Portal
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.25}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Skip The Queue.<br />
              <span className="text-gradient">Savor The Flavor.</span>
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/student-login')}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-500/25 transition"
              >
                Start Ordering
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-orange-500 hover:text-orange-600 transition shadow-sm"
              >
                How It Works
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 mt-32 mb-20">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-20">
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
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.15)' }}
                className="glass p-10 rounded-3xl transition-all group h-full"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Get your food in 4 simple steps
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.1 + i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-orange-500 mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 px-6 py-24 text-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            <motion.div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full" animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to ditch the queue?
              </h2>
              <p className="text-xl text-white/80 font-medium mb-10">
                Join thousands of students who have already upgraded their campus dining experience.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/student-login')}
                className="bg-white text-orange-600 px-10 py-5 rounded-full font-black text-xl hover:bg-orange-50 transition-colors shadow-2xl"
              >
                Get Started Free
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default StudentLanding;
