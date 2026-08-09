import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  Headphones, 
  Droplet, 
  Star, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';

export const Home: React.FC = () => {
  // State for the interactive TDS Calculator
  const [tdsLevel, setTdsLevel] = useState<number>(400);
  const [waterSource, setWaterSource] = useState<string>('Municipal');

  // Logic to recommend a product based on TDS
  const getRecommendation = () => {
    if (tdsLevel < 300) return { model: "SANDWELL WHITE", text: "Perfect for low-TDS municipal water. Provides essential RO+UV protection." };
    if (tdsLevel >= 300 && tdsLevel <= 800) return { model: "ADSUN / CARDIO", text: "Ideal for mixed water sources. Fortifies your water with Copper & Zinc." };
    return { model: "MERMAID", text: "Our Prime flagship model is required for high-TDS borewell or tanker water to ensure absolute purity." };
  };

  const recommendation = getRecommendation();

  return (
    <div className="flex flex-col items-center animate-fade-in w-full">
      
      {/* 1. STATIC HERO BANNER */}
      <section className="relative w-full bg-white border-b border-gray-200">
        <img 
          src="/main_banner.png" 
          alt="Aqua Dew Pure Mermaid Model" 
          className="w-full h-auto object-cover max-h-[80vh]"
        />
        
        <div className="absolute bottom-[5%] left-[5%] md:bottom-[8%] md:left-[10%]">
          <Link 
            to="/products" 
            className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors shadow-lg"
          >
            Explore Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 2. NEW: TRUST & QUALITY SECTION (Replaces the old 4 icons) */}
      <section className="w-full py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-slate-100 text-slate-700 text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-widest border border-slate-200">
              Unmatched Quality & Care
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-8 mb-6 tracking-tight">
              Why Families Trust Aqua Dew Pure
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Delivering clean, mineral-rich drinking water with complete honesty, speed, and technical mastery.
            </p>
          </div>
          
          {/* 5-Card Layout using flex-wrap to perfectly center the bottom row */}
          <div className="flex flex-wrap justify-center gap-6">
            
            {/* Card 1 */}
            <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-3">Genuine Spare Parts</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                100% factory-original, food-grade membranes, sediment filters, and high-pressure copper pumps with manufacturer seals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-3">Certified Technicians</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Background-verified, company-trained engineers equipped with digital TDS meters & precision tools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-3">Same Day Service</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Express doorstep technician arrival within 2-4 hours of booking for emergency repair and routine service.
              </p>
            </div>

            {/* Card 4 */}
            <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-3">24x7 Customer Support</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Dedicated phone & WhatsApp assistance for instant complaint registration, tracking, and water queries.
              </p>
            </div>

            {/* Card 5 */}
            <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-3">Water Quality Experts</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Free lab-grade water TDS & pH checkup before and after every installation or maintenance service.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TDS CALCULATOR */}
      <section className="w-full py-20 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          <div className="p-8 md:p-12 w-full md:w-1/2 bg-slate-50 border-r border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Activity className="w-6 h-6" />
              <h3 className="font-bold text-sm tracking-widest uppercase text-slate-500">Know Your Water</h3>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Find Your Perfect RO</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">Primary Water Source</label>
              <div className="flex gap-2">
                {['Municipal', 'Borewell', 'Tanker'].map(source => (
                  <button 
                    key={source}
                    onClick={() => setWaterSource(source)}
                    className={`flex-1 py-2 px-2 text-sm rounded-md border font-medium transition-colors ${waterSource === source ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Estimated TDS Level: <span className="text-blue-600 text-lg">{tdsLevel} PPM</span>
              </label>
              <input 
                type="range" 
                min="50" max="2000" step="50"
                value={tdsLevel} 
                onChange={(e) => setTdsLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>Low (50)</span>
                <span>High (2000+)</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center bg-slate-900 text-white">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">We Recommend</p>
            <h3 className="text-3xl font-extrabold text-blue-400 mb-4">{recommendation.model}</h3>
            <p className="text-slate-300 leading-relaxed mb-8">
              {recommendation.text}
            </p>
            <Link 
              to="/products"
              className="w-full py-4 bg-white text-slate-900 text-center font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              View Model Details <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS WALL */}
      <section className="w-full py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Thousands of Families
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what our customers are saying about their Aqua Dew Pure experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 italic mb-6">
                "The Mermaid model looks absolutely stunning in our modular kitchen. Installation was done within 24 hours of ordering. Highly impressed!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">R</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Rajesh Sharma</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Purchase</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 italic mb-6">
                "We switched to Aqua Dew specifically for the Copper fortification. The water tastes so much better, and their AMC team is very responsive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">P</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Priya Mehta</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Purchase</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 italic mb-6">
                "Very premium build quality. We have hard borewell water (TDS 1200+), but the Adsun handles it effortlessly. Great product."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">V</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Vikram Tiwari</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Purchase</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};