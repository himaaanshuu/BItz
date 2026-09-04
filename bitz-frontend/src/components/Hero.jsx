import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const headingLines = [
  { text: 'SKIP', gradient: true },
  { text: 'THE QUEUE.', gradient: false },
  { text: 'SAVOR', gradient: true },
  { text: 'THE FLAVOR.', gradient: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const floatAnimation = (duration, delay = 0) => ({
  animate: {
    y: [-6, 6, -6],
    rotate: [-1, 1, -1],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="min-h-screen bg-[#FAFAFA] flex items-center relative overflow-hidden">
      {/* Decorative Blurred Circles */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-rose-200/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-20 left-1/4 w-[350px] h-[350px] rounded-full bg-amber-100/30 blur-3xl pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="flex flex-col gap-8 pt-24 lg:pt-0">
          {/* Heading */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
          >
            {headingLines.map((line, i) => (
              <motion.span
                key={line.text}
                variants={wordVariants}
                className={`block ${line.gradient ? 'text-gradient' : 'text-slate-900'}`}
              >
                {line.text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-slate-500 max-w-md leading-relaxed"
          >
            Your campus food, without the campus queue.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249,115,22,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-orange-500/25 transition-shadow"
            >
              Order Now
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#f97316' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/order')}
              className="flex items-center gap-2.5 bg-white text-slate-800 px-8 py-4 rounded-full font-bold text-base border-2 border-slate-200 hover:border-orange-400 transition-colors"
            >
              Explore Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Food Visual Composition */}
        <motion.div
          style={{ y: parallaxY }}
          className="relative h-[420px] md:h-[520px] lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:w-[500px] lg:h-[520px]"
        >
          {/* Main Food Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              {...floatAnimation(6, 0)}
              className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/10 border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop"
                alt="Delicious burger"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Floating Order Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            {...floatAnimation(5, 1)}
            className="absolute top-4 left-0 md:left-4 glass-strong rounded-2xl p-4 shadow-xl z-20"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Your Order
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-bold text-slate-800">Ready Soon</p>
            </div>
          </motion.div>

          {/* Burger Price Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            {...floatAnimation(4.5, 2)}
            className="absolute bottom-16 right-4 md:right-0 bg-white rounded-full px-4 py-2 shadow-lg border border-slate-100 z-20"
          >
            <p className="text-sm font-bold text-slate-800">
              Burger{' '}
              <span className="text-orange-500">₹129</span>
            </p>
          </motion.div>

          {/* Fries Price Chip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            {...floatAnimation(5.5, 3)}
            className="absolute bottom-28 left-8 md:left-2 bg-white rounded-full px-4 py-2 shadow-lg border border-slate-100 z-20"
          >
            <p className="text-sm font-bold text-slate-800">
              Fries{' '}
              <span className="text-orange-500">₹49</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
