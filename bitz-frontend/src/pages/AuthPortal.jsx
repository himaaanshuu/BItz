import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';
import { UtensilsCrossed } from 'lucide-react';

const AuthPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-16 relative z-10">
                <ScrollReveal variant="fadeUp">
                    <div className="text-center mb-14">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Student Login</h1>
                        <p className="text-slate-500 font-medium mt-3 text-lg">
                            Sign in to order food and track your meals.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.15}>
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="glass rounded-[2rem] p-10 border border-white shadow-xl shadow-orange-500/5 max-w-md mx-auto text-center"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 mx-auto">
                            <UtensilsCrossed size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">Welcome Back</h2>
                        <p className="text-slate-500 font-medium mb-8">
                            Order food, track your meals, and manage your profile.
                        </p>
                        <div className="flex flex-col gap-3">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('/student-login')}
                                className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3.5 rounded-xl font-bold hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25"
                            >
                                Login
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('/student-login?mode=signup')}
                                className="bg-white text-slate-800 px-6 py-3.5 rounded-xl font-bold border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition"
                            >
                                Sign Up
                            </motion.button>
                        </div>
                        <div className="mt-6 pt-5 border-t border-slate-100">
                            <p className="text-xs text-slate-400">
                                Canteen owner?{' '}
                                <button onClick={() => navigate('/admin-login')} className="text-orange-600 font-bold hover:underline">
                                    Admin Login
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default AuthPortal;
