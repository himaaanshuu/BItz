import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = localStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezAuthToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    
    if (!userData || !token || !hasAuthCookie) {
      alert('No user data found. Please login first.');
      setLoading(false);
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load user's orders
      const savedOrders = sessionStorage.getItem('bitezOrders') || localStorage.getItem('bitezOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      alert('Error loading user data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bitezAuthToken');
    localStorage.removeItem('bitezUser');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    alert('Logged out successfully!');
    setUser(null);
    navigate('/student-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-75 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">❌ Not logged in</p>
          <p className="text-gray-400">Please login first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Welcome back, {user.name}! 🔥</h1>
            <p className="text-red-100 mt-1">Student ID: {user.studentId}</p>
          </div>
          <span
            onMouseDown={handleLogout}
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 transition cursor-pointer select-none"
          >
            Logout
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            onClick={() => navigate('/order')}
            className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-2xl hover:scale-105 transition transform shadow-xl cursor-pointer"
          >
            <div className="text-5xl mb-3">🍕</div>
            <h3 className="text-xl font-bold mb-2">Order Food</h3>
            <p className="text-red-100 text-sm">Browse menu & place orders</p>
          </div>

          <div
            onClick={() => navigate('/track')}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-500 p-6 rounded-2xl hover:scale-105 transition transform shadow-xl cursor-pointer"
          >
            <div className="text-5xl mb-3">📦</div>
            <h3 className="text-xl font-bold mb-2">Track Orders</h3>
            <p className="text-gray-400 text-sm">Check your order status</p>
          </div>

          <div
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-500 p-6 rounded-2xl hover:scale-105 transition transform shadow-xl cursor-pointer"
          >
            <div className="text-5xl mb-3">👤</div>
            <h3 className="text-xl font-bold mb-2">My Profile</h3>
            <p className="text-gray-400 text-sm">View & edit your details</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white font-semibold">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Student ID</p>
              <p className="text-white font-semibold">{user.studentId}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Member Since</p>
              <p className="text-white font-semibold">January 2026</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Recent Orders</h2>
          
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-orange-500 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">Order #{order.id}</p>
                      <p className="text-gray-400 text-sm">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-500 font-bold">₹{order.total}</p>
                      <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full mt-1">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-400 text-lg mb-4">No orders yet!</p>
              <span
                onClick={() => navigate('/order')}
                className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition cursor-pointer"
              >
                Order Now
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;