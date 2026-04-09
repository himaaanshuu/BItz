import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, ChevronRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';

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

  const normalizeEmail = (raw) => raw.trim().toLowerCase();

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

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      {/* Background Decorators */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Navbar */}
      <nav className="relative z-10 p-6 glass-panel border-b border-white border-opacity-50 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-black text-2xl tracking-tight flex items-center gap-2 text-slate-800 hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex justify-center items-center text-white text-xl">
              B
            </div>
            ITEZ.
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="glass p-10 max-w-md w-full rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-orange-400 to-rose-500 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30 rotate-3 hover:rotate-0 transition-transform">
              <User size={36} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Log in to order your favorite food.
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          {otpPreview && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
              {otpPreview}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-5">
            {!otpRequested && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="hover:scale-105 transition-transform">
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
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  <ShieldCheck size={20} className={isLoading ? 'animate-pulse' : ''} />
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-orange-600 text-white py-3.5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                    <ChevronRight size={20} />
                  </button>
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
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs font-semibold text-slate-400">
              By logging in, you agree to our Terms of Service and Privacy Policy. Mobile numbers are securely verified via OTP authentication.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLogin;