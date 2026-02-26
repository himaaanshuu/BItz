import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Animated Banner - Scrolling Text */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-500 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
          <span className="text-white font-semibold mx-8">🔥 Zero Queue, Maximum Flavor!</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Eating Should Be
              </span>
              <br />
              <span className="text-red-500">WHOLESOME</span>
              <br />
              <span className="text-orange-500">Not a Task!</span>
            </h1>

            <p className="text-xl text-gray-300 font-medium">
              Skip the cafeteria chaos. Order from multiple canteens, track live, and munch happy! 🤩✨
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition shadow-lg shadow-red-500/50 transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login / Sign Up
              </button>

              <button
                onClick={() => navigate('/order')}
                className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M9 21a1 1 0 110-2 1 1 0 010 2zm8 0a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                Order Now
              </button>
            </div>

            <button
              onClick={() => navigate('/about')}
              className="text-orange-500 hover:text-orange-400 font-bold text-lg flex items-center gap-2"
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Content - Food Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 rounded-3xl p-12 shadow-2xl shadow-red-500/50 transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center gap-6 mb-8">
                <span className="text-8xl">🍕</span>
                <span className="text-8xl">🍔</span>
                <span className="text-8xl">🌮</span>
              </div>

              <div className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-black text-2xl text-center shadow-lg inline-block">
                ZERO WAIT!
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-black text-center mb-12 text-white">
            Why Choose BITEZ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-8 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/40 transition transform hover:-translate-y-2">
              <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Skip the Queue</h3>
              <p className="text-gray-400">
                No more standing in long cafeteria lines. Order ahead and pick up when ready!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 rounded-2xl p-8 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 transition transform hover:-translate-y-2">
              <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Live Tracking</h3>
              <p className="text-gray-400">
                Track your order in real-time. Know exactly when your food will be ready!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-2xl p-8 shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/40 transition transform hover:-translate-y-2">
              <div className="bg-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Multiple Canteens</h3>
              <p className="text-gray-400">
                Browse and order from all your campus canteens in one place. More choices!
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-3xl p-12 shadow-xl shadow-red-500/30">
          <h2 className="text-4xl font-black text-center mb-12 text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-red-500/50">
                1
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Choose Canteen</h4>
              <p className="text-gray-400 text-sm">Select from available canteens on campus</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-orange-500/50">
                2
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Browse Menu</h4>
              <p className="text-gray-400 text-sm">Check out delicious food options</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-yellow-500/50">
                3
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Place Order</h4>
              <p className="text-gray-400 text-sm">Add items to cart and checkout</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-red-600 to-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-red-500/50">
                4
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Pick Up!</h4>
              <p className="text-gray-400 text-sm">Get notified and collect your food</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 rounded-3xl p-12 shadow-2xl shadow-red-500/50">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Skip the Queue?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of students eating smarter, not harder!
          </p>
          <button
            onClick={() => navigate('/student-login')}
            className="bg-black text-white border-2 border-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-white hover:text-black transition shadow-lg transform hover:scale-105"
          >
            Get Started Now! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;