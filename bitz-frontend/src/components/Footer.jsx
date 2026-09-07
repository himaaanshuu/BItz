import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                BITEZ.
              </h3>
              <p className="text-gray-400">
                Making eating wholesome, not a task. Campus food ordering made simple.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-500">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About' },
                  { to: '/student-login', label: 'Student Login' },
                  { to: '/admin-login', label: 'Admin Login' },
                ].map((link) => (
                  <motion.div key={link.to} whileHover={{ x: 4 }}>
                    <Link to={link.to} className="block text-gray-400 hover:text-orange-400 transition">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-500">Legal</h4>
              <div className="space-y-2">
                <motion.div whileHover={{ x: 4 }}>
                  <Link to="/privacy" className="block text-gray-400 hover:text-orange-400 transition">
                    Privacy Policy
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <Link to="/terms" className="block text-gray-400 hover:text-orange-400 transition">
                    Terms & Conditions
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-500">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>himanshu2005gupta@gmail.com</p>
                <p className="text-sm">Campus Food Court</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fadeIn" delay={0.5}>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Bitez. Made with care for students.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
