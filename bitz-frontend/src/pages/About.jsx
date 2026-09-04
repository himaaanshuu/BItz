import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBanner from '../components/AnimatedBanner';
import ScrollReveal from '../components/ScrollReveal';
import { Target, Lightbulb, Users, ListCheck, Smartphone, Timer, Ticket, BarChart3, UserCog, Clock, Banknote } from 'lucide-react';

const steps = [
  { icon: <Users className="text-rose-400" size={20} />, text: 'Students login with their phone numbers' },
  { icon: <ListCheck className="text-rose-400" size={20} />, text: 'Browse menus from multiple canteens' },
  { icon: <Smartphone className="text-rose-400" size={20} />, text: 'Place orders and choose payment method' },
  { icon: <Timer className="text-rose-400" size={20} />, text: 'Track live queue and prep time' },
  { icon: <Ticket className="text-rose-400" size={20} />, text: 'Get token number for pickup' },
];

const adminFeatures = [
  { icon: <BarChart3 className="text-sky-500" size={20} />, text: 'Real-time dashboard with order management' },
  { icon: <Users className="text-sky-500" size={20} />, text: 'View customer details and order history' },
  { icon: <Clock className="text-sky-500" size={20} />, text: 'Update queue count and prep times' },
  { icon: <Ticket className="text-sky-500" size={20} />, text: 'Issue token numbers automatically' },
  { icon: <Banknote className="text-sky-500" size={20} />, text: 'Track payments seamlessly' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative">
      {/* Background Decorators */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <AnimatedBanner />

      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <ScrollReveal variant="fadeUp">
          <h1 className="text-5xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
            About BITEZ
          </h1>
        </ScrollReveal>

        <div className="space-y-6 text-slate-600">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <p className="text-xl leading-relaxed">
              BITEZ is revolutionizing campus dining by eliminating the age-old problem of long cafeteria queues. We believe that eating should be a wholesome, enjoyable experience - not a time-consuming task that eats into your break time.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-xl leading-relaxed">
              Our platform connects multiple canteens across your campus, allowing students to browse menus, place orders, and track their food preparation in real-time. No more standing in lines, no more uncertainty about wait times.
            </p>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal variant="fadeLeft" delay={0.15}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(249, 115, 22, 0.12)' }}
              className="glass bg-white/70 backdrop-blur-md p-8 rounded-[2rem] my-8 border border-white shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/40 rounded-bl-full -mr-10 -mt-10" />
              <h3 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Target size={24} /></div>
                Our Mission
              </h3>
              <p className="text-lg font-medium">
                To make campus dining seamless, efficient, and enjoyable for every student while empowering canteen operators with smart tools to manage their business better.
              </p>
            </motion.div>
          </ScrollReveal>

          {/* How It Works */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900 text-white p-8 rounded-[2rem] my-8 border border-slate-700 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full filter blur-[40px]" />
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl"><Lightbulb size={24} /></div>
                How It Works
              </h3>
              <ul className="space-y-4 text-lg">
                {steps.map((step, i) => (
                  <ScrollReveal key={i} variant="fadeLeft" delay={0.1 * (i + 1)}>
                    <motion.li
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <span className="text-white font-medium">{step.text}</span>
                    </motion.li>
                  </ScrollReveal>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>

          {/* For Admins */}
          <ScrollReveal variant="fadeLeft" delay={0.15}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] my-8 border border-white shadow-lg relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-200/40 rounded-tl-full -mr-10 -mb-10" />
              <h3 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-sky-100 text-sky-600 rounded-xl"><UserCog size={24} /></div>
                For Canteen Admins
              </h3>
              <ul className="space-y-4 text-lg font-medium text-slate-600">
                {adminFeatures.map((feature, i) => (
                  <ScrollReveal key={i} variant="fadeLeft" delay={0.1 * (i + 1)}>
                    <motion.li
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span>{feature.text}</span>
                    </motion.li>
                  </ScrollReveal>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default About;
