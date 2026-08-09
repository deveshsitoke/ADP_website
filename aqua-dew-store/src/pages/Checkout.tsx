import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { CheckCircle, Truck, Lock } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States
  const [session, setSession] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Auth, 2: Address, 3: Success
  
  // Auth Form State
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Address Form State
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setStep(2); // Skip to address if logged in
    });

    // Fetch the product they are buying
    if (id) {
      supabase.from('products').select('*').eq('id', id).single()
        .then(({ data }) => setProduct(data));
    }
  }, [id]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setStep(2); // Move to address step
    } catch (error: any) {
      alert(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone) return alert('Please fill in all details');
    
    setOrderLoading(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        user_email: session.user.email,
        product_id: product.id,
        address: address,
        phone: phone
      }]);
      
      if (error) throw error;
      setStep(3); // Move to success step
    } catch (error: any) {
      alert('Error placing order: ' + error.message);
    } finally {
      setOrderLoading(false);
    }
  };

  if (!product) return <div className="p-20 text-center">Loading checkout...</div>;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Order Summary Header */}
        <div className="bg-gray-900 p-6 text-white text-center">
          <p className="text-sm text-gray-400 mb-1">Completing Order For</p>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-lg text-blue-400 mt-2 font-semibold">₹{product.price.toLocaleString()}</p>
        </div>

        <div className="p-8">
          {/* STEP 1: AUTHENTICATION */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6 text-gray-900"><Lock className="w-8 h-8" /></div>
              <h3 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
              <form onSubmit={handleAuth} className="space-y-4">
                <input 
                  type="email" placeholder="Email Address" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input 
                  type="password" placeholder="Password (min 6 chars)" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" disabled={authLoading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                  {authLoading ? 'Please wait...' : (isLogin ? 'Log In to Continue' : 'Sign Up to Continue')}
                </button>
              </form>
              <p className="text-center mt-6 text-sm text-gray-500 cursor-pointer hover:text-gray-900" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
              </p>
            </div>
          )}

          {/* STEP 2: ADDRESS & PAYMENT */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6 text-blue-600"><Truck className="w-8 h-8" /></div>
              <h3 className="text-2xl font-bold text-center mb-2">Delivery Details</h3>
              <p className="text-center text-sm text-gray-500 mb-6">Logged in as {session?.user?.email}</p>
              
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <textarea 
                  placeholder="Complete Delivery Address (House No, Street, City, PIN)" required rows={3}
                  value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
                <input 
                  type="tel" placeholder="Phone Number" required
                  value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 mb-4">
                  Payment Method: <strong>Cash on Delivery</strong> (Simulated)
                </div>
                <button type="submit" disabled={orderLoading} className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black">
                  {orderLoading ? 'Confirming...' : 'Confirm Order'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="animate-fade-in text-center py-6">
              <div className="flex justify-center mb-6 text-green-500"><CheckCircle className="w-16 h-16" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-500 mb-8">Thank you! Your new {product.name} is being prepared for dispatch to your address.</p>
              <button onClick={() => navigate('/')} className="px-8 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200">
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};