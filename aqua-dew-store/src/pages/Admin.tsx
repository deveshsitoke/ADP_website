import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState(''); // NEW FIELD

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const productData = { 
      name, 
      price: Number(price), 
      description, 
      image_url: imageUrl,
      additional_images: additionalImages // SAVING THE EXTRA IMAGES
    };

    try {
      if (isEditing && editId) {
        const { error } = await supabase.from('products').update(productData).eq('id', editId);
        if (error) throw error;
        alert('Product modified successfully!');
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        alert('Product added successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setIsEditing(true);
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImageUrl(product.image_url);
    setAdditionalImages(product.additional_images || ''); // LOADING EXTRA IMAGES
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error: any) {
      alert('Error deleting product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setAdditionalImages(''); // RESETTING
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-500">Manage your product catalog: Add, Modify, or Delete products.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {isEditing ? <Edit2 className="text-blue-600 w-5 h-5" /> : <Plus className="text-green-600 w-5 h-5" />}
            {isEditing ? 'Modify Product' : 'Add New Product'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-sm font-medium">
              <X className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Product Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Price (₹)</label>
              <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Main Image Path</label>
            <input type="text" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. /MERMAID.png" />
          </div>

          {/* NEW ADDITIONAL IMAGES FIELD */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Additional Gallery Images</label>
            <input type="text" value={additionalImages} onChange={e => setAdditionalImages(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. /MERMAID_side.png, /MERMAID_top.png" />
            <p className="text-xs text-slate-400 mt-1">Separate multiple image paths with a comma. Leave blank if none.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
            <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
          </div>

          <button type="submit" disabled={loading} className={`w-full py-4 text-white font-bold rounded-lg transition-colors ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
            {loading ? 'Processing...' : (isEditing ? 'Save Changes' : 'Publish Product')}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Current Catalog</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-bold">Image</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 object-contain bg-slate-100 rounded" />
                  </td>
                  <td className="p-4 font-bold text-slate-900">{product.name}</td>
                  <td className="p-4 text-slate-600">₹{product.price.toLocaleString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};