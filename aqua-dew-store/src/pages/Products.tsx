import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="p-20 text-center text-xl text-slate-500 font-light">Loading collection...</div>;
  }

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Our Flagship Collection</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Pure drinking water, simplified. Explore our premium range of RO purifiers designed for modern homes.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-slate-500 py-10">No products available yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center">
              
              {/* FIX: Removed the white box & padding. Made image fill the entire rounded container */}
              <div 
                className="rounded-[2rem] overflow-hidden mb-6 w-full aspect-square shadow-xl transition-transform duration-500 group-hover:-translate-y-2 cursor-pointer bg-slate-900" 
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                />
              </div>
              
              {/* Product Details perfectly matched to the #ccdbda background */}
              <div className="text-center w-full px-2">
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 h-10">{product.description}</p>
                <p className="text-xl font-bold text-slate-900 mb-6">₹{Number(product.price).toLocaleString()}</p>
                
                <button 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors w-full max-w-[250px] shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};