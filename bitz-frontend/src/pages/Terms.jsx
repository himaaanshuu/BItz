import React from 'react';
import { FileText, Scale, AlertTriangle, CreditCard, Shield, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';

const Terms = () => {
  const sections = [
    {
      icon: <FileText size={24} className="text-orange-500" />,
      title: 'Acceptance of Terms',
      content: `By accessing or using Bitez, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the platform. These terms apply to all users, including students, canteen administrators, and visitors.

Bitez reserves the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.`
    },
    {
      icon: <Shield size={24} className="text-sky-500" />,
      title: 'User Accounts',
      content: `To use certain features, you must create an account:

• Eligibility: You must be a current student or authorized canteen administrator.
• Accuracy: You must provide accurate and complete registration information.
• Security: You are responsible for maintaining the confidentiality of your account credentials.
• Responsibility: You are responsible for all activities under your account.
• One Account: Each person may maintain only one student account. Duplicate accounts may be terminated.
• Age Requirement: You must be at least 16 years old to use Bitez.

Notify us immediately if you suspect unauthorized access to your account.`
    },
    {
      icon: <CreditCard size={24} className="text-emerald-500" />,
      title: 'Orders and Payments',
      content: `When you place an order through Bitez:

• Order Accuracy: You are responsible for reviewing your order before confirming.
• Pricing: All prices are set by the canteen operator and include applicable taxes unless stated otherwise.
• Payment: Payment must be completed through the available payment methods (UPI, Card, or Cash on Pickup).
• Order Confirmation: An order is confirmed only after successful payment or cash payment agreement.
• Cancellation: Orders can be cancelled before the canteen starts preparation. Once preparation begins, cancellation is not guaranteed.
• Refunds: Refunds for cancelled orders are processed within 5-7 business days to the original payment method.
• Token System: Each order receives a unique token number for pickup verification.`
    },
    {
      icon: <AlertTriangle size={24} className="text-amber-500" />,
      title: 'Prohibited Conduct',
      content: `You agree NOT to:

• Misuse the platform for any unlawful purpose
• Create fake accounts or impersonate others
• Attempt to bypass authentication or security measures
• Manipulate order prices or exploit system vulnerabilities
• Submit false or fraudulent payment claims
• Harass, abuse, or harm other users or canteen staff
• Use automated scripts or bots to interact with the platform
• Reverse engineer, decompile, or disassemble any part of the platform
• Resell or commercially exploit any content or services from Bitez

Violation of these terms may result in immediate account termination.`
    },
    {
      icon: <Scale size={24} className="text-rose-500" />,
      title: 'Limitation of Liability',
      content: `Bitez is a platform connecting students with campus canteens:

• Service Availability: We do not guarantee uninterrupted access. Maintenance and downtime may occur.
• Food Quality: Bitez is not responsible for food quality, allergens, or dietary concerns. These are the canteen operator's responsibility.
• Order Accuracy: While we strive for accuracy, the canteen operator is responsible for fulfilling orders correctly.
• Maximum Liability: Bitez's total liability shall not exceed the amount paid by you for the specific order in question.
• Indirect Damages: We are not liable for indirect, incidental, or consequential damages.
• Force Majeure: We are not liable for failures caused by circumstances beyond our control.`
    },
    {
      icon: <FileText size={24} className="text-purple-500" />,
      title: 'Intellectual Property',
      content: `All content on Bitez is our property or licensed to us:

• Ownership: The Bitez platform, including its design, code, logo, and content, is protected by copyright and trademark laws.
• Limited License: We grant you a limited, non-exclusive, non-transferable license to use the platform for personal, non-commercial purposes.
• Restrictions: You may not copy, modify, distribute, sell, or lease any part of our platform without written permission.
• User Content: By submitting content (reviews, feedback), you grant Bitez a non-exclusive license to use, modify, and display that content.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
              <Scale className="text-orange-500" size={40} />
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Terms & Conditions</h1>
            <p className="text-slate-500 text-lg font-medium">Last updated: September 7, 2026</p>
            <p className="text-slate-400 text-sm mt-2">Effective date: September 7, 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="glass bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white mb-8">
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              Welcome to Bitez. These Terms and Conditions ("Terms") govern your use of the Bitez campus food ordering platform operated by Bitez ("we", "our", or "us"). Please read these Terms carefully before using our services.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={0.15 + i * 0.05}>
              <div className="glass bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-100 rounded-2xl">{section.icon}</div>
                  <h2 className="text-2xl font-black text-slate-800">{section.title}</h2>
                </div>
                <div className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-line pl-16">
                  {section.content}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fadeUp" delay={0.5}>
          <div className="bg-orange-50 rounded-[2rem] p-8 border border-orange-100 mt-12 text-center">
            <h3 className="text-2xl font-black text-slate-800 mb-3">Questions About These Terms?</h3>
            <p className="text-slate-600 text-lg font-medium mb-6">
              If you have any questions about these Terms and Conditions, please contact us.
            </p>
            <a href="mailto:himanshu2005gupta@gmail.com" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/25">
              <Mail size={18} className="inline mr-2" />
              himanshu2005gupta@gmail.com
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Terms;
