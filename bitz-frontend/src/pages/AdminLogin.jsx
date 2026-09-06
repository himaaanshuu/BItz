import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ChevronRight, Eye, EyeOff, ShieldCheck, BarChart3, Users, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import PhoneInput from '../components/PhoneInput';
import { api } from '../services/api';
import ScrollReveal from '../components/ScrollReveal';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpPreview, setOtpPreview] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const resetStatus = () => {
    setMessage('');
    setError('');
  };

  const normalizePhone = (raw) => {
    const trimmed = raw.trim().replace(/\s+/g, '');
    return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
  };

  const normalizeEmail = (raw) => raw.trim().toLowerCase();

  const startOtpTimer = () => setOtpCountdown(60);

  const handleRequestOtp = async () => {
    resetStatus();

    if (!email || !phone || !password) {
      setError('Email, phone, and password are required.');
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);

    setIsLoading(true);
    try {
      const response = await api.requestAdminOtp({
        email: normalizedEmail,
        phone: normalizedPhone,
      });
      setMessage(response.message || 'OTP sent to your phone.');
      setOtpRequested(true);
      if (import.meta.env.DEV && response.otp) {
        setOtpPreview(`Dev OTP: ${response.otp}`);
      }
      startOtpTimer();
    } catch (err) {
      console.error('[AdminLogin] OTP request failed:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to send OTP. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    resetStatus();
    setOtpPreview('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.loginAdmin({
        email: normalizeEmail(email),
        password,
        otp: otp || '',
      });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezAdmin', JSON.stringify(data.user));
      localStorage.setItem('bitezAdminLoginTime', Date.now().toString());
      document.cookie = 'bitezAuth=admin; path=/; max-age=259200';
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('[AdminLogin] Login failed:', err);
      setError(err?.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const features = [
    { icon: <BarChart3 size={20} className="text-orange-500" />, title: 'Real-time Dashboard', desc: 'Manage orders and track performance at a glance.' },
    { icon: <Users size={20} className="text-rose-500" />, title: 'Customer Insights', desc: 'View customer details and order history.' },
    { icon: <Clock size={20} className="text-amber-500" />, title: 'Queue Management', desc: 'Update queue counts and prep times live.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
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
      <motion.div
        className="absolute top-[50%] right-[20%] w-[300px] h-[300px] bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - About / Features */}
          <div className="hidden lg:block space-y-8">
            <ScrollReveal variant="fadeRight" delay={0.1}>
              <h1 className="text-5xl font-black text-slate-900 leading-tight">
                Canteen<br />
                <span className="text-gradient">Admin Portal</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fadeRight" delay={0.25}>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Manage your canteen operations efficiently. Track orders, update menus, and monitor analytics in real-time.
              </p>
            </ScrollReveal>

            <div className="space-y-5">
              {features.map((f, i) => (
                <ScrollReveal key={i} variant="fadeRight" delay={0.3 + i * 0.1}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/60 shadow-sm"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{f.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{f.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="fadeRight" delay={0.6}>
              <div className="p-4 glass rounded-2xl border border-white/60">
                <p className="text-sm text-slate-500 font-medium text-center">
                  Admin accounts are securely provisioned. Contact the system administrator for access.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass p-10 max-w-md w-full mx-auto rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50"
          >
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="w-20 h-20 mx-auto bg-gradient-to-tr from-slate-800 to-slate-900 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-900/20 rotate-3"
              >
                <Store size={36} />
              </motion.div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h2>
              <p className="text-slate-500 font-medium mt-2">
                Sign in to manage your canteen.
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 shadow-sm"
                  >
                    {message}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 shadow-sm"
                  >
                    {error}
                  </motion.div>
                )}
                {otpPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm font-bold text-amber-700 shadow-sm"
                  >
                    {otpPreview}
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={e => setEmail(normalizeEmail(e.target.value))}
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50"
              />

              <PhoneInput
                value={phone}
                onChange={setPhone}
                disabled={otpRequested}
                placeholder="Phone number"
              />

              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-5 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <AnimatePresence>
                {otpRequested && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <input
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold tracking-[0.2em] text-center text-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!otpRequested ? (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRequestOtp}
                  disabled={isLoading || !email || !phone || !password}
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3.5 rounded-2xl font-bold text-lg disabled:opacity-70 shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'} <ShieldCheck size={20} />
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3.5 rounded-2xl font-bold text-lg disabled:opacity-70 shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Login'} <ChevronRight size={20} />
                  </motion.button>
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={isLoading || otpCountdown > 0}
                    className={`w-full font-bold transition-colors ${otpCountdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700'}`}
                  >
                    {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : 'Resend Code'}
                  </button>
                </motion.div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs font-semibold text-slate-400">OTP is required for admin login. Enter your email, phone, and password, then verify with OTP.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
