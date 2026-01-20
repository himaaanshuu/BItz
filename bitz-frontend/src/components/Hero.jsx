import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 leading-tight">
            Eating Should Be WHOLESOME
            <span className="block text-5xl mt-2">Not a Task!</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Skip the cafeteria chaos. Order from multiple canteens, track live, and munch happy! 🍔✨
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => navigate('/student-login')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
              >
                <Users size={24} />
                Student Login
              </button>
              <button 
                onClick={() => navigate('/admin-login')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
              >
                <Store size={24} />
                Admin Login
              </button>
            </div>
            <button 
              onClick={() => navigate('/about')}
              className="border-3 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-3xl h-96 flex items-center justify-center shadow-2xl transform hover:rotate-2 transition-transform">
            <span className="text-white text-6xl">🍕🍔🌮</span>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-black shadow-xl animate-bounce">
            ZERO WAIT! ⚡
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;