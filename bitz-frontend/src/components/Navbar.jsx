import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  User,
  ShoppingBag,
  LogOut,
  ChevronDown,
  Settings,
  BarChart3,
  Menu as MenuIcon,
  X,
  Home,
  Package,
  History,
  ArrowRight,
} from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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
      if (a) {
        const d = JSON.parse(a);
        return d.canteenName || d.name || 'Admin';
      }
    }
    return '';
  });

  const navigate = useNavigate();

  const refreshAuthState = useCallback(() => {
    const authToken = localStorage.getItem('bitezAuthToken');
    const roleCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('bitezAuth='));
    const role = roleCookie ? roleCookie.split('=')[1] : '';
    setIsLoggedIn(
      !!(
        authToken &&
        ((role === 'student' && localStorage.getItem('bitezUser')) ||
          (role === 'admin' && localStorage.getItem('bitezAdmin')))
      )
    );
    setUserType(role);
    if (role === 'student') {
      const u = localStorage.getItem('bitezUser');
      setUserName(u ? JSON.parse(u).name || '' : '');
    } else if (role === 'admin') {
      const a = localStorage.getItem('bitezAdmin');
      if (a) {
        const d = JSON.parse(a);
        setUserName(d.canteenName || d.name || 'Admin');
      } else {
        setUserName('');
      }
    } else {
      setUserName('');
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => refreshAuthState();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [refreshAuthState]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const cur = window.scrollY;
          const delta = cur - lastScrollY.current;
          setScrolled(cur > 20);
          if (cur < 10) setVisible(true);
          else if (delta > 5) {
            setVisible(false);
            setIsDropdownOpen(false);
            setMobileOpen(false);
          } else if (delta < -5) setVisible(true);
          lastScrollY.current = cur;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

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
    { label: 'Explore', path: '/' },
    { label: 'How It Works', path: '/about' },
    { label: 'Campus', path: '/campus' },
    { label: 'About', path: '/about' },
  ];

  const studentLinks = [
    { label: 'Order Food', path: '/order', icon: ShoppingBag },
    { label: 'Track Orders', path: '/track', icon: Package },
    { label: 'Order History', path: '/order-history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: BarChart3 },
    { label: 'Settings', path: '/admin-settings', icon: Settings },
  ];

  const userLinks = userType === 'student' ? studentLinks : adminLinks;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl border-b border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Logo */}
            <motion.div
              onClick={() => {
                navigate('/');
                setMobileOpen(false);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer flex items-center shrink-0"
            >
              <img
                src="/bitez-logo.svg"
                alt="Bitez"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? 'h-8' : 'h-9'
                }`}
              />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <a
                    key={link.path + link.label}
                    onClick={() => navigate(link.path)}
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-orange-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/auth')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full transition-colors"
                  >
                    Log In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(249,115,22,0.35)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                  >
                    Order Now
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.button>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-slate-700 pl-2 pr-3 py-1.5 rounded-full font-semibold border border-slate-200/80 hover:border-orange-300 hover:text-orange-600 shadow-sm transition-all duration-300"
                  >
                    <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-1.5 rounded-full text-white shadow-sm">
                      <User size={14} strokeWidth={2.5} />
                    </div>
                    <span className="hidden lg:inline text-sm">Account</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 text-slate-400 ${
                        isDropdownOpen ? 'rotate-180 text-orange-500' : ''
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, scale: 0.96, filter: 'blur(4px)' }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 overflow-hidden z-50 border border-slate-100"
                      >
                        <div className="px-5 py-4 bg-gradient-to-br from-orange-50/80 to-rose-50/60 border-b border-slate-100">
                          <p className="font-bold text-slate-800 truncate text-base">
                            {userName}
                          </p>
                          <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">
                            {userType}
                          </p>
                        </div>
                        <div className="py-1.5">
                          {userLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                              <motion.button
                                key={item.label}
                                whileHover={{ x: 3 }}
                                onClick={() => {
                                  navigate(item.path);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-5 py-3 text-gray-600 hover:bg-orange-50/80 hover:text-orange-700 transition-colors"
                              >
                                <Icon size={17} className="text-orange-500" strokeWidth={2} />
                                <span className="font-medium text-sm">{item.label}</span>
                              </motion.button>
                            );
                          })}
                          <div className="border-t border-slate-100 my-1.5 mx-4" />
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50/80 transition-colors"
                          >
                            <LogOut size={17} strokeWidth={2} />
                            <span className="font-medium text-sm">Log Out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100/80 transition-colors"
            >
              {mobileOpen ? <X size={22} strokeWidth={2.5} /> : <MenuIcon size={22} strokeWidth={2.5} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 top-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.05, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mx-4 mt-24 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-900/15 border border-white/60 overflow-hidden"
            >
              {isLoggedIn && (
                <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-br from-orange-50/60 to-rose-50/40">
                  <p className="font-bold text-slate-800 text-lg">{userName}</p>
                  <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">
                    {userType}
                  </p>
                </div>
              )}

              <div className="py-3 px-2">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.button
                      key={link.path + link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.3 }}
                      onClick={() => {
                        navigate(link.path);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center px-5 py-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-orange-600 bg-orange-50/80'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl font-bold">{link.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-orange-500" />
                      )}
                    </motion.button>
                  );
                })}

                {isLoggedIn && (
                  <>
                    <div className="border-t border-slate-100 my-2 mx-4" />
                    {userLinks.map((link, i) => {
                      const Icon = link.icon;
                      return (
                        <motion.button
                          key={link.path}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 * (navLinks.length + i), duration: 0.3 }}
                          onClick={() => {
                            navigate(link.path);
                            setMobileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3.5 text-slate-600 hover:bg-orange-50/60 hover:text-orange-600 transition-all rounded-xl"
                        >
                          <Icon size={18} className="text-orange-500" strokeWidth={2} />
                          <span className="font-semibold text-base">{link.label}</span>
                        </motion.button>
                      );
                    })}
                    <div className="border-t border-slate-100 my-2 mx-4" />
                    <motion.button
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 * (navLinks.length + userLinks.length),
                        duration: 0.3,
                      }}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-red-500 hover:bg-red-50/60 transition-all rounded-xl"
                    >
                      <LogOut size={18} strokeWidth={2} />
                      <span className="font-semibold text-base">Log Out</span>
                    </motion.button>
                  </>
                )}

                {!isLoggedIn && (
                  <>
                    <div className="border-t border-slate-100 my-2 mx-4" />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 * navLinks.length,
                        duration: 0.3,
                      }}
                      className="px-4 py-3"
                    >
                      <button
                        onClick={() => {
                          navigate('/auth');
                          setMobileOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                      >
                        Order Now
                        <ArrowRight size={17} strokeWidth={2.5} />
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
