import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import AdminAnalytics from './pages/AdminAnalytics';
import About from './pages/About';
import Privacy from './pages/Privacy';
import OrderPage from './pages/OrderPage';

// Student Pages
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import CurrentOrder from './pages/CurrentOrder';

function App() {
  const [canteens, setCanteens] = useState([
    {
      id: 1,
      name: 'Main Canteen',
      location: 'Ground Floor, Building A',
      queue: 8,
      prepTime: 15,
      menu: [
        { id: 101, name: 'Veg Burger', price: 60, category: 'Fast Food', available: true },
        { id: 102, name: 'Pizza Slice', price: 80, category: 'Fast Food', available: true },
        { id: 103, name: 'French Fries', price: 40, category: 'Snacks', available: true },
        { id: 104, name: 'Cold Coffee', price: 50, category: 'Beverages', available: true }
      ]
    },
    {
      id: 2,
      name: 'South Canteen',
      location: '2nd Floor, Building B',
      queue: 3,
      prepTime: 12,
      menu: [
        { id: 201, name: 'Masala Dosa', price: 70, category: 'South Indian', available: true },
        { id: 202, name: 'Idli Sambhar', price: 50, category: 'South Indian', available: true },
        { id: 203, name: 'Filter Coffee', price: 25, category: 'Beverages', available: true }
      ]
    },
    {
      id: 3,
      name: 'North Canteen',
      location: '1st Floor, Building C',
      queue: 5,
      prepTime: 10,
      menu: [
        { id: 301, name: 'Chole Bhature', price: 80, category: 'North Indian', available: true },
        { id: 302, name: 'Paneer Paratha', price: 60, category: 'North Indian', available: true },
        { id: 303, name: 'Samosa', price: 20, category: 'Snacks', available: true }
      ]
    },
    {
      id: 4,
      name: 'Juice Corner',
      location: 'Near Library',
      queue: 2,
      prepTime: 5,
      menu: [
        { id: 401, name: 'Fresh Orange Juice', price: 40, category: 'Fresh Juice', available: true },
        { id: 402, name: 'Watermelon Juice', price: 35, category: 'Fresh Juice', available: true },
        { id: 403, name: 'Mixed Fruit Smoothie', price: 60, category: 'Smoothies', available: true }
      ]
    }
  ]);

  const addCanteen = (newCanteen) => {
    setCanteens(prev => [
      ...prev,
      {
        ...newCanteen,
        id: Date.now(),
        menu: newCanteen.menu || [],
        queue: newCanteen.queue || 0,
        prepTime: newCanteen.prepTime || 0
      }
    ]);
  };

  // 🔒 Student Protected Route - Also checks admin not logged in
  const ProtectedStudentRoute = ({ children }) => {
    const studentToken = localStorage.getItem('bitezToken');
    const adminToken = localStorage.getItem('bitezAdminToken');
    
    // If admin is logged in, redirect to admin dashboard
    if (adminToken && adminToken.startsWith('admin_')) {
      return <Navigate to="/admin-dashboard" />;
    }
    
    // If student not logged in, redirect to student login
    if (!studentToken || !studentToken.startsWith('student_')) {
      return <Navigate to="/student-login" />;
    }
    
    return children;
  };

  // 🔒 Admin Protected Route - Also checks student not logged in
  const ProtectedAdminRoute = ({ children }) => {
    const studentToken = localStorage.getItem('bitezToken');
    const adminToken = localStorage.getItem('bitezAdminToken');
    
    // If student is logged in, redirect to student dashboard
    if (studentToken && studentToken.startsWith('student_')) {
      return <Navigate to="/student-dashboard" />;
    }
    
    // If admin not logged in, redirect to admin login
    if (!adminToken || !adminToken.startsWith('admin_')) {
      return <Navigate to="/admin-login" />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Student Routes */}
          <Route path="/student-login" element={<StudentLogin />} />

          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedStudentRoute>
                <StudentDashboard canteens={canteens} />
              </ProtectedStudentRoute>
            } 
          />

          <Route 
            path="/order" 
            element={
              <ProtectedStudentRoute>
                <OrderPage />
              </ProtectedStudentRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedStudentRoute>
                <Profile />
              </ProtectedStudentRoute>
            } 
          />

          <Route 
            path="/order-history" 
            element={
              <ProtectedStudentRoute>
                <OrderHistory />
              </ProtectedStudentRoute>
            } 
          />

          <Route 
            path="/current-order" 
            element={
              <ProtectedStudentRoute>
                <CurrentOrder />
              </ProtectedStudentRoute>
            } 
          />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard addCanteen={addCanteen} />
              </ProtectedAdminRoute>
            } 
          />

          <Route 
            path="/admin-settings" 
            element={
              <ProtectedAdminRoute>
                <AdminSettings />
              </ProtectedAdminRoute>
            } 
          />

          <Route 
            path="/admin-analytics" 
            element={
              <ProtectedAdminRoute>
                <AdminAnalytics />
              </ProtectedAdminRoute>
            } 
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;