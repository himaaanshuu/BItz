import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Clock, LogOut, ChevronDown, Settings, BarChart3, Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          setScrolled(currentScrollY > 20);

          // Hide when scrolling down past threshold, show when scrolling up
          if (currentScrollY < 10) {
            // Always show near top
            setVisible(true);
          } else if (scrollDelta > 5) {
            // Scrolling down
            setVisible(false);
            setIsDropdownOpen(false);
          } else if (scrollDelta < -5) {
            // Scrolling up
            setVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
      if (touchStart === null) return;
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;

      if (delta > 30) {
        // Swiped up (scrolling down)
        setVisible(false);
        setIsDropdownOpen(false);
      } else if (delta < -30) {
        // Swiped down (scrolling up)
        setVisible(true);
      }
      setTouchStart(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart]);

  // Always show navbar on top of page
  useEffect(() => {
    const checkTop = () => {
      if (window.scrollY < 10) setVisible(true);
    };
    window.addEventListener('scroll', checkTop, { passive: true });
    return () => window.removeEventListener('scroll', checkTop);
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
      if (option === 'Profile') navigate('/profile');
      else if (option === 'Order History') navigate('/order-history');
      else if (option === 'Current Order') navigate('/current-order');
    } else if (userType === 'admin') {
      if (option === 'Dashboard') navigate('/admin-dashboard');
      else if (option === 'Menu Management') navigate('/admin-dashboard');
      else if (option === 'Settings') navigate('/admin-settings');
      else if (option === 'Analytics') navigate('/admin-analytics');
    }
  };

  const handleLogin = () => navigate('/auth');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-3 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-900/5'
          : 'bg-white/70 backdrop-blur-2xl border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          onClick={() => {
            navigate('/');
            setVisible(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer flex items-center"
        >
          <img
            src="/bitez-logo.svg"
            alt="Bitez"
            className="h-10 w-auto"
          />
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a onClick={() => navigate('/')} className="text-slate-600 font-semibold hover:text-orange-600 transition cursor-pointer">
            Explore
          </a>
          <a onClick={() => navigate('/about')} className="text-slate-600 font-semibold hover:text-orange-600 transition cursor-pointer">
            About
          </a>

          {!isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl"
            >
              Log In
            </motion.button>
          ) : (
            /* Account Dropdown */
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full font-bold border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm transition group"
              >
                <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                  <User size={16} />
                </div>
                <span>Account</span>
                <ChevronDown size={14} className={`transition-transform text-slate-400 group-hover:text-orange-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-100"
                  >
                    {/* User Info */}
                    <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                      <p className="font-bold text-slate-800 truncate text-lg">{userName}</p>
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{userType}</p>
                    </div>

                    {/* Menu Items for Student */}
                    {userType === 'student' && (
                      <div className="py-2">
                        {[
                          { label: 'Profile', icon: <User size={18} className="text-orange-600" />, action: 'Profile' },
                          { label: 'Order History', icon: <ShoppingBag size={18} className="text-orange-600" />, action: 'Order History' },
                          { label: 'Current Order', icon: <Clock size={18} className="text-orange-600" />, action: 'Current Order' },
                        ].map((item) => (
                          <motion.button
                            key={item.label}
                            whileHover={{ x: 4 }}
                            onClick={() => handleMenuClick(item.action)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                          </motion.button>
                        ))}
                        <div className="border-t border-gray-200 my-2"></div>
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    )}

                    {/* Menu Items for Admin */}
                    {userType === 'admin' && (
                      <div className="py-2">
                        {[
                          { label: 'Dashboard', icon: <BarChart3 size={18} className="text-orange-600" />, action: 'Dashboard' },
                          { label: 'Menu Management', icon: <MenuIcon size={18} className="text-orange-600" />, action: 'Menu Management' },
                          { label: 'Analytics', icon: <BarChart3 size={18} className="text-orange-600" />, action: 'Analytics' },
                          { label: 'Settings', icon: <Settings size={18} className="text-orange-600" />, action: 'Settings' },
                        ].map((item) => (
                          <motion.button
                            key={item.label}
                            whileHover={{ x: 4 }}
                            onClick={() => handleMenuClick(item.action)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                          </motion.button>
                        ))}
                        <div className="border-t border-gray-200 my-2"></div>
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
