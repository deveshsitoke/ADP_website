import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './supabase';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';

// Main Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Services } from './pages/Services';
import { Faq } from './pages/Faq';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Checkout } from './pages/Checkout';

// Auth Pages
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

// Legal Pages
import { ReturnPolicy } from './pages/ReturnPolicy';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

// Service Sub-Pages
import { Installation } from './services-pages/Installation';
import { Maintenance } from './services-pages/Maintenance';
import { Filters } from './services-pages/Filters';

export function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#ccdbda] text-slate-900 font-sans">
        
        {/* NAV BAR */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="py-4 px-6 md:px-12 flex justify-between items-center w-full mx-auto">
            
            <Link to="/" className="flex items-center">
              <img 
                src="/ADP%20Light%20bg%20Logo.png" 
                alt="Aqua Dew Pure" 
                className="h-10 md:h-14 object-contain mix-blend-multiply"
              />
            </Link>

            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-700">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-6">
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="hidden md:block text-sm font-bold text-slate-700 capitalize">
                    Hi, {session.user.user_metadata?.full_name || session.user.email.split('@')[0]}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="px-5 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/services" element={<Services />} />
            <Route path="/services/installation" element={<Installation />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="/services/filters" element={<Filters />} />
            
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            
            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* LEGAL ROUTES */}
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        {/* PREMIUM MEGA FOOTER */}
        <footer className="bg-slate-50 border-t-2 border-slate-200 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Column 1: Brand & Logo */}
            <div className="space-y-4">
              <img 
                src="/ADP%20Light%20bg%20Logo.png" 
                alt="Aqua Dew Pure" 
                className="h-16 md:h-20 object-contain mix-blend-multiply" 
              />
              <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                Providing mineral-rich, pure drinking water for modern Indian homes since 2026.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link to="/products" className="hover:text-blue-600 transition-colors">All Models</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Our Services</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link to="/faq" className="hover:text-blue-600 transition-colors">Track My Order</Link></li>
                <li><Link to="/services/installation" className="hover:text-blue-600 transition-colors">Installation Guide</Link></li>
                <li><Link to="/returns" className="hover:text-blue-600 transition-colors">Return & Refund</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Secure Payments with Labels under icons */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Secure Payments</h4>
              
              {/* 3 Icons with individual text labels underneath */}
              <div className="flex gap-3 mb-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm"><CreditCard className="w-5 h-5 text-slate-600" /></div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1">Cards / UPI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm"><Lock className="w-5 h-5 text-slate-600" /></div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1">Encrypted</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm"><ShieldCheck className="w-5 h-5 text-slate-600" /></div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1">Protected</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                <Lock className="w-3 h-3" /> 256-bit SSL Encrypted Checkout
              </p>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-slate-200 text-center md:text-left text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Aqua Dew Pure. All rights reserved.
          </div>
        </footer>
        
      </div>
    </Router>
  );
}

export default App;