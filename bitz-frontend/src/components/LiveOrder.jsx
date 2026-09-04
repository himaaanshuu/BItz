import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { CheckCircle, ChefHat, Package, Bike } from 'lucide-react';

const steps = [
  { icon: CheckCircle, label: 'Order Placed' },
  { icon: ChefHat, label: 'Preparing' },
  { icon: Package, label: 'Ready' },
  { icon: Bike, label: 'Pick Up' },
];

const activeStep = 2;

export default function LiveOrder() {
  return (
    <section className="relative bg-slate-900 py-32 px-6 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20">
            Live order tracking.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative flex flex-col md:flex-row items-center justify-between md:justify-center md:gap-0 gap-10 mb-20">
            {/* Progress line - desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-1 bg-slate-700 rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full origin-left"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center gap-4 md:w-1/4"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                        : isActive
                          ? 'bg-orange-500/80'
                          : 'bg-slate-600'
                    }`}
                  >
                    <Icon
                      size={28}
                      className={isActive ? 'text-white' : 'text-slate-400'}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
              </span>
              <span className="text-white font-bold text-lg">Your order is ready!</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Token #1247 · Campus Food Court</p>
            <p className="text-orange-400 font-semibold text-sm">Pick up at Counter 3</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
