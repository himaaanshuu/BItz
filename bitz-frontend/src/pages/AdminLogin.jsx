import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ChevronRight, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canteenName, setCanteenName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Demo canteens
  const existingCanteens = [
    {
      id: 'main_canteen',
      email: 'main@canteen.com',
      password: 'main123',
      canteenName: 'Main Canteen',
      location: 'Ground Floor, Building A',
      phone: '+91 98765 43210'
    },
    {
      id: 'south_canteen',
      email: 'south@canteen.com',
      password: 'south123',
      canteenName: 'South Canteen',
      location: '2nd Floor, Building B',
      phone: '+91 98765 43211'
    }
  ];

  // Quick Login
  const handleQuickLogin = (canteen) => {
    localStorage.removeItem('bitezToken');
    localStorage.removeItem('bitezStudent');

    localStorage.setItem(
      'bitezAdmin',
      JSON.stringify({
        id: canteen.id,
        email: canteen.email,
        canteenName: canteen.canteenName,
        phone: canteen.phone,
        location: canteen.location,
        isNewCanteen: false
      })
    );

    localStorage.setItem('bitezAdminToken', 'admin_' + Date.now());
    navigate('/admin-dashboard');
  };

  const handleManualLogin = () => {
    const canteen = existingCanteens.find(
      c => c.email === email && c.password === password
    );

    if (!canteen) {
      alert('❌ Invalid credentials');
      return;
    }

    handleQuickLogin(canteen);
  };

  // ✅ SIGNUP (Create Account)
  const handleSignup = () => {
    if (!email || !password || !canteenName || !phone || !location) {
      alert('⚠️ Please fill all fields!');
      return;
    }

    localStorage.removeItem('bitezToken');
    localStorage.removeItem('bitezStudent');

    localStorage.setItem(
      'bitezAdmin',
      JSON.stringify({
        id: 'canteen_' + Date.now(),
        email,
        canteenName,
        phone,
        location,
        isNewCanteen: true
      })
    );

    localStorage.setItem('bitezAdminToken', 'admin_' + Date.now());
    alert('✅ Account created successfully!');
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">

          <div className="text-center mb-8">
            <Store className="mx-auto mb-4 text-orange-600" size={64} />
            <h2 className="text-4xl font-black">
              {isSignup ? 'Register Canteen' : 'Canteen Admin Login'}
            </h2>
          </div>

          <div className="space-y-4">

            {isSignup && (
              <>
                <input
                  placeholder="Canteen Name"
                  value={canteenName}
                  onChange={e => setCanteenName(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
                <input
                  placeholder="Location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
                <input
                  placeholder="Phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </>
            )}

            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl"
            />

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

            <button
              onClick={isSignup ? handleSignup : handleManualLogin}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold"
            >
              {isSignup ? 'Create Account' : 'Login'} <ChevronRight className="inline" />
            </button>
          </div>

          {/* 🔁 TOGGLE LOGIN / SIGNUP */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-orange-600 font-semibold hover:underline"
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have a canteen account? Create one"}
            </button>
          </div>

          {/* Quick Login */}
          {!isSignup && (
            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-center font-bold mb-3">🔐 Quick Login</p>
              {existingCanteens.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleQuickLogin(c)}
                  className="w-full p-3 mb-2 bg-white rounded-lg border hover:border-orange-500"
                >
                  <p className="font-bold">{c.canteenName}</p>
                  <p className="text-xs">{c.email}</p>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;