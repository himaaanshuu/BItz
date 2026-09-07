import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorators */}
      <motion.div
        className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass p-12 max-w-lg w-full text-center rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-28 h-28 mx-auto bg-gradient-to-tr from-orange-400 to-rose-500 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/30 rotate-3"
        >
          <span className="text-6xl font-black">404</span>
        </motion.div>

        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-2xl font-bold text-lg hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
