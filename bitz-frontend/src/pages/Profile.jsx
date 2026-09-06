import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, CreditCard, Edit2, Save } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    studentId: '',
    phone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    if (!token || !hasAuthCookie) {
      navigate('/student-login');
      return;
    }

    const storedUser = localStorage.getItem('bitezUser');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch {
        navigate('/student-login');
      }
    }
  }, [navigate]);

  const [message, setMessage] = useState('');

  const handleSave = () => {
    localStorage.setItem('bitezUser', JSON.stringify(userData));
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const fields = [
    { key: 'name', label: 'Full Name', icon: <User size={16} className="text-orange-500" />, type: 'text' },
    { key: 'email', label: 'Email Address', icon: <Mail size={16} className="text-orange-500" />, type: 'email' },
    { key: 'studentId', label: 'Student ID', icon: <CreditCard size={16} className="text-orange-500" />, type: 'text' },
    { key: 'phone', label: 'Phone Number', icon: <Phone size={16} className="text-orange-500" />, type: 'tel' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <Navbar />

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg"
        >
          {message}
        </motion.div>
      )}

      <div className="max-w-[1000px] mx-auto px-6 py-12 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">My Profile</h1>
            <p className="text-slate-500 font-medium">Manage your account information and preferences</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleUp" delay={0.15}>
          <div className="glass-panel rounded-[2.5rem] p-10 shadow-xl border border-white">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Avatar Section */}
              <div className="flex flex-col justify-center items-center gap-6 w-full md:w-1/3">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  className="w-40 h-40 bg-gradient-to-tr from-orange-400 to-rose-500 rounded-[2.5rem] flex items-center justify-center text-white text-6xl font-black shadow-lg shadow-orange-500/20 rotate-3"
                >
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </motion.div>
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    {!isEditing ? (
                      <motion.button
                        key="edit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 size={18} />
                        Edit Profile
                      </motion.button>
                    ) : (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-3 w-full"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSave}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Save size={18} />
                          Save Changes
                        </motion.button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="w-full text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100 py-3 rounded-2xl transition-all"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="w-full md:w-2/3 space-y-6 bg-white/50 p-8 rounded-3xl border border-slate-100">
                <div className="space-y-6">
                  {fields.map((field, i) => (
                    <ScrollReveal key={field.key} variant="fadeRight" delay={0.05 * (i + 1)}>
                      <div>
                        <label className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 gap-2">
                          {field.icon}
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={userData[field.key]}
                          onChange={(e) => setUserData({ ...userData, [field.key]: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-5 py-4 border rounded-2xl text-lg font-medium transition-all ${
                            isEditing
                              ? 'bg-white border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none shadow-sm text-slate-800'
                              : 'border-transparent bg-slate-50 text-slate-600'
                          }`}
                        />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Profile;
