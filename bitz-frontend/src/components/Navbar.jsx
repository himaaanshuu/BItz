import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Clock, LogOut, ChevronDown, Settings, BarChart3, Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState(''); // 'student' or 'admin'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if student is logged in
    const studentToken = localStorage.getItem('bitezToken');
    const studentUser = localStorage.getItem('bitezUser');
    
    // Check if admin is logged in
    const adminToken = localStorage.getItem('bitezAdminToken');
    const adminUser = localStorage.getItem('bitezAdmin');
    
    if (studentToken && studentUser) {
      setIsLoggedIn(true);
      setUserType('student');
      const userData = JSON.parse(studentUser);
      setUserName(userData.name);
    } else if (adminToken && adminUser) {
      setIsLoggedIn(true);
      setUserType('admin');
      const adminData = JSON.parse(adminUser);
      setUserName(adminData.canteenName);
    }
  }, []);

  const handleLogout = () => {
    if (userType === 'student') {
      localStorage.removeItem('bitezToken');
      localStorage.removeItem('bitezUser');
    } else if (userType === 'admin') {
      localStorage.removeItem('bitezAdminToken');
      localStorage.removeItem('bitezAdmin');
    }
    
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

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')}
          className="text-white font-bold text-3xl cursor-pointer"
        >
          BITEZ.
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-white font-medium hover:text-gray-200 transition cursor-pointer">
            Home
          </a>
          <a href="#about" className="text-white font-medium hover:text-gray-200 transition cursor-pointer">
            About
          </a>
          
          {!isLoggedIn ? (
            <>
              <button 
                onClick={handleStudentLogin}
                className="text-white font-medium hover:text-gray-200 transition cursor-pointer bg-transparent border-none"
              >
                Student Login
              </button>
              <button 
                onClick={handleAdminLogin}
                className="text-white font-medium hover:text-gray-200 transition cursor-pointer bg-transparent border-none"
              >
                Admin Login
              </button>
            </>
          ) : (
            /* Account Dropdown */
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                <User size={20} />
                <span>Account</span>
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl overflow-hidden z-50 border border-gray-100">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    <p className="font-semibold truncate">{userName}</p>
                    <p className="text-sm opacity-90 capitalize">{userType}</p>
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