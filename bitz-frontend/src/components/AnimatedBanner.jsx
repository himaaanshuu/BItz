import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const taglines = [
  'Zero Queue, Maximum Flavor',
  'Skip The Line, Savor The Flavor',
  'Order Ahead, Eat Fresh',
  'No Lines, Just Good Vibes',
  'Your Food, Your Time',
  'Fresh Food, Zero Wait',
];

const AnimatedBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-600 to-rose-600 text-white py-3 overflow-hidden">
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-lg tracking-wide"
          >
            {taglines[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedBanner;
