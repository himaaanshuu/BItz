import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              BITEZ.
            </h3>
            <p className="text-gray-400">
              Making eating wholesome, not a task.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-500">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-orange-400 transition">
                Home
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-orange-400 transition">
                About
              </Link>
              <Link to="/order" className="block text-gray-400 hover:text-orange-400 transition">
                Student Login
              </Link>
              <Link to="/admin-dashboard" className="block text-gray-400 hover:text-orange-400 transition">
                Admin Login
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-500">Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-400 hover:text-orange-400 transition">
                Privacy Policy
              </Link>
              <a href="#" className="block text-gray-400 hover:text-orange-400 transition">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-400 transition">
                Refund Policy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-500">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>support@bitez.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Bitez. Made with ❤️ for students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;