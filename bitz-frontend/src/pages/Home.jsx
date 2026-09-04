import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import HowItWorks from '../components/HowItWorks';
import OrderUIMockup from '../components/OrderUIMockup';
import LiveOrder from '../components/LiveOrder';
import Campus from '../components/Campus';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Navbar />
      <Hero />
      <HorizontalScroll />
      <HowItWorks />
      <OrderUIMockup />
      <LiveOrder />
      <Campus />
      <FinalCTA />
    </div>
  );
};

export default Home;
