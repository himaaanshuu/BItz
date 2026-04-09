import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ChevronRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

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

  // Fix #1: Normalize phone to always include leading +
  const normalizePhone = (raw) => {
    const trimmed = raw.trim().replace(/\s+/g, '');
    return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
  };

  // Fix #2: Normalize email to lowercase + trimmed
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
      if (response.otp) {
        setOtpPreview(`Dev OTP: ${response.otp}`);
      }
      startOtpTimer();
    } catch (err) {
      // Fix #3: Log full error for debugging, show message to user
      console.error('[AdminLogin] OTP request failed:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to send OTP. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    resetStatus();
    setOtpPreview('');

    if (!email || !password || !otp) {
      setError('Email, password, and OTP are required.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.loginAdmin({
        email: normalizeEmail(email),
        password,
        otp,
      });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezAdmin', JSON.stringify(data.user));
      document.cookie = 'bitezAuth=admin; path=/; max-age=86400';
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="glass p-10 max-w-md w-full rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50">

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-slate-800 to-slate-900 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform">
              <Store size={36} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h2>
          </div>

          <div className="space-y-4">
            {message && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 shadow-sm">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 shadow-sm">
                {error}
              </div>
            )}
            {otpPreview && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm font-bold text-amber-700 shadow-sm">
                {otpPreview}
              </div>
            )}

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-500 shadow-sm text-center">
              Admin accounts are securely provisioned. Please use your assigned credentials.
            </div>

            {/* Fix #2: Email normalized on blur for better UX */}
            <input
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={e => setEmail(normalizeEmail(e.target.value))}
              className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50"
            />

            {/* Fix #1: Placeholder shows expected format */}
            <input
              placeholder="Phone (e.g. +911234567890)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onBlur={e => setPhone(normalizePhone(e.target.value))}
              className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50"
            />

            {/* Fix #4: Password shown upfront so all 3 fields are validated together */}
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

            {otpRequested && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold tracking-[0.2em] text-center text-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                />
              </div>
            )}

            {!otpRequested ? (
              <button
                onClick={handleRequestOtp}
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-lg disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Authenticating...' : 'Send OTP'} <ShieldCheck size={20} />
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl font-bold text-lg disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Verifying...' : 'Verify Login'} <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isLoading || otpCountdown > 0}
                  className={`w-full font-bold transition-colors ${otpCountdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : 'Resend Code'}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs font-semibold text-slate-400">
            For technical support or password resets, please contact IT immediately.
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;