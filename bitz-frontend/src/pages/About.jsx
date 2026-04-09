import React from 'react';
import AnimatedBanner from '../components/AnimatedBanner';
import { Target, Lightbulb, Users, ListCheck, Smartphone, Timer, Ticket, BarChart3, UserCog, Clock, Banknote } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <AnimatedBanner />
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
          About BITEZ
        </h1>
        
        <div className="space-y-6 text-slate-600">
          <p className="text-xl leading-relaxed">
            BITEZ is revolutionizing campus dining by eliminating the age-old problem of long cafeteria queues. We believe that eating should be a wholesome, enjoyable experience - not a time-consuming task that eats into your break time.
          </p>
          
          <p className="text-xl leading-relaxed">
            Our platform connects multiple canteens across your campus, allowing students to browse menus, place orders, and track their food preparation in real-time. No more standing in lines, no more uncertainty about wait times.
          </p>
          
          <div className="glass bg-white/70 backdrop-blur-md p-8 rounded-[2rem] my-8 border border-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/40 rounded-bl-full -mr-10 -mt-10" />
            <h3 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Target size={24} /></div>
              Our Mission
            </h3>
            <p className="text-lg font-medium">
              To make campus dining seamless, efficient, and enjoyable for every student while empowering canteen operators with smart tools to manage their business better.
            </p>
          </div>
          
          <div className="glass bg-slate-900 text-white p-8 rounded-[2rem] my-8 border border-slate-700 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full filter blur-[40px]" />
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
               <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl"><Lightbulb size={24} /></div>
               How It Works
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3"><Users className="text-rose-400" size={20} /> Students login with their phone numbers</li>
              <li className="flex items-center gap-3"><ListCheck className="text-rose-400" size={20} /> Browse menus from multiple canteens</li>
              <li className="flex items-center gap-3"><Smartphone className="text-rose-400" size={20} /> Place orders and choose payment method</li>
              <li className="flex items-center gap-3"><Timer className="text-rose-400" size={20} /> Track live queue and prep time</li>
              <li className="flex items-center gap-3"><Ticket className="text-rose-400" size={20} /> Get token number for pickup</li>
            </ul>
          </div>
          
          <div className="glass bg-white/70 backdrop-blur-md p-8 rounded-[2rem] my-8 border border-white shadow-lg relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-200/40 rounded-tl-full -mr-10 -mb-10" />
            <h3 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-3">
               <div className="p-2 bg-sky-100 text-sky-600 rounded-xl"><UserCog size={24} /></div>
               For Canteen Admins
            </h3>
            <ul className="space-y-4 text-lg font-medium text-slate-600">
              <li className="flex items-center gap-3"><BarChart3 className="text-sky-500" size={20} /> Real-time dashboard with order management</li>
              <li className="flex items-center gap-3"><Users className="text-sky-500" size={20} /> View customer details and order history</li>
              <li className="flex items-center gap-3"><Clock className="text-sky-500" size={20} /> Update queue count and prep times</li>
              <li className="flex items-center gap-3"><Ticket className="text-sky-500" size={20} /> Issue token numbers automatically</li>
              <li className="flex items-center gap-3"><Banknote className="text-sky-500" size={20} /> Track payments seamlessly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;