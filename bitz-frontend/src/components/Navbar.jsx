import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Clock, LogOut, ChevronDown, Settings, BarChart3, Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authToken = localStorage.getItem('bitezAuthToken');
    const roleCookie = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('bitezAuth='));
    const role = roleCookie ? roleCookie.split('=')[1] : '';
    return !!(authToken && ((role === 'student' && localStorage.getItem('bitezUser')) || (role === 'admin' && localStorage.getItem('bitezAdmin'))));
  });

  const [userType, setUserType] = useState(() => {
    const roleCookie = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('bitezAuth='));
    return roleCookie ? roleCookie.split('=')[1] : '';
  });

  const [userName, setUserName] = useState(() => {
    const roleCookie = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('bitezAuth='));
    const role = roleCookie ? roleCookie.split('=')[1] : '';
    
    if (role === 'student') {
      const studentUser = localStorage.getItem('bitezUser');
      if (studentUser) return JSON.parse(studentUser).name || '';
    } else if (role === 'admin') {
      const adminUser = localStorage.getItem('bitezAdmin');
      if (adminUser) {
        const adminData = JSON.parse(adminUser);
        return adminData.canteenName || adminData.name || 'Admin';
      }
    }
    return '';
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Only used to re-validate if needed, but not to initialize state
  }, []);

  const handleLogout = () => {
    if (userType === 'student') {
      localStorage.removeItem('bitezUser');
    } else if (userType === 'admin') {
      localStorage.removeItem('bitezAdmin');
    }
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
    alert('Logged out successfully!');
  };

  const handleMenuClick = (option) => {
    setIsDropdownOpen(false);

    if (userType === 'student') {
      if (option === 'Profile') {
        navigate('/profile');
      } else if (option === 'Order History') {
        navigate('/order-history');
      } else if (option === 'Current Order') {
        navigate('/current-order');
      }
    } else if (userType === 'admin') {
      if (option === 'Dashboard') {
        navigate('/admin-dashboard');
      } else if (option === 'Menu Management') {
        navigate('/admin-dashboard'); // Scroll to menu section
      } else if (option === 'Settings') {
        navigate('/admin-settings');
      } else if (option === 'Analytics') {
        navigate('/admin-analytics');
      }
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/20 px-8 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="font-black text-3xl cursor-pointer tracking-tight flex items-center gap-2 text-slate-800 hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex justify-center items-center text-white text-xl">B</div>
          ITEZ.
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a onClick={() => navigate('/')} className="text-slate-600 font-semibold hover:text-orange-600 transition cursor-pointer">
            Explore
          </a>
          <a onClick={() => navigate('/about')} className="text-slate-600 font-semibold hover:text-orange-600 transition cursor-pointer">
            About
          </a>

          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Log In
            </button>
          ) : (
            /* Account Dropdown */
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full font-bold border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm transition group"
              >
                <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                  <User size={16} />
                </div>
                <span>Account</span>
                <ChevronDown size={14} className={`transition-transform text-slate-400 group-hover:text-orange-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                    <p className="font-bold text-slate-800 truncate text-lg">{userName}</p>
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{userType}</p>
                  </div>

                  {/* Menu Items for Student */}
                  {userType === 'student' && (
                    <div className="py-2">
                      <button
                        onClick={() => handleMenuClick('Profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <User size={18} className="text-orange-600" />
                        <span className="font-medium">Profile</span>
                      </button>

                      <button
                        onClick={() => handleMenuClick('Order History')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <ShoppingBag size={18} className="text-orange-600" />
                        <span className="font-medium">Order History</span>
                      </button>

                      <button
                        onClick={() => handleMenuClick('Current Order')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <Clock size={18} className="text-orange-600" />
                        <span className="font-medium">Current Order</span>
                      </button>

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}

                  {/* Menu Items for Admin */}
                  {userType === 'admin' && (
                    <div className="py-2">
                      <button
                        onClick={() => handleMenuClick('Dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <BarChart3 size={18} className="text-orange-600" />
                        <span className="font-medium">Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleMenuClick('Menu Management')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <MenuIcon size={18} className="text-orange-600" />
                        <span className="font-medium">Menu Management</span>
                      </button>

                      <button
                        onClick={() => handleMenuClick('Analytics')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <BarChart3 size={18} className="text-orange-600" />
                        <span className="font-medium">Analytics</span>
                      </button>

                      <button
                        onClick={() => handleMenuClick('Settings')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                      >
                        <Settings size={18} className="text-orange-600" />
                        <span className="font-medium">Settings</span>
                      </button>

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;