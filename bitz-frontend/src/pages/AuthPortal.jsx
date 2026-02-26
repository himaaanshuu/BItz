import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AuthPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-14">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white">Login or Sign Up</h1>
                    <p className="text-gray-300 mt-3">
                        Choose how you want to access Bitez.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Student */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-3">Student</h2>
                        <p className="text-gray-300 mb-6">
                            Order food, track your meals, and manage your profile.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/student-login')}
                                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/student-login?mode=signup')}
                                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Canteen Owner */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-3">Canteen Owner</h2>
                        <p className="text-gray-300 mb-4">
                            Admin access is invitation-only. Contact the system administrator to create your account.
                        </p>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-sm rounded-xl p-4 mb-6">
                            If you already have credentials, you can log in below.
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate('/admin-login')}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition"
                        >
                            Login as Canteen Owner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;
