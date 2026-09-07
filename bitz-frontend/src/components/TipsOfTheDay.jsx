import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const tips = [
  { title: 'Peak Hour Prep', tip: 'Pre-prep high-demand items 15 min before rush hours to reduce wait times.', category: 'Operations' },
  { title: 'Menu Engineering', tip: 'Place highest-margin items at the top. Customers order the first 3-4 items they see.', category: 'Strategy' },
  { title: 'Combo Deals', tip: 'Bundle popular items with high-margin sides at a slight discount to boost order value.', category: 'Pricing' },
  { title: 'Fresh Stock First', tip: 'Rotate inventory so older stock gets used first. Cuts food waste by up to 30%.', category: 'Waste' },
  { title: 'Social Proof', tip: 'Add "Most Ordered" badges. Students trust what others love — boosts sales 20-30%.', category: 'Marketing' },
  { title: 'Speed Wins', tip: 'Track prep time. Every minute shaved means more orders during peak hours.', category: 'Operations' },
  { title: 'Seasonal Specials', tip: 'Rotate limited-time items monthly. Scarcity creates urgency and repeat visits.', category: 'Strategy' },
  { title: 'Cost Tracking', tip: 'Log daily costs vs revenue. Know your exact cost per dish to price profitably.', category: 'Finance' },
  { title: 'Feedback Loop', tip: 'Add 1-tap ratings after orders. A 4.5+ rating attracts significantly more students.', category: 'Quality' },
  { title: 'Batch Cooking', tip: 'Cook popular items in batches during off-peak hours to cut labor costs.', category: 'Operations' },
  { title: 'Upsell Smartly', tip: '"Want extra cheese for ₹20?" Small upsells on high-margin extras raise revenue 15-25%.', category: 'Pricing' },
  { title: 'Data-Driven Menu', tip: 'Remove items selling less than 5/day. A smaller menu reduces waste and speeds ops.', category: 'Strategy' },
];

const categoryColors = {
  Operations: 'bg-emerald-500 text-white',
  Strategy: 'bg-blue-500 text-white',
  Pricing: 'bg-purple-500 text-white',
  Waste: 'bg-amber-500 text-white',
  Marketing: 'bg-pink-500 text-white',
  Finance: 'bg-cyan-600 text-white',
  Quality: 'bg-rose-500 text-white',
};

const categoryBorders = {
  Operations: 'border-l-emerald-500',
  Strategy: 'border-l-blue-500',
  Pricing: 'border-l-purple-500',
  Waste: 'border-l-amber-500',
  Marketing: 'border-l-pink-500',
  Finance: 'border-l-cyan-500',
  Quality: 'border-l-rose-500',
};

const TipsOfTheDay = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <Lightbulb size={16} className="text-orange-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Tips to Boost Your Business</h3>
            <p className="text-xs text-slate-400 font-medium">Scroll for more</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="w-8 h-8 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center text-slate-600 transition"
          >
            <ChevronLeft size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="w-8 h-8 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center text-slate-600 transition"
          >
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`flex-shrink-0 w-[280px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden border-l-4 ${categoryBorders[tip.category]}`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black text-slate-800">{tip.title}</h4>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[tip.category]}`}>
                  {tip.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{tip.tip}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TipsOfTheDay;
