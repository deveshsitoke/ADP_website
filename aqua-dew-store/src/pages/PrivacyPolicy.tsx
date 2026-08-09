import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto animate-fade-in text-slate-800">
      <div className="mb-8">
        <Link to="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        </div>
        <p className="text-sm text-slate-400 mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>We collect essential personal information when you register an account, order a water purifier, or schedule a doorstep maintenance service, including your name, phone number, email, and service address.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. How We Use Information</h2>
            <p>Your details are used exclusively to process orders, coordinate technician installation appointments, provide customer support, and send important seasonal updates. </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Data Security</h2>
            <p>We use advanced security protocols, including 256-bit SSL encryption, to safeguard your personal information and financial transactions against unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Third-Party Sharing</h2>
            <p>We never sell or trade user data. Information is shared only with verified logistics and certified technician partners strictly required to fulfill your order or service request.</p>
          </section>
        </div>
      </div>
    </div>
  );
};