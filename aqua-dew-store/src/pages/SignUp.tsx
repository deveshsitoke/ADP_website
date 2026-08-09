import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
// FIX: Added the 'User' icon for the name field
import { Lock, Mail, UserPlus, User } from 'lucide-react'; 

export const SignUp: React.FC = () => {
  const [name, setName] = useState(''); // NEW: Name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        // NEW: This saves their exact name into their secure Supabase profile
        options: {
          data: {
            full_name: name,
          }
        }
      });
      
      if (error) throw error;
      alert('Account created successfully! You can now log in.');
      navigate('/login'); 
    } catch (error: any) {
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Join Aqua Dew Pure today.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* NEW: Full Name Input Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-md">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};