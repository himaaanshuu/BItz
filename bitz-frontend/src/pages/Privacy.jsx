import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
            <Shield className="text-orange-500" size={40} />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 text-lg font-medium">Last updated: January 19, 2024</p>
        </div>

        {/* Content */}
        <div className="glass bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                 <FileText size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Information We Collect</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium pl-16">
              At BITEZ, we collect information that you provide directly to us, including your name, email address, 
              student ID, phone number, and order history. We use this information to process your orders, improve 
              our services, and communicate with you about your orders and account.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">How We Use Your Information</h2>
            </div>
            <ul className="space-y-4 text-slate-600 pl-16 font-medium text-lg">
              <li className="flex items-start gap-4">
                <span className="text-orange-500 mt-1 font-black text-xl">•</span>
                <span>To process and fulfill your food orders</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-orange-500 mt-1 font-black text-xl">•</span>
                <span>To send you order confirmations and updates</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-orange-500 mt-1 font-black text-xl">•</span>
                <span>To improve our canteen services and menu offerings</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-orange-500 mt-1 font-black text-xl">•</span>
                <span>To communicate with you about promotions and updates</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Data Security</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium pl-16">
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. Your data is stored securely and is only accessible to authorized 
              personnel who need it to provide services to you.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Your Rights</h2>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4 text-lg font-medium">
                You have the right to:
              </p>
              <ul className="space-y-4 text-slate-600 font-medium text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-1 font-black text-xl">✓</span>
                  <span>Access and update your personal information</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-1 font-black text-xl">✓</span>
                  <span>Delete your account and associated data</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-1 font-black text-xl">✓</span>
                  <span>Opt-out of promotional communications</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-1 font-black text-xl">✓</span>
                  <span>Request a copy of your data</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-orange-50 rounded-[2rem] p-8 border border-white shadow-inner flex flex-col items-center justify-center text-center mt-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-bl-full -mr-10 -mt-10" />
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10">Have Questions?</h3>
            <p className="text-slate-600 text-lg font-medium mb-6 relative z-10">
              If you have any questions about this Privacy Policy, please reach out.
            </p>
             <a href="mailto:privacy@bitez.com" className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black shadow-lg hover:-translate-y-1 transition-transform relative z-10 hover:shadow-orange-200">
                privacy@bitez.com
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;