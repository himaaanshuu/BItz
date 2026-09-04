import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

// Pages
import Home from './pages/Home';
import AuthPortal from './pages/AuthPortal';
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
import TrackOrder from './pages/TrackOrder';

// 🔒 Student Protected Route - Also checks admin not logged in
const ProtectedStudentRoute = ({ children }) => {
  const authToken = localStorage.getItem('bitezAuthToken');
  const hasStudentCookie = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
  const hasAdminCookie = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('bitezAuth=admin'));

  if (hasAdminCookie) {
    return <Navigate to="/admin-dashboard" />;
  }

  if (!authToken || !hasStudentCookie) {
    return <Navigate to="/student-login" />;
  }

  return children;
};

// 🔒 Admin Protected Route - Also checks student not logged in
const ProtectedAdminRoute = ({ children }) => {
  const authToken = localStorage.getItem('bitezAuthToken');
  const hasStudentCookie = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
  const hasAdminCookie = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('bitezAuth=admin'));

  if (hasStudentCookie) {
    return <Navigate to="/student-dashboard" />;
  }

  if (!authToken || !hasAdminCookie) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthPortal />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Student Routes */}
          <Route path="/student-login" element={<StudentLogin />} />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
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

          <Route
            path="/track"
            element={
              <ProtectedStudentRoute>
                <TrackOrder />
              </ProtectedStudentRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
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
      </PageTransition>
    </AnimatePresence>
  );
}

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

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'}>
      <Router>
        <div className="min-h-screen">
          <AnimatedRoutes />
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
