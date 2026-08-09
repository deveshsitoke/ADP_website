import React, { useState } from 'react';
import { Droplets, CheckCircle2, Calendar, MapPin, Phone, User } from 'lucide-react';
import { supabase } from '../supabase';

export const Filters: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('service_requests').insert([{
        service_type: 'Filter Replacement',
        customer_name: name,
        phone,
        address,
        preferred_date: date
      }]);
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      alert('Error booking replacement: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Genuine Spares</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">Genuine Filter & Membrane Replacement</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Filters and RO membranes have a finite lifespan. When efficiency drops, our technicians replace your carbon cartridges, UV chambers, and copper-zinc mineral blocks with 100% genuine factory spares.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="text-green-500 w-5 h-5" /> 100% genuine certified Aqua Dew replacement cartridges</div>
            <div className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="text-green-500 w-5 h-5" /> Pre-filters replaced every 6 months</div>
            <div className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="text-green-500 w-5 h-5" /> High-rejection RO membrane replacement</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold">Request Filter Change</h3>
          </div>
          {success ? (
            <div className="bg-green-600/20 border border-green-400 rounded-2xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <h4 className="font-bold text-lg">Request Registered!</h4>
              <p className="text-sm text-gray-300 mt-1">Our representative will bring the correct filters to your home.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Full Name</label>
                <div className="relative"><User className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input type="text" required placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-blue-400" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Phone Number</label>
                <div className="relative"><Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input type="tel" required placeholder="10-digit mobile number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-blue-400" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Service Address</label>
                <div className="relative"><MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input type="text" required placeholder="House no, Street, City, PIN" value={address} onChange={e => setAddress(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-blue-400" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Preferred Date</label>
                <div className="relative"><Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-blue-400" /></div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg">
                {loading ? 'Submitting...' : 'Book Filter Replacement'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};