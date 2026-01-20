import React from 'react';
import AnimatedBanner from '../components/AnimatedBanner';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedBanner />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
          About BITEZ
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-xl leading-relaxed">
            BITEZ is revolutionizing campus dining by eliminating the age-old problem of long cafeteria queues. We believe that eating should be a wholesome, enjoyable experience - not a time-consuming task that eats into your break time.
          </p>
          
          <p className="text-xl leading-relaxed">
            Our platform connects multiple canteens across your campus, allowing students to browse menus, place orders, and track their food preparation in real-time. No more standing in lines, no more uncertainty about wait times.
          </p>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl my-8">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              To make campus dining seamless, efficient, and enjoyable for every student while empowering canteen operators with smart tools to manage their business better.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-8 rounded-2xl my-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ul className="space-y-3 text-lg">
              <li>✨ Students login with their School ID</li>
              <li>🍔 Browse menus from multiple canteens</li>
              <li>📱 Place orders and choose payment method</li>
              <li>⏱️ Track live queue and prep time</li>
              <li>🎫 Get token number for pickup</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-8 rounded-2xl my-8">
            <h3 className="text-2xl font-bold mb-4">For Canteen Admins</h3>
            <ul className="space-y-3 text-lg">
              <li>📊 Real-time dashboard with order management</li>
              <li>👥 View customer details and order history</li>
              <li>⏰ Update queue count and prep times</li>
              <li>🎟️ Issue token numbers automatically</li>
              <li>💰 Track payments (UPI/Cash)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;