import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence } from 'framer-motion';


// Components
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
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
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'}>
        <Router>
          <div className="min-h-screen">
            <AnimatedRoutes />
            <Footer />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
