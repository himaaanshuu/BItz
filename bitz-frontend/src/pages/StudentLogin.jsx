import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Eye, EyeOff, ChevronRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpPreview, setOtpPreview] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const resetStatus = () => {
    setMessage('');
    setError('');
  };

  const startOtpTimer = () => {
    setOtpCountdown(60);
  };

  const handleSignup = async () => {
    resetStatus();
    if (!name || !email || !password || !phone) {
      setError('Please fill in name, email, phone, and password.');
      return;
    }

    setIsLoading(true);
    try {
      await api.registerStudent({ name, email, password, phone });
      setMessage('Account created. Please request OTP to login.');
      setIsSignup(false);
      setOtpRequested(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    resetStatus();
    if (!email || !phone) {
      setError('Please enter your email and phone number.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.requestStudentOtp({ email, phone });
      setMessage(response.message || 'OTP sent. Please check your email and phone.');
      setOtpRequested(true);
      if (response.otp) {
        setOtpPreview(`Dev OTP: ${response.otp}`);
      }
      startOtpTimer();
    } catch (err) {
      setError(err.message);
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
      const data = await api.loginStudent({ email, password, otp: otp.trim() });
      localStorage.setItem('bitezAuthToken', data.token);
      localStorage.setItem('bitezUser', JSON.stringify(data.user));
      document.cookie = 'bitezAuth=student; path=/; max-age=86400';
      setMessage('Login successful. Redirecting...');
      navigate('/order');
    } catch (err) {
      setError(err.message);
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

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsSignup(true);
      setOtpRequested(false);
      setOtp('');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-orange-600 hover:text-orange-500"
          >
            BITEZ
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">

          {/* Header */}
          <div className="text-center mb-8">
            <User className="mx-auto mb-4 text-orange-600" size={64} />
            <h2 className="text-4xl font-black text-gray-900">
              {isSignup ? 'Student Sign Up' : 'Student Login'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isSignup
                ? 'Create your student account'
                : 'Login to order your food'}
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
          <div className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Student Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
            />

            {!isSignup && (
              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            )}

            {(isSignup || otpRequested) && (
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl pr-12 focus:border-orange-500 focus:outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            )}

            <div className="space-y-2">
              {isSignup ? (
                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Creating...' : 'Create Account'} <ChevronRight className="inline" size={20} />
                </button>
              ) : (
                <>
                  {!otpRequested ? (
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-70"
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'} <ShieldCheck className="inline" size={20} />
                    </button>
                  ) : (
                    <>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-70"
                      >
                        {isLoading ? 'Logging in...' : 'Verify & Login'} <ChevronRight className="inline" size={20} />
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
                </>
              )}
            </div>
          </div>

          {/* TOGGLE */}
          <div className="mt-6 text-center">
            <span
              onMouseDown={() => {
                setIsSignup(!isSignup);
                setName('');
                setEmail('');
                setPassword('');
                setPhone('');
                setOtp('');
                setOtpRequested(false);
                setOtpPreview('');
                setMessage('');
                setError('');
              }}
              className="text-orange-600 font-semibold hover:underline cursor-pointer"
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </span>
          </div>

          {!isSignup && (
            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200 text-center">
              <p className="text-sm font-semibold text-orange-800">
                OTP is required for every login.
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Use your registered phone and email to receive the code.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentLogin;