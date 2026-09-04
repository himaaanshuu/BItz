import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Search, ShoppingBag, Plus, Minus, Star, MapPin, Clock, ChevronRight } from 'lucide-react';

const foodItems = [
  {
    name: 'Classic Burger',
    price: '₹149',
    rating: '4.8',
    time: '12 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Margherita Pizza',
    price: '₹199',
    rating: '4.7',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Paneer Tikka',
    price: '₹179',
    rating: '4.9',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

const OrderUIMockup = () => {
  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text content */}
        <div className="space-y-8">
          <ScrollReveal variant="fadeLeft">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
                The Experience
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-tight">
                Ordering made{' '}
                <span className="text-gradient">effortless</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeLeft" delay={0.15}>
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              Browse your campus menu, customize your meal, and place your
              order in seconds. No queues. No waiting.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeLeft" delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {['Real-time tracking', 'Campus delivery', 'Secure payment'].map(
                (pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold border border-orange-100"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {pill}
                  </span>
                )
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Phone mockup */}
        <ScrollReveal variant="scaleUp" delay={0.2}>
          <div className="flex justify-center lg:justify-end">
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-[280px] rounded-[3rem] border-[6px] border-slate-800 bg-white shadow-2xl overflow-hidden"
              style={{ perspective: 800 }}
            >
              {/* Status bar */}
              <div className="bg-slate-800 px-6 pt-3 pb-2 flex justify-between items-center">
                <span className="text-white text-[10px] font-semibold">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3 h-2 rounded-sm bg-white/80" />
                  <div className="w-1 h-2 rounded-sm bg-white/80" />
                  <div className="w-3 h-2 rounded-sm bg-white/80" />
                </div>
              </div>

              {/* App header */}
              <div className="px-5 pt-4 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-black text-orange-500 tracking-tight">
                    BITEZ
                  </h3>
                  <ShoppingBag size={18} className="text-slate-400" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <MapPin size={12} className="text-orange-500" />
                  Campus Food Court
                </div>
              </div>

              {/* Search bar */}
              <div className="px-5 pt-4">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                  <Search size={14} className="text-slate-400" />
                  <span className="text-xs text-slate-400">Search food...</span>
                </div>
              </div>

              {/* Popular near you */}
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs font-bold text-slate-800 mb-3">
                  Popular near you
                </p>
                <div className="space-y-3">
                  {foodItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-orange-500">
                            {item.price}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-slate-400">
                            <Star size={8} className="fill-orange-400 text-orange-400" />
                            {item.rating}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-slate-400">
                            <Clock size={8} />
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <button className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <Plus size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom order bar */}
              <div className="px-5 py-4 mt-2 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Your Order
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      ₹328{' '}
                      <span className="text-[10px] font-medium text-slate-400">
                        (2 items)
                      </span>
                    </p>
                  </div>
                  <button className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl">
                    Place Order <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default OrderUIMockup;
