import React from 'react';
import { Zap, Clock, CreditCard } from 'lucide-react';
import FeatureCard from './FeatureCard';

const WhyBitez = () => {
  const features = [
    {
      icon: <Zap size={48} />,
      title: "Lightning Fast",
      description: "Order in seconds, eat in minutes!",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Clock size={48} />,
      title: "Live Tracking",
      description: "Know exactly when your food is ready",
      gradient: "from-green-400 to-teal-500"
    },
    {
      icon: <CreditCard size={48} />,
      title: "Easy Payments",
      description: "UPI, Cash - You choose!",
      gradient: "from-blue-400 to-purple-500"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-5xl font-black text-center mb-16 text-gray-900">
        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">BITEZ</span>?
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyBitez;