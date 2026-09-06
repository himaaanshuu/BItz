import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';
import { Zap, MapPin, CreditCard } from 'lucide-react';

const Home = () => {
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
    { icon: <MapPin size={32} className="text-rose-500" />, title: 'Live Tracking', desc: 'Get real-time push notifications the moment your chef starts preparing your delicious food.' },
    { icon: <CreditCard size={32} className="text-emerald-500" />, title: 'One-Tap Pay', desc: 'Securely link your campus card or standard payment methods for lightning-fast checkouts.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative overflow-hidden">
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

      <motion.div
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-200 text-orange-600 font-semibold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Now Coming Soon to Your Campus
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
                className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 hover:shadow-2xl"
              >
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/order')}
                className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-orange-500 hover:text-orange-600 transition shadow-sm hover:shadow-md"
              >
                Browse Menu
              </motion.button>
            </div>
          </ScrollReveal>


        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-40 mb-20">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Why Choose <span className="text-gradient">Bitez</span>?
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              We've redesigned the campus dining experience from the ground up to save you time and keep you energized.
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
                <p className="text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 my-32">
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 px-6 py-24 text-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>

            <motion.div
              className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />

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

export default Home;
