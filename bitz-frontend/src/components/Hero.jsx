import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-[#FAFAFA] min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-black leading-tight text-slate-900 flex flex-wrap gap-x-4 gap-y-2">
            <span className="animate-drop-in inline-block" style={{ animationDelay: '0ms' }}>Eating</span>
            <span className="animate-drop-in inline-block" style={{ animationDelay: '200ms' }}>Should</span>
            <span className="animate-drop-in inline-block" style={{ animationDelay: '400ms' }}>Be</span>
            <span className="animate-drop-in inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600" style={{ animationDelay: '600ms' }}>WHOLESOME</span>
            <span className="animate-drop-in inline-block text-5xl md:text-6xl mt-2 w-full text-slate-700" style={{ animationDelay: '800ms' }}>Not a Task!</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-lg mb-8 animate-drop-in opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            Skip the cafeteria chaos. Order from multiple canteens, track your meals live, and enjoy a seamless dining experience.
          </p>
          <div className="space-y-4 animate-drop-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => navigate('/student-login')}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200 transition-all shadow-lg flex items-center gap-3"
              >
                <Users size={24} />
                Student Login
              </button>
              <button 
                onClick={() => navigate('/admin-login')}
                className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl shadow-orange-600/30 transition-all shadow-lg flex items-center gap-3"
              >
                <Store size={24} />
                Admin Portal
              </button>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => navigate('/about')}
                className="text-slate-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-colors border-2 border-transparent hover:border-slate-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative h-[600px] w-full hidden md:block animate-drop-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform hover:rotate-1 transition-transform duration-500 bg-slate-100 group">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Delicious premium burger" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="absolute -bottom-8 -right-8 bg-white border border-slate-100 px-8 py-6 rounded-3xl font-black shadow-2xl animate-float z-20 flex items-center gap-4">
             <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
             <div>
                <p className="text-slate-800 text-xl">ZERO WAIT TIME.</p>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Order Live Now</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;