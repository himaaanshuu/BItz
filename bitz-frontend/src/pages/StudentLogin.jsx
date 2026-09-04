import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronRight, ShieldCheck, Zap, MapPin, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import ScrollReveal from '../components/ScrollReveal';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpPreview, setOtpPreview] = useState('');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const resetStatus = () => {
    setMessage('');
    setError('');
  };

  const normalizePhone = (raw) => {
    const trimmed = raw.trim().replace(/\s+/g, '');
    return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
  };

  const startOtpTimer = () => {
    setOtpCountdown(60);
  };

  const handleRequestOtp = async () => {
    resetStatus();
    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.requestStudentOtp({ phone: normalizePhone(phone) });
      setMessage(response.message || 'OTP sent. Please check your phone.');
      setOtpRequested(true);
      if (response.otp) {
        setOtpPreview(`Dev OTP: ${response.otp}`);
      }
      startOtpTimer();
    } catch (err) {
      console.error('[StudentLogin] OTP request failed:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to send OTP. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    resetStatus();
    setOtpPreview('');
    if (!phone || !otp) {
      setError('Phone and OTP are required.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.loginStudent({
        phone: normalizePhone(phone),
        otp: otp.trim()
      });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezUser', JSON.stringify(data.user));
      document.cookie = 'bitezAuth=student; path=/; max-age=86400';
      setMessage('Login successful. Redirecting...');
      navigate('/order');
    } catch (err) {
      console.error('[StudentLogin] Login failed:', err);
      setError(err?.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    resetStatus();
    setIsLoading(true);
    try {
      const data = await api.loginStudentGoogle({ token: credentialResponse.credential });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezUser', JSON.stringify(data.user));
      document.cookie = 'bitezAuth=student; path=/; max-age=86400';
      setMessage('Login successful. Redirecting...');
      navigate('/order');
    } catch (err) {
      console.error('[StudentLogin] Google Login failed:', err);
      setError(err?.response?.data?.message || err.message || 'Google Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const features = [
    { icon: <Zap size={20} className="text-orange-500" />, title: 'Zero Wait Time', desc: 'Pre-order from your classroom and grab your meal instantly.' },
    { icon: <MapPin size={20} className="text-rose-500" />, title: 'Live Tracking', desc: 'Get real-time notifications as your food is prepared.' },
    { icon: <CreditCard size={20} className="text-emerald-500" />, title: 'One-Tap Pay', desc: 'Lightning-fast checkouts with your preferred payment.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
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
        className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Navbar */}
      <nav className="relative z-10 p-6 glass-panel border-b border-white/20 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer hover:opacity-80 transition"
          >
            <img src="/bitez-logo.svg" alt="Bitez" className="h-10 w-auto" />
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - About / Features */}
          <div className="hidden lg:block space-y-8">
            <ScrollReveal variant="fadeRight" delay={0.1}>
              <h1 className="text-5xl font-black text-slate-900 leading-tight">
                Skip The Queue.<br />
                <span className="text-gradient">Savor The Flavor.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fadeRight" delay={0.25}>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Join 2,000+ students who order food ahead, skip long lines, and pick up hot meals exactly when they're ready.
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
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
                </div>
                <p className="text-sm font-semibold text-slate-500">Loved by 2,000+ students daily</p>
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
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="w-20 h-20 mx-auto bg-gradient-to-tr from-orange-400 to-rose-500 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30 rotate-3"
              >
                <User size={36} />
              </motion.div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                Log in to order your favorite food.
              </p>
            </div>

            {/* Message Display */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-semibold"
                >
                  {message}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 font-semibold"
                >
                  {error}
                </motion.div>
              )}
              {otpPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 font-semibold"
                >
                  {otpPreview}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <div className="space-y-5">
              {!otpRequested && (
                <>
                  <div className="flex justify-center mb-6">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google Login Failed')}
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="pill"
                      />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-4 my-6 opacity-60">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or login via phone</div>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                </>
              )}

              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={(e) => setPhone(normalizePhone(e.target.value))}
                  disabled={otpRequested}
                  className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50 disabled:bg-slate-50"
                />
              </div>

              <div className="space-y-3">
                {!otpRequested ? (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25 hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    <ShieldCheck size={20} className={isLoading ? 'animate-pulse' : ''} />
                  </motion.button>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold tracking-[0.2em] text-center text-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25 hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                        <ChevronRight size={20} />
                      </motion.button>
                      <div className="flex justify-between items-center text-sm px-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpRequested(false);
                            setOtp('');
                            resetStatus();
                          }}
                          disabled={isLoading}
                          className="text-slate-500 font-bold hover:text-slate-800 transition-colors disabled:opacity-50"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          disabled={isLoading || otpCountdown > 0}
                          className={`font-bold transition-colors ${otpCountdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700'}`}
                        >
                          {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : 'Resend OTP'}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs font-semibold text-slate-400">
                By logging in, you agree to our Terms of Service and Privacy Policy. Mobile numbers are securely verified via OTP authentication.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
