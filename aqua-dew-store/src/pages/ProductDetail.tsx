import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ShieldCheck, Droplets, CheckCircle, Truck, ArrowLeft, Wrench } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  
  // NEW: Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const { data } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
          
          if (data) {
            setProduct(data);
            setActiveImage(data.image_url);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // NEW: Mouse tracking function for the zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  if (loading) {
    return <div className="py-32 text-center text-slate-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="py-32 text-center text-slate-500">Product not found.</div>;
  }

  const galleryImages = [product.image_url];
  
  if (product.additional_images) {
    const extraImages = product.additional_images
      .split(',')
      .map((img: string) => img.trim())
      .filter((img: string) => img.length > 0);
      
    galleryImages.push(...extraImages);
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      
      <div className="mb-8">
        <Link to="/products" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
        
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          
          {galleryImages.length > 1 && (
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0">
              {galleryImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 md:w-full md:h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-slate-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 bg-slate-50'}`}
                >
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
          
          {/* NEW: Interactive Zoom Container */}
          <div 
            className="flex-grow bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center min-h-[400px] border border-slate-100 relative cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              className={`w-full h-full object-contain transition-transform duration-200 ease-out ${isZoomed ? 'scale-[2.5]' : 'scale-100 drop-shadow-xl'}`}
              style={{ transformOrigin: isZoomed ? zoomOrigin : 'center center' }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
            Flagship Series
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-slate-900 mb-6">
            ₹{Number(product.price).toLocaleString()}
          </p>
          
          <div className="w-full h-px bg-slate-200 mb-8"></div>
          
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle className="w-6 h-6 text-slate-900" />
              <span className="font-medium">10-Stage RO + UV + UF Purification</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Droplets className="w-6 h-6 text-slate-900" />
              <span className="font-medium">Copper & Alkaline Fortification</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
              <span className="font-medium">100% Food-Grade ABS Plastic</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => navigate(`/checkout/${product.id}`)}
              className="flex-grow py-4 bg-slate-900 text-white rounded-md text-lg font-medium hover:bg-slate-800 transition-all shadow-lg"
            >
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-slate-400" />
              <div className="text-sm">
                <p className="font-bold text-slate-900">Free Delivery</p>
                <p className="text-slate-500">Across India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 text-slate-400" />
              <div className="text-sm">
                <p className="font-bold text-slate-900">Free Installation</p>
                <p className="text-slate-500">By Certified Techs</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};