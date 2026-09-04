import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Search, Smartphone, Bell } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Pick your food',
    description: 'Browse campus outlets and discover what you want.',
  },
  {
    icon: Smartphone,
    title: 'Place your order',
    description: 'Customize your food and order directly from your phone.',
  },
  {
    icon: Bell,
    title: 'Skip the queue',
    description: 'Get notified when your order is ready and simply pick it up.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800">
              Three steps to{' '}
              <span className="text-gradient">skip the line</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative grid md:grid-cols-3 gap-12">
          {/* Dotted connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-orange-200" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={i} variant="fadeUp" delay={0.15 * i}>
                <div className="relative text-center flex flex-col items-center">
                  <span className="text-8xl font-black text-gradient opacity-20 select-none mb-2 leading-none">
                    0{i + 1}
                  </span>
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
