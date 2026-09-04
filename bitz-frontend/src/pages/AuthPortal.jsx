import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';
import { UtensilsCrossed, Store } from 'lucide-react';

const AuthPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
            {/* Background Decorators */}
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

            <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
                <ScrollReveal variant="fadeUp">
                    <div className="text-center mb-14">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Login or Sign Up</h1>
                        <p className="text-slate-500 font-medium mt-3 text-lg">
                            Choose how you want to access Bitez.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Student */}
                    <ScrollReveal variant="fadeRight" delay={0.15}>
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="glass rounded-[2rem] p-8 border border-white shadow-xl shadow-orange-500/5 h-full flex flex-col"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-orange-500/20">
                                <UtensilsCrossed size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-3">Student</h2>
                            <p className="text-slate-500 font-medium mb-8 flex-1">
                                Order food, track your meals, and manage your profile.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="button"
                                    onClick={() => navigate('/student-login')}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25"
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="button"
                                    onClick={() => navigate('/student-login?mode=signup')}
                                    className="flex-1 bg-white text-slate-800 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition"
                                >
                                    Sign Up
                                </motion.button>
                            </div>
                        </motion.div>
                    </ScrollReveal>

                    {/* Canteen Owner */}
                    <ScrollReveal variant="fadeLeft" delay={0.25}>
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="glass rounded-[2rem] p-8 border border-white shadow-xl shadow-orange-500/5 h-full flex flex-col"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-slate-900/20">
                                <Store size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-3">Canteen Owner</h2>
                            <p className="text-slate-500 font-medium mb-4 flex-1">
                                Admin access is invitation-only. Contact the system administrator to create your account.
                            </p>
                            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold rounded-xl p-4 mb-6">
                                If you already have credentials, you can log in below.
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                onClick={() => navigate('/admin-login')}
                                className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
                            >
                                Login as Canteen Owner
                            </motion.button>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;
