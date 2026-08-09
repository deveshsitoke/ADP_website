import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setFaqs(data);
      }
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-lg max-w-2xl">Everything you need to know about our premium water purifiers, installation, and maintenance.</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading FAQs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};