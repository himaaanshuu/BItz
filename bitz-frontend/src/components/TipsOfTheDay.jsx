import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const tips = [
  { title: 'Peak Hour Prep', tip: 'Pre-prep high-demand items 15 min before rush hours to reduce wait times.', icon: '⏰', category: 'Operations' },
  { title: 'Menu Engineering', tip: 'Place highest-margin items at the top. Customers order the first 3-4 items they see.', icon: '📋', category: 'Strategy' },
  { title: 'Combo Deals', tip: 'Bundle popular items with high-margin sides at a slight discount to boost order value.', icon: '🎁', category: 'Pricing' },
  { title: 'Fresh Stock First', tip: 'Rotate inventory so older stock gets used first. Cuts food waste by up to 30%.', icon: '📦', category: 'Waste' },
  { title: 'Social Proof', tip: 'Add "Most Ordered" badges. Students trust what others love — boosts sales 20-30%.', icon: '⭐', category: 'Marketing' },
  { title: 'Speed Wins', tip: 'Track prep time. Every minute shaved means more orders during peak hours.', icon: '⚡', category: 'Operations' },
  { title: 'Seasonal Specials', tip: 'Rotate limited-time items monthly. Scarcity creates urgency and repeat visits.', icon: '🌸', category: 'Strategy' },
  { title: 'Cost Tracking', tip: 'Log daily costs vs revenue. Know your exact cost per dish to price profitably.', icon: '💰', category: 'Finance' },
  { title: 'Feedback Loop', tip: 'Add 1-tap ratings after orders. A 4.5+ rating attracts significantly more students.', icon: '📊', category: 'Quality' },
  { title: 'Batch Cooking', tip: 'Cook popular items in batches during off-peak hours to cut labor costs.', icon: '🍳', category: 'Operations' },
  { title: 'Upsell Smartly', tip: '"Want extra cheese for ₹20?" Small upsells on high-margin extras raise revenue 15-25%.', icon: '🧠', category: 'Pricing' },
  { title: 'Data-Driven Menu', tip: 'Remove items selling <5/day. A smaller, focused menu reduces waste and speeds ops.', icon: '📈', category: 'Strategy' },
];

const categoryColors = {
  Operations: 'bg-emerald-500/15 text-emerald-400',
  Strategy: 'bg-blue-500/15 text-blue-400',
  Pricing: 'bg-purple-500/15 text-purple-400',
  Waste: 'bg-amber-500/15 text-amber-400',
  Marketing: 'bg-pink-500/15 text-pink-400',
  Finance: 'bg-cyan-500/15 text-cyan-400',
  Quality: 'bg-rose-500/15 text-rose-400',
};

const TipsOfTheDay = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setCurrentTip(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((currentTip - 1 + tips.length) % tips.length);
  const next = () => goTo((currentTip + 1) % tips.length);

  const tip = tips[currentTip];

  return (
    <div className="max-w-4xl mx-auto px-6 my-12">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/20">
        {/* Orange accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500" />

        <div className="px-6 py-5 flex items-center gap-5">
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30"
          >
            <Lightbulb size={20} className="text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-black text-white truncate">{tip.title}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${categoryColors[tip.category]}`}>
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-1">{tip.tip}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition"
            >
              <ChevronLeft size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition"
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="px-6 pb-3 flex items-center justify-center gap-1.5">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentTip ? 'w-6 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsOfTheDay;
