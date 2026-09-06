import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const countries = [
  { code: 'IN', name: 'India', dial: '+91', flag: '\uD83C\uDDEE\uD83C\uDDF3' },
  { code: 'US', name: 'United States', dial: '+1', flag: '\uD83C\uDDFA\uD83C\uDDF8' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '\uD83C\uDDE6\uD83C\uDDEA' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '\uD83C\uDDF8\uD83C\uDDE6' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '\uD83C\uDDE8\uD83C\uDDE6' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '\uD83C\uDDE6\uD83C\uDDFA' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '\uD83C\uDDE9\uD83C\uDDEA' },
  { code: 'FR', name: 'France', dial: '+33', flag: '\uD83C\uDDEB\uD83C\uDDF7' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '\uD83C\uDDEF\uD83C\uDDF5' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '\uD83C\uDDE7\uD83C\uDDF7' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '\uD83C\uDDF8\uD83C\uDDEC' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '\uD83C\uDDF3\uD83C\uDDEC' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '\uD83C\uDDFF\uD83C\uDDE6' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '\uD83C\uDDF5\uD83C\uDDF0' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '\uD83C\uDDE7\uD83C\uDDE9' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '\uD83C\uDDF3\uD83C\uDDF5' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '\uD83C\uDDF1\uD83C\uDDF0' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '\uD83C\uDDF5\uD83C\uDDED' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '\uD83C\uDDF2\uD83C\uDDFE' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '\uD83C\uDDEE\uD83C\uDDE9' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '\uD83C\uDDF9\uD83C\uDDED' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '\uD83C\uDDEA\uD83C\uDDEC' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '\uD83C\uDDF0\uD83C\uDDEA' },
  { code: 'GH', name: 'Ghana', dial: '+233', flag: '\uD83C\uDDEC\uD83C\uDDED' },
  { code: 'CN', name: 'China', dial: '+86', flag: '\uD83C\uDDE8\uD83C\uDDF3' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '\uD83C\uDDF0\uD83C\uDDF7' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '\uD83C\uDDEE\uD83C\uDDF9' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '\uD83C\uDDEA\uD83C\uDDF8' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '\uD83C\uDDF7\uD83C\uDDFA' },
];

const PhoneInput = ({ value, onChange, disabled, placeholder = 'Phone number' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(countries[0]);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);
    setSearch('');
    const rawNumber = value.replace(/^\+\d+/, '');
    onChange(country.dial + rawNumber);
  };

  const handleNumberChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    onChange(selected.dial + raw);
  };

  const displayNumber = value.replace(/^\+\d+\s*/, '');

  return (
    <div className="relative flex w-full" ref={dropdownRef}>
      {/* Country Code Selector */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-3.5 bg-white border border-slate-200 rounded-l-2xl border-r-0 text-sm font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:bg-slate-50 min-w-[85px] justify-center ${isOpen ? 'border-orange-500 ring-4 ring-orange-500/20' : ''}`}
      >
        <span className="text-base">{selected.flag}</span>
        <span>{selected.dial}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
          >
            {/* Search */}
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-60 overflow-y-auto">
              {filtered.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition text-sm font-medium ${selected.code === country.code ? 'bg-orange-50 text-orange-600' : 'text-slate-700'}`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-slate-400 font-bold">{country.dial}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-slate-400 text-sm font-medium">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Number Input */}
      <input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={displayNumber}
        onChange={handleNumberChange}
        disabled={disabled}
        className="flex-1 px-4 py-3.5 bg-white border border-slate-200 rounded-r-2xl font-medium focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm disabled:opacity-50 disabled:bg-slate-50"
      />
    </div>
  );
};

export default PhoneInput;
