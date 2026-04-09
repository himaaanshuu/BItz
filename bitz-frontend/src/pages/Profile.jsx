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
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    if (!token || !hasAuthCookie) {
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">My Profile</h1>
          <p className="text-slate-500 font-medium">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="glass-panel rounded-[2.5rem] p-10 shadow-xl border border-white">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            
            {/* Avatar Section */}
            <div className="flex flex-col justify-center items-center gap-6 w-full md:w-1/3">
              <div className="w-40 h-40 bg-gradient-to-tr from-orange-400 to-rose-500 rounded-[2.5rem] flex items-center justify-center text-white text-6xl font-black shadow-lg shadow-orange-500/20 rotate-3 hover:rotate-0 transition-transform">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="w-full">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <button
                      onClick={handleSave}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100 py-3 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Fields */}
            <div className="w-full md:w-2/3 space-y-6 bg-white/50 p-8 rounded-3xl border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 gap-2">
                    <User size={16} className="text-orange-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 border rounded-2xl text-lg font-medium transition-all ${
                      isEditing 
                        ? 'bg-white border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none shadow-sm text-slate-800' 
                        : 'border-transparent bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 gap-2">
                    <Mail size={16} className="text-orange-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 border rounded-2xl text-lg font-medium transition-all ${
                      isEditing 
                        ? 'bg-white border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none shadow-sm text-slate-800' 
                        : 'border-transparent bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 gap-2">
                    <CreditCard size={16} className="text-orange-500" />
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={userData.studentId}
                    onChange={(e) => setUserData({ ...userData, studentId: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 border rounded-2xl text-lg font-medium transition-all ${
                      isEditing 
                        ? 'bg-white border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none shadow-sm text-slate-800' 
                        : 'border-transparent bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 gap-2">
                    <Phone size={16} className="text-orange-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 border rounded-2xl text-lg font-medium transition-all ${
                      isEditing 
                        ? 'bg-white border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none shadow-sm text-slate-800' 
                        : 'border-transparent bg-slate-50 text-slate-600'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;