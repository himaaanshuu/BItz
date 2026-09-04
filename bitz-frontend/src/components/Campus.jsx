import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Users, Coffee, Clock, MapPin, Zap, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Students',
    description: 'Built by students, for students who want better food experiences.',
  },
  {
    icon: Coffee,
    title: 'Cafeteria',
    description: 'Connect with all campus food outlets in one place.',
  },
  {
    icon: Zap,
    title: 'Quick Pickup',
    description: 'Order ahead and grab your food without the wait.',
  },
  {
    icon: Clock,
    title: 'Busy Schedules',
    description: 'Perfect between classes. Order in 30 seconds.',
  },
  {
    icon: MapPin,
    title: 'Multiple Outlets',
    description: 'Browse menus from every campus food court.',
  },
  {
    icon: BookOpen,
    title: 'Real-time',
    description: 'Track your order from kitchen to counter.',
  },
];

export default function Campus() {
  return (
    <section className="bg-[#FAFAFA] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            Made for <span className="text-gradient">campus life.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-orange-500" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
