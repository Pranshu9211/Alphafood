/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiLoader } from 'react-icons/fi';
import './ManageUsers.css'; // Reusing premium table styles

const emptyForm = { name: '', price: '', image: '', category: 'Pizza', description: '' };
const categories = ['Pizza', 'Burger', 'Drinks', 'Desserts', 'Indian Food', 'Fast Food'];

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('/api/food');
      setFoods(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    void fetchFoods();
  }, []);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (food) => { setEditId(food._id); setForm({ name: food.name, price: food.price, image: food.image, category: food.category, description: food.description || '' }); setShowModal(true); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await axios.post('/api/food/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/food/${editId}`, { ...form, price: Number(form.price) });
      } else {
        await axios.post('/api/food', { ...form, price: Number(form.price) });
      }
      setShowModal(false);
      fetchFoods();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try { await axios.delete(`/api/food/${id}`); fetchFoods(); } catch (e) { console.error(e); }
  };

  return (
    <div className="manage-users-page fade-in">
      <div className="page-header">
        <div>
          <h1>Manage <span>Menu</span></h1>
          <p>Add, edit, or remove items from the platform.</p>
        </div>
        <div className="header-stats">
          <div className="h-stat glass-panel">
            <span className="h-stat-label">Total Items</span>
            <span className="h-stat-val">{foods.length}</span>
          </div>
          <button className="btn btn-primary" onClick={openAdd} style={{ padding: '0 1.5rem', height: '100%', borderRadius: '12px', fontWeight: 600 }}>
            <FiPlus size={20} /> Add Item
          </button>
        </div>
      </div>

      <div className="table-wrapper glass-panel">
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Item Image</th>
                <th>Name & Description</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food._id}>
                  <td>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={food.image} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </td>
                  <td>
                    <div className="user-name-cell">
                      <span className="u-name">{food.name}</span>
                      <span className="u-id" style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {food.description || 'No description'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="role-tag user">{food.category}</span>
                  </td>
                  <td>
                    <span className="u-name" style={{ color: 'var(--accent)' }}>₹{food.price}</span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="icon-btn" onClick={() => openEdit(food)}>
                        <FiEdit2 />
                      </button>
                      <button className="icon-btn" style={{ color: 'var(--primary)' }} onClick={() => handleDelete(food._id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ zIndex: 9999 }}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{editId ? 'Edit Food Item' : 'Add Food Item'}</h2>
              <button className="icon-btn" onClick={() => setShowModal(false)}><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.2)' }}>
                    {form.image ? (
                      <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>No Image</div>
                    )}
                    {uploading && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiLoader className="spin" size={24} />
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{ position: 'absolute', bottom: '-10px', right: '-10px', padding: '8px', borderRadius: '50%', minWidth: 'auto', background: 'var(--accent)', border: 'none' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiUpload size={14} />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Name</label>
                    <input className="form-input" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Price (₹)</label>
                    <input className="form-input" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Image URL (Optional - will auto-fill on upload)</label>
                <input className="form-input" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Category</label>
                <select className="form-input" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Description</label>
                <textarea className="form-input" rows="3" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white' }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={uploading}>{editId ? 'Update' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFood;
