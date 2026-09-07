import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';

const ClearAllSection = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const clearAll = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach(c => {
      document.cookie = c.trim().split('=')[0] + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    setShowConfirm(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-2xl border border-red-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-red-100 p-2 rounded-xl">
          <Trash2 size={20} className="text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Clear All Data</h3>
          <p className="text-sm text-slate-500">Reset app and remove all saved data</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4">
        This will clear all login sessions, saved preferences, and cached data. You will be logged out from all devices.
      </p>

      {!showConfirm ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowConfirm(true)}
          className="w-full px-6 py-3 rounded-xl font-bold text-sm text-red-600 border-2 border-red-200 hover:bg-red-50 transition"
        >
          Clear All Data
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-600" />
            <p className="text-sm font-bold text-red-700">Are you sure? This cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-4 py-2 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAll}
              className="flex-1 px-4 py-2 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition"
            >
              Yes, Clear All
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ClearAllSection;
