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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">

          <div className="text-center mb-8">
            <Store className="mx-auto mb-4 text-orange-600" size={64} />
            <h2 className="text-4xl font-black">Canteen Admin Login</h2>
          </div>

          <div className="space-y-4">
            {message && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            {otpPreview && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                {otpPreview}
              </div>
            )}

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700">
              Admin accounts are created by the system administrator. Please login using your assigned credentials.
            </div>

            {/* Fix #2: Email normalized on blur for better UX */}
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={e => setEmail(normalizeEmail(e.target.value))}
              className="w-full px-4 py-3 border-2 rounded-xl"
            />

            {/* Fix #1: Placeholder shows expected format */}
            <input
              placeholder="Phone (e.g. +911234567890)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onBlur={e => setPhone(normalizePhone(e.target.value))}
              className="w-full px-4 py-3 border-2 rounded-xl"
            />

            {/* Fix #4: Password shown upfront so all 3 fields are validated together */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {otpRequested && (
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl"
              />
            )}

            {!otpRequested ? (
              <button
                onClick={handleRequestOtp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold disabled:opacity-70"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'} <ShieldCheck className="inline" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold disabled:opacity-70"
                >
                  {isLoading ? 'Logging in...' : 'Verify & Login'} <ChevronRight className="inline" />
                </button>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isLoading || otpCountdown > 0}
                  className="w-full text-orange-600 font-semibold py-2 hover:underline disabled:opacity-60"
                >
                  {otpCountdown > 0 ? `Resend OTP in ${otpCountdown}s` : 'Resend OTP'}
                </button>
              </>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            OTP is required for admin login. If you need access, contact the system administrator.
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;