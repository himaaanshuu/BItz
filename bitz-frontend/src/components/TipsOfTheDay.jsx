import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const tips = [
  {
    title: 'Peak Hour Prep',
    tip: 'Pre-prep high-demand items 15 minutes before peak hours. This reduces wait times and increases customer satisfaction during rush periods.',
    icon: '⏰',
    category: 'Operations',
  },
  {
    title: 'Menu Engineering',
    tip: 'Place your highest-margin items at the top of the menu. Customers tend to order the first 3-4 items they see. Make those your profit winners.',
    icon: '📋',
    category: 'Strategy',
  },
  {
    title: 'Combo Deals',
    tip: 'Bundle a popular item with a high-margin side dish at a slight discount. Students love deals, and you move more inventory while boosting average order value.',
    icon: '🎁',
    category: 'Pricing',
  },
  {
    title: 'Fresh Stock First',
    tip: 'Rotate inventory so older stock gets used first. Label prep containers with dates. This cuts food waste by up to 30% and saves real money.',
    icon: '📦',
    category: 'Waste Reduction',
  },
  {
    title: 'Social Proof',
    tip: 'Display "Most Ordered" and "Staff Pick" badges on your menu. Students trust what others love. These labels can boost item sales by 20-30%.',
    icon: '⭐',
    category: 'Marketing',
  },
  {
    title: 'Speed Wins',
    tip: 'Track your average order preparation time. Every minute you shave off prep time means more orders during peak hours and happier customers.',
    icon: '⚡',
    category: 'Operations',
  },
  {
    title: 'Seasonal Specials',
    tip: 'Rotate limited-time seasonal items monthly. Scarcity creates urgency. "Available only this week" drives impulse orders and repeat visits.',
    icon: '🌸',
    category: 'Strategy',
  },
  {
    title: 'Cost Tracking',
    tip: 'Log daily ingredient costs and compare against revenue. Small cost leaks add up fast. Know your exact cost per dish to price profitably.',
    icon: '💰',
    category: 'Finance',
  },
  {
    title: 'Feedback Loop',
    tip: 'Add a quick 1-tap rating after each order. Use low ratings to identify problems fast. A 4.5+ rating attracts significantly more students.',
    icon: '📊',
    category: 'Quality',
  },
  {
    title: 'Batch Cooking',
    tip: 'Cook popular items in batches during off-peak hours. This reduces labor costs during rush periods and ensures consistent food quality.',
    icon: '🍳',
    category: 'Operations',
  },
  {
    title: 'Upsell Smartly',
    tip: 'Train staff to suggest add-ons: "Want extra cheese for ₹20?" Small upsells on high-margin extras can increase revenue by 15-25% per order.',
    icon: '🧠',
    category: 'Pricing',
  },
  {
    title: 'Data-Driven Menu',
    tip: 'Remove items that sell less than 5 per day. Focus on your top performers. A smaller, focused menu reduces waste and speeds up operations.',
    icon: '📈',
    category: 'Strategy',
  },
];

const TipsOfTheDay = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);
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
    <div className="max-w-5xl mx-auto px-6 my-16">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-1 shadow-2xl shadow-slate-900/20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.3rem] p-8 md:p-12 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25"
              >
                <Lightbulb size={24} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-black text-white">Tip of the Day</h3>
                <p className="text-slate-400 text-sm font-medium">Boost your canteen business</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* Tip Content */}
          <div className="relative z-10 min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl flex-shrink-0 mt-1"
                  >
                    {tip.icon}
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-black text-orange-400 uppercase tracking-wider bg-orange-400/10 px-3 py-1 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-3">{tip.title}</h4>
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">{tip.tip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="relative z-10 flex items-center justify-center gap-2 mt-8">
            {tips.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentTip
                    ? 'w-8 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Tip counter */}
          <div className="relative z-10 text-center mt-4">
            <p className="text-slate-500 text-xs font-medium">
              {currentTip + 1} of {tips.length} tips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsOfTheDay;
