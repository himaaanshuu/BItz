import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, EyeOff, Building2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [canteenData, setCanteenData] = useState({
    canteenName: '',
    location: '',
    phone: '',
    email: '',
    openTime: '08:00',
    closeTime: '20:00'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=admin'));
    if (!adminToken || !hasAuthCookie) {
      navigate('/admin-login');
      return;
    }

    // Load admin data
    const storedAdmin = localStorage.getItem('bitezAdmin');
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setCanteenData({
        canteenName: adminData.canteenName || '',
        location: adminData.location || '',
        phone: adminData.phone || '',
        email: adminData.email || '',
        openTime: adminData.openTime || '08:00',
        closeTime: adminData.closeTime || '20:00'
      });
    }
  }, [navigate]);

  const handleUpdateCanteen = (e) => {
    e.preventDefault();

    if (!canteenData.canteenName || !canteenData.location || !canteenData.phone || !canteenData.email) {
      alert('Please fill all required fields!');
      return;
    }

    localStorage.setItem('bitezAdmin', JSON.stringify(canteenData));
    alert('Canteen details updated successfully!');
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill all password fields!');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters and include upper, lower, number, and special character.');
      return;
    }

    try {
      await api.changePasswordAdmin({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.message || 'Password update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your canteen profile and preferences</p>
        </div>

        {/* Canteen Details */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Building2 className="text-orange-600" size={28} />
            Canteen Information
          </h2>

          <form onSubmit={handleUpdateCanteen} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Canteen Name *
              </label>
              <input
                type="text"
                value={canteenData.canteenName}
                onChange={(e) => setCanteenData({ ...canteenData, canteenName: e.target.value })}
                placeholder="Main Cafeteria"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                value={canteenData.location}
                onChange={(e) => setCanteenData({ ...canteenData, location: e.target.value })}
                placeholder="Ground Floor, Building A"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={canteenData.phone}
                  onChange={(e) => setCanteenData({ ...canteenData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  value={canteenData.email}
                  onChange={(e) => setCanteenData({ ...canteenData, email: e.target.value })}
                  placeholder="admin@canteen.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Opening Time
                </label>
                <input
                  type="time"
                  value={canteenData.openTime}
                  onChange={(e) => setCanteenData({ ...canteenData, openTime: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Closing Time
                </label>
                <input
                  type="time"
                  value={canteenData.closeTime}
                  onChange={(e) => setCanteenData({ ...canteenData, closeTime: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition shadow-lg"
            >
              <Save size={20} className="inline mr-2" />
              Save Changes
            </button>
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
            >
              <Save size={20} className="inline mr-2" />
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;