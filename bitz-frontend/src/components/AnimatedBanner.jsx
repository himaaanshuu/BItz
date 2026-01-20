import React from 'react';

const AnimatedBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
        <span className="mx-8 font-bold text-lg">🔥 Zero Queue, Maximum Flavor!</span>
      </div>
    </div>
  );
};

export default AnimatedBanner;