import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export const ReturnPolicy: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto animate-fade-in text-slate-800">
      <div className="mb-8">
        <Link to="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <RefreshCw className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-slate-900">Return & Refund Policy</h1>
        </div>
        <p className="text-sm text-slate-400 mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>At Aqua Dew Pure, every RO water purifier undergoes rigorous quality inspections prior to dispatch and installation. If you are not entirely satisfied with your purchase, we are here to support you.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Returns & Replacements</h2>
            <p>Returns or replacements are accepted within 7 days of delivery only if the product arrives damaged, defective, or incorrect. Items must be unused, in original packaging, and accompanied by the purchase invoice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Refund Process</h2>
            <p>Once our certified technicians inspect and verify the returned unit, we will process your refund. Approved refunds are credited back to your original payment method within 5 to 7 business days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Service & Installation Fees</h2>
            <p>Installation charges are non-refundable once a technician visit has been completed or service has been rendered at your premises.</p>
          </section>
        </div>
      </div>
    </div>
  );
};