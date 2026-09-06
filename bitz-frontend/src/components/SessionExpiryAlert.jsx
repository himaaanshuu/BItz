import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogOut, RefreshCw } from 'lucide-react';

const SESSION_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
const WARNING_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours before expiry

const SessionExpiryAlert = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const checkSession = () => {
      const roleCookie = document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('bitezAuth='));
      const role = roleCookie ? roleCookie.split('=')[1] : '';
      
      if (!role) return;

      const loginTimeKey = role === 'admin' ? 'bitezAdminLoginTime' : 'bitezStudentLoginTime';
      const loginTime = parseInt(localStorage.getItem(loginTimeKey) || '0', 10);
      
      if (!loginTime) return;

      const elapsed = Date.now() - loginTime;
      const remainingTime = SESSION_DURATION - elapsed;

      if (remainingTime <= 0) {
        handleLogout();
        return;
      }

      setRemaining(remainingTime);
      setUserType(role);

      if (remainingTime <= WARNING_THRESHOLD) {
        setShowAlert(true);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bitezAuthToken');
    localStorage.removeItem('bitezUser');
    localStorage.removeItem('bitezAdmin');
    localStorage.removeItem('bitezAdminLoginTime');
    localStorage.removeItem('bitezStudentLoginTime');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setShowAlert(false);
    navigate('/');
  };

  const handleReauth = () => {
    setShowAlert(false);
    if (userType === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/student-login');
    }
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="text-amber-600" size={32} />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 text-center mb-3">
              Session Expiring Soon
            </h2>
            <p className="text-slate-500 text-center font-medium mb-2">
              Your session will expire in{' '}
              <span className="font-bold text-amber-600">{formatTime(remaining)}</span>.
            </p>
            <p className="text-slate-400 text-sm text-center mb-8">
              Save any unsaved work before your session expires.
            </p>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-200 transition"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReauth}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25"
              >
                <RefreshCw size={18} />
                Re-authenticate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionExpiryAlert;
