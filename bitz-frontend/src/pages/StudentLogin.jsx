import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Eye, EyeOff, ChevronRight } from 'lucide-react';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = () => {
    console.log('Button clicked!', { isSignup, email, password, name });
    setMessage('Button clicked! Processing...');

    if (isSignup) {
      // Signup validation
      if (!name || !email || !password) {
        const msg = '⚠️ Please fill all required fields (Name, Email, Password)';
        alert(msg);
        setMessage(msg);
        return;
      }

      const userData = {
        name,
        email,
        phone: phone || '+91 9876543210',
        studentId: studentId || 'STU' + Math.floor(Math.random() * 10000)
      };

      try {
        sessionStorage.setItem('bitezToken', 'student_' + Date.now());
        sessionStorage.setItem('bitezUser', JSON.stringify(userData));
        const msg = '✅ Account created successfully! Data stored in sessionStorage.';
        alert(msg);
        setMessage(msg);
      } catch (error) {
        const msg = '❌ Error: ' + error.message;
        alert(msg);
        setMessage(msg);
      }
    } else {
      // Login validation
      if (!email || !password) {
        const msg = '⚠️ Please enter email and password';
        alert(msg);
        setMessage(msg);
        return;
      }

      const userData = {
        name: name || 'Student User',
        email,
        phone: phone || '+91 9876543210',
        studentId: studentId || 'STU' + Math.floor(Math.random() * 10000)
      };

      try {
        const token = 'student_' + Date.now();
        localStorage.setItem('bitezToken', token);
        localStorage.setItem('bitezUser', JSON.stringify(userData));
        sessionStorage.setItem('bitezToken', token);
        sessionStorage.setItem('bitezUser', JSON.stringify(userData));
        document.cookie = 'bitezAuth=student; path=/; max-age=86400';
        const msg = '✅ Login successful! Data stored in localStorage.';
        alert(msg);
        setMessage(msg);
        navigate('/order');
      } catch (error) {
        const msg = '❌ Error: ' + error.message;
        alert(msg);
        setMessage(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-orange-600">BITEZ</h1>
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
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              {message}
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
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Student ID (Optional)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
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

            <div className="space-y-2">
              <span
                onMouseDown={handleSubmit}
                className="block w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all text-center cursor-pointer select-none active:scale-95"
              >
                {isSignup ? 'Create Account' : 'Login'} <ChevronRight className="inline" size={20} />
              </span>
              
              {/* Debug button */}
              <span
                onMouseDown={() => alert('Test button works!')}
                className="block w-full bg-gray-600 text-white py-2 rounded-lg text-sm text-center cursor-pointer select-none"
              >
                Test Click (Debug)
              </span>
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
                setStudentId('');
                setMessage('');
              }}
              className="text-orange-600 font-semibold hover:underline cursor-pointer"
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </span>
          </div>

          {/* DEMO INFO */}
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200 text-center">
            <p className="text-sm font-semibold text-orange-800">
              Demo: Any email & password works
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Data stored in sessionStorage (bitezUser, bitezToken)
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLogin;