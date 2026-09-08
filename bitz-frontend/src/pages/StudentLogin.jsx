import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import PhoneInput from '../components/PhoneInput';

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

  const resetStatus = () => { setMessage(''); setError(''); };
  const normalizePhone = (raw) => { const t = raw.trim().replace(/\s+/g, ''); return t.startsWith('+') ? t : `+${t}`; };
  const startOtpTimer = () => setOtpCountdown(60);

  const handleRequestOtp = async () => {
    resetStatus();
    if (!phone) { setError('Please enter your phone number.'); return; }
    setIsLoading(true);
    try {
      const response = await api.requestStudentOtp({ phone: normalizePhone(phone) });
      setMessage(response.message || 'OTP sent. Please check your phone.');
      setOtpRequested(true);
      if (response.warning) setError(response.warning);
      if (import.meta.env.DEV && response.otp) setOtpPreview(`Dev OTP: ${response.otp}`);
      startOtpTimer();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to send OTP.');
    } finally { setIsLoading(false); }
  };

  const handleLogin = async () => {
    resetStatus(); setOtpPreview('');
    if (!phone || !otp) { setError('Phone and OTP are required.'); return; }
    setIsLoading(true);
    try {
      const data = await api.loginStudent({ phone: normalizePhone(phone), otp: otp.trim() });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezUser', JSON.stringify(data.user));
      localStorage.setItem('bitezStudentLoginTime', Date.now().toString());
      document.cookie = 'bitezAuth=student; path=/; max-age=259200';
      navigate('/order');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed.');
    } finally { setIsLoading(false); }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    resetStatus(); setIsLoading(true);
    try {
      const data = await api.loginStudentGoogle({ token: credentialResponse.credential });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezUser', JSON.stringify(data.user));
      localStorage.setItem('bitezStudentLoginTime', Date.now().toString());
      document.cookie = 'bitezAuth=student; path=/; max-age=259200';
      navigate('/order');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Google Login failed.');
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => setOtpCountdown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <img src="/bitez-logo.svg" alt="Bitez" className="h-7 w-auto" />
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-6 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/25"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </motion.div>
          <h1 className="text-2xl font-black text-slate-900">Student Login</h1>
          <p className="text-slate-500 text-sm mt-1">Enter your phone number to get started</p>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-semibold">{message}</motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 font-semibold">{error}</motion.div>
          )}
          {otpPreview && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 font-semibold">{otpPreview}</motion.div>
          )}
        </AnimatePresence>

        {/* Google Login */}
        {!otpRequested && (
          <div className="mb-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
              />
            </div>
          </div>
        )}

        {/* Divider */}
        {!otpRequested && (
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-slate-400 uppercase">or</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
        )}

        {/* Phone Input */}
        <div className="mb-4">
          <PhoneInput value={phone} onChange={setPhone} disabled={otpRequested} placeholder="Phone number" />
        </div>

        {/* OTP Input */}
        <AnimatePresence>
          {otpRequested && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl font-bold tracking-[0.3em] text-center text-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        {!otpRequested ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRequestOtp}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
            <ShieldCheck size={18} />
          </motion.button>
        ) : (
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
              <ChevronRight size={18} />
            </motion.button>
            <div className="flex justify-between items-center px-1">
              <button onClick={() => { setOtpRequested(false); setOtp(''); resetStatus(); }} className="text-sm font-bold text-slate-500">
                <ArrowLeft size={14} className="inline mr-1" />Back
              </button>
              <button onClick={handleRequestOtp} disabled={isLoading || otpCountdown > 0}
                className={`text-sm font-bold ${otpCountdown > 0 ? 'text-slate-400' : 'text-orange-600'}`}>
                {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : 'Resend OTP'}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-8 px-4">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
