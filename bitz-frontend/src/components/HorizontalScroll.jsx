import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  UtensilsCrossed,
  Pizza,
  Coffee,
  IceCreamCone,
  Sandwich,
  Soup,
  Salad,
  Cake,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const cards = [
  {
    title: 'Burgers',
    desc: 'Juicy, flame-grilled patties with fresh toppings and artisan buns.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    Icon: UtensilsCrossed,
  },
  {
    title: 'Pizza',
    desc: 'Hand-stretched dough, rich sauces, and premium melted cheese.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    Icon: Pizza,
  },
  {
    title: 'Momos',
    desc: 'Steamed perfection filled with savory spiced vegetables and meat.',
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    Icon: Soup,
  },
  {
    title: 'Beverages',
    desc: 'Refreshing drinks from artisan coffees to chilled smoothies.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    Icon: Coffee,
  },
  {
    title: 'Desserts',
    desc: 'Indulgent sweet treats to end every meal on a high note.',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    Icon: Cake,
  },
  {
    title: 'Meals',
    desc: 'Complete wholesome meals packed with flavour and nutrition.',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    Icon: Salad,
  },
  {
    title: 'Sandwiches',
    desc: 'Crispy, stacked sandwiches layered with fresh ingredients.',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    Icon: Sandwich,
  },
  {
    title: 'Ice Cream',
    desc: 'Creamy, cold scoops in every flavour you can imagine.',
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop',
    Icon: IceCreamCone,
  },
];

const FoodCard = ({ title, desc, image, Icon }) => (
  <div className="w-[280px] md:w-[340px] h-[420px] flex-shrink-0 rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="pt-4">
      <div className="flex items-center gap-3 px-6">
        <Icon size={22} className="text-orange-500" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-500 px-6 mt-2 leading-relaxed">
        {desc}
      </p>
      <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-500 ml-6 rounded-full" />
    </div>
  </div>
);

const HorizontalScroll = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-60%']);

  return (
    <section ref={sectionRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Heading */}
        <div className="px-6 md:px-16 pt-16 pb-10">
          <ScrollReveal>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
              The Menu
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Everything you crave.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                One campus.
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Horizontal cards row */}
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-16 mt-6">
          {cards.map((card) => (
            <FoodCard key={card.title} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
