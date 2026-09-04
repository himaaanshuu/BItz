import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 py-40 px-6 text-white overflow-hidden">
      {/* Decorative floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6">
            Your food is waiting.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xl text-white/80 mb-12">
            Stop standing in line. Start enjoying your break.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            Order with Bitez
            <ArrowRight size={22} />
          </motion.button>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <p className="text-2xl font-black tracking-tight mb-2">bitez</p>
            <p className="text-white/60 text-sm">Skip the queue and savor the flavor.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
