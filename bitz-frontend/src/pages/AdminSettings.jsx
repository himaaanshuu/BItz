import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Eye, EyeOff, Building2, MapPin, Phone, Mail, Clock,
  Lock, CheckCircle, AlertCircle, ArrowLeft, Shield, Store
} from 'lucide-react';
import { api } from '../services/api';
import ScrollReveal from '../components/ScrollReveal';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const [canteenData, setCanteenData] = useState({
    canteenName: '', location: '', phone: '', email: '', openTime: '08:00', closeTime: '20:00'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie.split(';').some(c => c.trim().startsWith('bitezAuth=admin'));
    if (!adminToken || !hasAuthCookie) { navigate('/admin-login'); return; }

    const storedAdmin = localStorage.getItem('bitezAdmin');
    if (storedAdmin) {
      const data = JSON.parse(storedAdmin);
      setCanteenData({
        canteenName: data.canteenName || '', location: data.location || '',
        phone: data.phone || '', email: data.email || '',
        openTime: data.openTime || '08:00', closeTime: data.closeTime || '20:00'
      });
    }
  }, [navigate]);

  const handleUpdateCanteen = async (e) => {
    e.preventDefault();
    setMessage(''); setError(''); setIsSaving(true);
    try {
      await api.updateCanteen(canteenData);
      localStorage.setItem('bitezAdmin', JSON.stringify(canteenData));
      setMessage('Canteen profile updated successfully.');
    } catch (err) { setError(err.message || 'Failed to update canteen profile.'); } finally { setIsSaving(false); }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('Please fill all password fields.'); return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.'); return;
    }
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters.'); return;
    }

    setIsSaving(true);
    try {
      await api.changePasswordAdmin({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage('Password updated successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { setError(err.message || 'Password update failed.'); } finally { setIsSaving(false); }
  };

  const sections = [
    { id: 'profile', label: 'Canteen Profile', icon: Store },
    { id: 'password', label: 'Security', icon: Shield },
  ];

  const canteenFields = [
    { key: 'canteenName', label: 'Canteen Name', icon: Building2, placeholder: 'Main Cafeteria', type: 'text' },
    { key: 'location', label: 'Location', icon: MapPin, placeholder: 'Ground Floor, Building A', type: 'text' },
    { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+91 XXXXX XXXXX', type: 'tel' },
    { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'admin@canteen.com', type: 'email' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 bg-white border-b border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6 py-5 flex items-center gap-4">
          <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/admin-dashboard')} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all">
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500 font-medium">Manage your canteen profile and security</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-8 relative z-10">
        {/* Alerts */}
        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold flex items-center gap-2">
              <CheckCircle size={18} /> {message}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Tabs */}
        <ScrollReveal variant="fadeUp">
          <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
            {sections.map(sec => (
              <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeSection === sec.id
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}>
                <sec.icon size={16} /> {sec.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {activeSection === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                  <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center"><Building2 size={16} /></div>
                    Canteen Information
                  </h3>

                  <form onSubmit={handleUpdateCanteen} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      {canteenFields.map((field, i) => (
                        <ScrollReveal key={field.key} variant="fadeRight" delay={0.05 * (i + 1)}>
                          <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                            <field.icon size={12} /> {field.label}
                          </label>
                          <input type={field.type} value={canteenData[field.key]}
                            onChange={(e) => setCanteenData({ ...canteenData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" />
                        </ScrollReveal>
                      ))}
                    </div>

                    <ScrollReveal variant="fadeUp" delay={0.3}>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                            <Clock size={12} /> Opening Time
                          </label>
                          <input type="time" value={canteenData.openTime}
                            onChange={(e) => setCanteenData({ ...canteenData, openTime: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                            <Clock size={12} /> Closing Time
                          </label>
                          <input type="time" value={canteenData.closeTime}
                            onChange={(e) => setCanteenData({ ...canteenData, closeTime: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" />
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.35}>
                      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSaving}
                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-70 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save Profile'}
                      </motion.button>
                    </ScrollReveal>
                  </form>
                </div>
              </ScrollReveal>
            </motion.div>
          )}

          {activeSection === 'password' && (
            <motion.div key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                  <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center"><Lock size={16} /></div>
                    Change Password
                  </h3>

                  <form onSubmit={handleUpdatePassword} className="space-y-5">
                    <ScrollReveal variant="fadeRight" delay={0.1}>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                        <Lock size={12} /> Current Password
                      </label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all pr-12" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeRight" delay={0.15}>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                        <Lock size={12} /> New Password
                      </label>
                      <div className="relative">
                        <input type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all pr-12" />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeRight" delay={0.2}>
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 gap-1.5">
                        <Lock size={12} /> Confirm New Password
                      </label>
                      <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all pr-12" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.25}>
                      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSaving}
                        className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-70 transition-all flex items-center justify-center gap-2">
                        <Shield size={18} /> {isSaving ? 'Updating...' : 'Update Password'}
                      </motion.button>
                    </ScrollReveal>
                  </form>

                  <ScrollReveal variant="fadeUp" delay={0.3}>
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password Requirements</p>
                      <ul className="text-xs text-slate-500 space-y-1">
                        <li>At least 8 characters</li>
                        <li>Include uppercase and lowercase letters</li>
                        <li>Include at least one number</li>
                        <li>Include at least one special character</li>
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminSettings;
