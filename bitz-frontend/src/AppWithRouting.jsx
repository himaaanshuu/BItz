import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Home Component
function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    document.getElementById('why-bitez')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSkipQueue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-orange-600 text-white py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <Link to="/" className="font-bold text-xl hover:text-gray-200">BITEZ</Link>
          <span 
            className="hover:underline cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            EAT FASTER
          </span>
          <span 
            className="hover:underline cursor-pointer"
            onClick={handleLearnMore}
          >
            SAVE TIME
          </span>
          <span 
            className="hover:underline cursor-pointer"
            onClick={handleGetStarted}
          >
            ORDER NOW
          </span>
        </div>
        <button 
          onClick={handleSkipQueue}
          className="bg-white text-orange-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition duration-300"
        >
          SKIP THE QUEUE
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-200 py-20 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              EATING SHOULD BE <span className="text-orange-600">WHOLESOME</span> NOT A TASK
            </h1>
            <p className="text-gray-700 mb-8 text-lg">
              Skip cafeteria queues and enjoy your food. Connect to multiple canteens,
              order ahead, and track your meal in real-time.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handleGetStarted}
                className="bg-orange-600 text-white px-6 py-3 rounded font-semibold hover:bg-orange-700 transition duration-300 transform hover:scale-105"
              >
                GET STARTED →
              </button>
              <button 
                onClick={handleLearnMore}
                className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition duration-300"
              >
                LEARN MORE
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 h-96 rounded-lg flex items-center justify-center shadow-2xl">
              <p className="text-white text-2xl font-bold">🍽️ Hero Image Here</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded font-bold shadow-lg">
              ZERO WAITING!
            </div>
          </div>
        </div>
      </section>

      {/* Why Bitez Section */}
      <section id="why-bitez" className="py-16 px-10 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          WHY <span className="text-orange-600">BITEZ</span>?
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="border-2 border-red-300 bg-red-50 rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">LIGHTNING FAST</h3>
            <p className="text-gray-700">
              Order from multiple canteens in seconds. No more standing in long queues.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border-2 border-green-300 bg-green-50 rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">REAL-TIME TRACKING</h3>
            <p className="text-gray-700">
              Know exactly when your food will be ready. Track every step of your order.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-3">EASY PAYMENTS</h3>
            <p className="text-gray-700">
              Pay via UPI or Cash. Quick, secure, and hassle-free transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">© 2024 Bitez. Making eating wholesome, not a task.</p>
          <p className="text-gray-400">Made with ❤️</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-orange-400 transition">About</a>
            <a href="#" className="hover:text-orange-400 transition">Contact</a>
            <a href="#" className="hover:text-orange-400 transition">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Login Component
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally call your API
    console.log('Login:', { email, password });
    // For now, just navigate back home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Bitez</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full text-gray-600 hover:text-gray-800 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

// Register Component
function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally call your API
    console.log('Register:', { name, email, password });
    // Navigate to login after successful registration
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Join Bitez</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full text-gray-600 hover:text-gray-800 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

// Main App with Routing
function AppWithRouting() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouting;