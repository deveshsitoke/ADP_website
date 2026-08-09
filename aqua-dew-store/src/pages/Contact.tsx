import React, { useState } from 'react';
import { supabase } from '../supabase';
import { CheckCircle2, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error: any) {
      alert('Error sending message: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 max-w-xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Get in Touch</h1>
        <p className="text-gray-500 text-lg">
          Have a question about a product or need service? Send us a message and our premium support team will assist you.
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-6">Thank you, {name}. We will get back to you at {email} very soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-100" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea 
                rows={4} required value={message} onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};