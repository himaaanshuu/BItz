import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, AtSign, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Hero / Brand */}
      <ScrollReveal variant="fadeUp" delay={0}>
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-rose-500 to-orange-600 bg-clip-text text-transparent leading-tight">
            bitez
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Skip the queue and savor the flavor.
          </p>
        </div>
      </ScrollReveal>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
          {/* Product */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Product
              </h4>
              <ul className="space-y-4">
                {[
                  { to: '/', label: 'Menu' },
                  { to: '/about', label: 'How It Works' },
                  { to: '/auth', label: 'Order' },
                ].map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors duration-300 text-sm font-medium"
                    >
                      {link.label}
                      <ArrowRight
                        size={13}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Company */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {[
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/privacy', label: 'Privacy' },
                ].map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors duration-300 text-sm font-medium"
                    >
                      {link.label}
                      <ArrowRight
                        size={13}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Campus */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Campus
              </h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                Made for students. Built to save your time and taste buds.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Globe size={17} strokeWidth={2} />
                </a>
                <a
                  href="#"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <AtSign size={17} strokeWidth={2} />
                </a>
                <a
                  href="mailto:hello@bitez.com"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={17} strokeWidth={2} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <ScrollReveal variant="fadeIn" delay={0.4}>
        <div className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-medium">
              &copy; 2026 Bitez. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
