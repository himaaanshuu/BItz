import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="mx-auto mb-4 text-purple-600" size={64} />
          <h1 className="text-5xl font-black text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Last updated: January 19, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 shadow-xl space-y-8">
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              At BITEZ, we collect information that you provide directly to us, including your name, email address, 
              student ID, phone number, and order history. We use this information to process your orders, improve 
              our services, and communicate with you about your orders and account.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>To process and fulfill your food orders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>To send you order confirmations and updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>To improve our canteen services and menu offerings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>To communicate with you about promotions and updates</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. Your data is stored securely and is only accessible to authorized 
              personnel who need it to provide services to you.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-purple-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>Access and update your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>Delete your account and associated data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>Opt-out of promotional communications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span>Request a copy of your data</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@bitez.com" className="text-purple-600 font-semibold hover:underline">
                privacy@bitez.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;