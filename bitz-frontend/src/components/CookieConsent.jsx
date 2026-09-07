import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bitezCookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('bitezCookieConsent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('bitezCookieConsent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                <Cookie size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-1">We Value Your Privacy</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  We use cookies to maintain your login session, remember your preferences, and improve our services. By continuing to use Bitez, you agree to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={decline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
              >
                Decline
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={accept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 transition shadow-lg shadow-orange-500/25"
              >
                Accept
              </motion.button>
              <button
                onClick={() => setShow(false)}
                className="p-2 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
