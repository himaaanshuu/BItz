import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, Edit2, Save } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    studentId: '',
    phone: ''
  });

  useEffect(() => {
    // Check if student is logged in
    const token = localStorage.getItem('bitezToken');
    if (!token || !token.startsWith('student_')) {
      navigate('/student-login');
      return;
    }

    // Load user data
    const storedUser = localStorage.getItem('bitezUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem('bitezUser', JSON.stringify(userData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-5xl font-black">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg text-lg ${
                  isEditing ? 'border-purple-300 focus:border-purple-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg text-lg ${
                  isEditing ? 'border-purple-300 focus:border-purple-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <CreditCard size={16} className="inline mr-2" />
                Student ID
              </label>
              <input
                type="text"
                value={userData.studentId}
                onChange={(e) => setUserData({ ...userData, studentId: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg text-lg ${
                  isEditing ? 'border-purple-300 focus:border-purple-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg text-lg ${
                  isEditing ? 'border-purple-300 focus:border-purple-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;