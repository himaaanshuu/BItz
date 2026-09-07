import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Database, UserCheck, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';

const Privacy = () => {
  const sections = [
    {
      icon: <Database size={24} className="text-orange-500" />,
      title: 'Information We Collect',
      content: `When you use Bitez, we collect information you provide directly:
      
• Account Information: Name, email address, phone number, and student ID when you register or login.
• Order Data: Food items ordered, canteen selection, payment method, order history, and delivery preferences.
• Usage Data: Pages visited, features used, time spent, and interaction patterns within the app.
• Device Information: Browser type, operating system, device type, and IP address for security purposes.
• Cookies: Session identifiers and preference settings to maintain your login state and preferences.`
    },
    {
      icon: <Eye size={24} className="text-sky-500" />,
      title: 'How We Use Your Information',
      content: `We use your information for the following purposes:

• Order Processing: To create, process, and fulfill your food orders, including sending order details to canteens.
• Authentication: To verify your identity via OTP, Google OAuth, or email/password login.
• Communication: To send order confirmations, status updates, and important account notifications.
• Service Improvement: To analyze usage patterns, debug issues, and improve platform features.
• Security: To detect and prevent fraud, unauthorized access, and abuse of our services.
• Legal Compliance: To comply with applicable laws and regulations.`
    },
    {
      icon: <UserCheck size={24} className="text-emerald-500" />,
      title: 'Data Sharing',
      content: `We do NOT sell your personal data. We share information only with:

• Canteen Operators: Your order details (name, items, token number) are shared with the canteen fulfilling your order.
• Service Providers: Trusted third-party services that help us operate (hosting, analytics, payment processing).
• Legal Requirements: When required by law, court order, or to protect the safety of our users.

All service providers are contractually bound to protect your data and use it only for the purposes we specify.`
    },
    {
      icon: <Lock size={24} className="text-rose-500" />,
      title: 'Data Security',
      content: `We implement industry-standard security measures:

• Encryption: Data transmitted over HTTPS/TLS encryption. Passwords are hashed using bcrypt.
• Access Control: Strict role-based access limits who can view your data.
• Monitoring: Continuous monitoring for unauthorized access attempts.
• Storage: Data is stored on secure cloud infrastructure with automatic backups.
• Minimization: We collect only the data necessary to provide our services.

While we take every reasonable precaution, no method of transmission or storage is 100% secure.`
    },
    {
      icon: <FileText size={24} className="text-amber-500" />,
      title: 'Data Retention',
      content: `We retain your data for as long as your account is active or as needed:

• Active Accounts: Data is retained while your account exists and you use our services.
• Order History: Retained for 12 months after your last order for reference and support.
• Login Sessions: JWT tokens expire after 3 days. Session data is cleared on logout.
• Account Deletion: When you delete your account, personal data is removed within 30 days.
• Legal Hold: Some data may be retained longer if required by law or for dispute resolution.`
    },
    {
      icon: <Bell size={24} className="text-purple-500" />,
      title: 'Your Rights',
      content: `You have the following rights regarding your data:

• Access: Request a copy of all personal data we hold about you.
• Correction: Update or correct inaccurate personal information.
• Deletion: Request deletion of your account and associated data.
• Portability: Request your data in a machine-readable format.
• Opt-Out: Unsubscribe from non-essential communications at any time.
• Restrict Processing: Request limitation on how we use your data.

To exercise any of these rights, contact us at himanshu2005gupta@gmail.com.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative pb-20">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
              <Shield className="text-orange-500" size={40} />
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 text-lg font-medium">Last updated: September 7, 2026</p>
            <p className="text-slate-400 text-sm mt-2">Effective date: September 7, 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="glass bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white mb-8">
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              Bitez ("we", "our", or "us") operates the Bitez campus food ordering platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. By using Bitez, you agree to the collection and use of information in accordance with this policy.
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
            <h3 className="text-2xl font-black text-slate-800 mb-3">Questions About This Policy?</h3>
            <p className="text-slate-600 text-lg font-medium mb-6">
              If you have any questions about this Privacy Policy, please contact us.
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

export default Privacy;
