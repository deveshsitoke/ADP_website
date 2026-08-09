import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Settings2, Droplets, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Customer Care</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">Service & Support Hub</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          We believe pure water should never be interrupted. Choose a service below to book a technician or learn more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Service 1: Installation */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Installation</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Precision setup by certified technicians, ensuring proper pressure, calibration, and plumbing integration.
            </p>
          </div>
          <Link 
            to="/services/installation" 
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            Learn More & Book <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service 2: Maintenance */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Settings2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Routine Maintenance</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Comprehensive 21-point health check, electrical circuit inspection, and deep UV chamber sanitization.
            </p>
          </div>
          <Link 
            to="/services/maintenance" 
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            Learn More & Book <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service 3: Filter Replacement */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Filter Replacement</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Timely replacement of pre-filters, carbon cartridges, and RO membranes using 100% genuine spares.
            </p>
          </div>
          <Link 
            to="/services/filters" 
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            Learn More & Book <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};