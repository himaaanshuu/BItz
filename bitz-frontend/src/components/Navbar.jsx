import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Clock, LogOut, ChevronDown, Settings, BarChart3, Menu as MenuIcon, X, Home, Package, History } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authToken = localStorage.getItem('bitezAuthToken');
    const roleCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('bitezAuth='));
    const role = roleCookie ? roleCookie.split('=')[1] : '';
    return !!(authToken && ((role === 'student' && localStorage.getItem('bitezUser')) || (role === 'admin' && localStorage.getItem('bitezAdmin'))));
  });

  const [userType, setUserType] = useState(() => {
    const roleCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('bitezAuth='));
    return roleCookie ? roleCookie.split('=')[1] : '';
  });

  const [userName, setUserName] = useState(() => {
    const roleCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('bitezAuth='));
    const role = roleCookie ? roleCookie.split('=')[1] : '';
    if (role === 'student') {
      const u = localStorage.getItem('bitezUser');
      if (u) return JSON.parse(u).name || '';
    } else if (role === 'admin') {
      const a = localStorage.getItem('bitezAdmin');
      if (a) { const d = JSON.parse(a); return d.canteenName || d.name || 'Admin'; }
    }
    return '';
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const cur = window.scrollY;
          const delta = cur - lastScrollY.current;
          setScrolled(cur > 20);
          if (cur < 10) setVisible(true);
          else if (delta > 5) { setVisible(false); setIsDropdownOpen(false); setMobileOpen(false); }
          else if (delta < -5) setVisible(true);
          lastScrollY.current = cur;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientY);
    const handleTouchEnd = (e) => {
      if (touchStart === null) return;
      const delta = touchStart - e.changedTouches[0].clientY;
      if (delta > 30) { setVisible(false); setIsDropdownOpen(false); setMobileOpen(false); }
      else if (delta < -30) setVisible(true);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (userType === 'student') localStorage.removeItem('bitezUser');
    else if (userType === 'admin') localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAuthToken');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={18} /> },
    { label: 'About', path: '/about', icon: <Home size={18} /> },
  ];

  const studentLinks = [
    { label: 'Order Food', path: '/order', icon: <ShoppingBag size={18} /> },
    { label: 'Track Orders', path: '/track', icon: <Package size={18} /> },
    { label: 'Order History', path: '/order-history', icon: <History size={18} /> },
    { label: 'Profile', path: '/profile', icon: <User size={18} /> },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: <BarChart3 size={18} /> },
    { label: 'Settings', path: '/admin-settings', icon: <Settings size={18} /> },
  ];

  const userLinks = userType === 'student' ? studentLinks : adminLinks;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-900/5'
            : 'bg-white/70 backdrop-blur-2xl border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            onClick={() => { navigate('/'); setMobileOpen(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex items-center"
          >
            <img src="/bitez-logo.svg" alt="Bitez" className="h-9 md:h-10 w-auto" />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-slate-600 font-semibold hover:text-orange-600 transition cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl"
              >
                Log In
              </motion.button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full font-bold border border-slate-200 hover:border-orange-500 hover:text-orange-600 shadow-sm transition group"
                >
                  <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                    <User size={16} />
                  </div>
                  <span className="hidden lg:inline">Account</span>
                  <ChevronDown size={14} className={`transition-transform text-slate-400 group-hover:text-orange-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-100"
                    >
                      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                        <p className="font-bold text-slate-800 truncate text-lg">{userName}</p>
                        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{userType}</p>
                      </div>
                      <div className="py-2">
                        {userLinks.map((item) => (
                          <motion.button
                            key={item.label}
                            whileHover={{ x: 4 }}
                            onClick={() => { navigate(item.path); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition"
                          >
                            <span className="text-orange-600">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </motion.button>
                        ))}
                        <div className="border-t border-gray-200 my-2" />
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition"
          >
            {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden"
          >
            <div className="mx-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              {isLoggedIn && (
                <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-rose-50">
                  <p className="font-bold text-slate-800 text-lg">{userName}</p>
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{userType}</p>
                </div>
              )}

              <div className="py-2">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => { navigate(link.path); setMobileOpen(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-slate-700 hover:bg-orange-50 transition font-medium"
                  >
                    {link.icon}
                    {link.label}
                  </button>
                ))}

                {isLoggedIn && (
                  <>
                    <div className="border-t border-slate-100 my-1" />
                    {userLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => { navigate(link.path); setMobileOpen(false); }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-slate-700 hover:bg-orange-50 transition font-medium"
                      >
                        <span className="text-orange-600">{link.icon}</span>
                        {link.label}
                      </button>
                    ))}
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-red-600 hover:bg-red-50 transition font-semibold"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                )}

                {!isLoggedIn && (
                  <>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                      className="w-full mx-5 my-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-xl font-bold text-center hover:from-orange-600 hover:to-rose-600 transition shadow-lg"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
