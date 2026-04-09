import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Pizza, Coffee, Sandwich, Zap, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />

      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-orange-200 text-orange-600 font-semibold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Now Serving 3 Campus Canteens
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Skip The Queue.<br />
              <span className="text-gradient">Savor The Flavor.</span>
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
              Order your favorite meals ahead of time. Pick them up exactly when they're hot and ready. 
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => navigate('/auth')}
                className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-1"
              >
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/order')}
                className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm hover:shadow-md"
              >
                Browse Menu
              </button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
              </div>
              <div className="text-sm font-semibold text-slate-500">
                Loved by 2,000+ students daily
              </div>
            </div>
          </div>

          {/* Right Content - Modern App Showcase */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-rose-100 rounded-[3rem] rotate-3 scale-105 opacity-50"></div>
            <div className="relative glass p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl border-white/60">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-1">Current Order</p>
                  <h3 className="text-xl font-bold text-slate-800">Spicy Veg Burger</h3>
                </div>
                <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-bold">
                  Ready!
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center aspect-square hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Pizza size={24} />
                  </div>
                  <p className="font-bold text-slate-700">Pizza</p>
                </div>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center aspect-square hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Coffee size={24} />
                  </div>
                  <p className="font-bold text-slate-700">Beverages</p>
                </div>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center aspect-square hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Sandwich size={24} />
                  </div>
                  <p className="font-bold text-slate-700">Snacks</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-3xl p-5 shadow-lg shadow-orange-500/30 text-center flex flex-col items-center justify-center aspect-square text-white hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                     <ArrowRight size={24} />
                  </div>
                  <p className="font-bold">More</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-40 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Why Choose Bitez?
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              We've redesigned the campus dining experience from the ground up to save you time and keep you energized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Zap size={32} className="text-orange-500" />, title: 'Zero Wait Time', desc: 'Pre-order from your classroom. Just show your digital receipt and grab your meal instantly.' },
              { icon: <MapPin size={32} className="text-rose-500" /> , title: 'Live Tracking', desc: 'Get real-time push notifications the moment your chef starts preparing your delicious food.' },
              { icon: <CreditCard size={32} className="text-emerald-500" />, title: 'One-Tap Pay', desc: 'Securely link your campus card or standard payment methods for lightning-fast checkouts.' }
            ].map((f, i) => (
              <div key={i} className="glass p-10 rounded-3xl hover:-translate-y-2 transition-all hover:shadow-2xl hover:shadow-orange-500/10 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call To Action */}
        <div className="my-32 relative rounded-[3rem] overflow-hidden bg-slate-900 px-6 py-24 text-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Hungry yet?
            </h2>
            <p className="text-xl text-slate-300 font-medium mb-10">
              Join thousands of students who have already upgraded their dining experience.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xl hover:bg-orange-50 transition-colors shadow-2xl hover:scale-105 active:scale-95 duration-200"
            >
              Get Started Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;