/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  FiCamera, FiLock, FiCheckCircle, FiAlertCircle,
  FiUser, FiMapPin, FiPlus, FiPhone, FiShoppingBag, FiHeart, FiEdit2, FiTrash2
} from 'react-icons/fi';
import './Profile.css';

const emptyAddress = { label: 'Home', fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '', isDefault: false };
const emptyPassword = { oldPassword: '', newPassword: '', confirmPassword: '' };
const now = Date.now();

const Profile = () => {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formData, setFormData] = useState({ name: '', profileImage: '', addresses: [], favorites: [] });
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addressIndex, setAddressIndex] = useState(null);
  const [passwordData, setPasswordData] = useState(emptyPassword);
  const [addressMessage, setAddressMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  async function loadProfile() {
    setLoading(true);
    setError('');
    try {
      const [profileRes, ordersRes] = await Promise.all([
        axios.get('/api/auth/profile'),
        axios.get('/api/orders/user')
      ]);
      setProfile(profileRes.data);
      setOrders(ordersRes.data || []);
      setFormData({
        name: profileRes.data.name || '',
        profileImage: profileRes.data.profileImage || '',
        addresses: profileRes.data.addresses || [],
        favorites: profileRes.data.favorites || []
      });
      setAvatarPreview(profileRes.data.profileImage || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load profile data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authLoading) {
      void loadProfile();
    }
  }, [authLoading]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    setSaving(true); setMessage(''); setError('');
    try {
      let imageUrl = formData.profileImage;
      if (avatarFile) {
        const uploadData = new FormData();
        uploadData.append('avatar', avatarFile);
        const uploadRes = await axios.post('/api/auth/profile/avatar', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        imageUrl = uploadRes.data.imageUrl;
      }
      const payload = { name: formData.name, profileImage: imageUrl, addresses: formData.addresses, favorites: formData.favorites.map((i) => i._id || i) };
      const res = await axios.put('/api/auth/profile', payload);
      setProfile(res.data);
      refreshUser({ name: res.data.name, profileImage: res.data.profileImage });
      setFormData({ ...formData, profileImage: res.data.profileImage, addresses: res.data.addresses || [], favorites: res.data.favorites || [] });
      setAvatarPreview(res.data.profileImage || '');
      setAvatarFile(null);
      setMessage('Profile saved successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddressEdit = (index) => {
    setAddressIndex(index);
    setAddressForm({ ...profile.addresses[index], label: profile.addresses[index].label || 'Home' });
    setAddressMessage(''); setAddressError('');
    setShowAddressForm(true);
  };

  const handleAddressDelete = async (index) => {
    await persistAddresses((profile.addresses || []).filter((_, i) => i !== index));
  };

  const handleAddressSave = async () => {
    setAddressMessage(''); setAddressError('');
    const nextAddresses = [...(profile.addresses || [])];
    const norm = { ...addressForm, label: addressForm.label || 'Home', fullName: addressForm.fullName.trim(), phone: addressForm.phone.trim(), addressLine: addressForm.addressLine.trim(), city: addressForm.city.trim(), state: addressForm.state.trim(), pincode: addressForm.pincode.trim(), isDefault: Boolean(addressForm.isDefault) };
    if (!norm.fullName || !norm.phone || !norm.addressLine || !norm.city || !norm.pincode) { setAddressError('All address fields are required.'); return; }
    if (!/^[0-9]{10}$/.test(norm.phone)) { setAddressError('Phone number must be 10 digits.'); return; }
    if (!/^[0-9]{6}$/.test(norm.pincode)) { setAddressError('Pincode must be 6 digits.'); return; }
    if (norm.isDefault) nextAddresses.forEach((a) => { a.isDefault = false; });
    if (addressIndex !== null) nextAddresses[addressIndex] = norm;
    else nextAddresses.push(norm);
    await persistAddresses(nextAddresses);
    setAddressForm(emptyAddress); setAddressIndex(null); setShowAddressForm(false);
  };

  const persistAddresses = async (next) => {
    try {
      const res = await axios.put('/api/auth/profile/addresses', { addresses: next });
      setProfile((p) => ({ ...p, addresses: res.data }));
      setFormData((p) => ({ ...p, addresses: res.data }));
      setAddressMessage('Address book updated.');
    } catch (err) {
      setAddressError(err.response?.data?.message || 'Unable to save addresses');
    }
  };

  const handleFavoriteToggle = async (foodId) => {
    try {
      await axios.put(`/api/auth/profile/favorites/${foodId}`);
      const profileRes = await axios.get('/api/auth/profile');
      setProfile(profileRes.data);
      setFormData((p) => ({ ...p, favorites: profileRes.data.favorites || [] }));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update favorites');
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault(); setPasswordMessage(''); setPasswordError('');
    try {
      await axios.put('/api/auth/profile/password', passwordData);
      setPasswordMessage('Password updated successfully.');
      setPasswordData(emptyPassword);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Unable to change password');
    }
  };

  const greetingName = profile?.name || user?.name || 'Food Lover';
  const firstName = greetingName.split(' ')[0];
  const profileImageUrl = avatarPreview || profile?.profileImage;
  const totalOrders = profile?.stats?.totalOrders ?? orders.length;
  const totalSpent = profile?.stats?.totalSpent ?? orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const favCat = profile?.stats?.favoriteCategory || 'Italian';

  const fmtDate = (d) => {
    const date = new Date(d);
    const diff = (now - date) / 3600000;
    const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return diff < 24 ? `Today, ${time}` : `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, ${time}`;
  };

  if (loading || authLoading) {
    return (
      <div className="pf-page">
        <div className="pf-skeleton-hero" />
        <div className="pf-skeleton-body">
          <div className="pf-skeleton-card" />
          <div className="pf-skeleton-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="pf-page">

      {/* ── HERO BANNER ── */}
      <div className="pf-hero">
        <div className="pf-hero-inner">
          <div className="pf-avatar-wrap">
            <div className="pf-avatar-ring">
              {profileImageUrl
                ? <img src={profileImageUrl} alt="avatar" />
                : <span>{firstName.charAt(0).toUpperCase()}</span>}
            </div>
            <label className="pf-cam-btn">
              <FiCamera size={13} />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="pf-hero-text">
            <h1 className="pf-greeting">Hello, <span className="pf-orange">{firstName}</span></h1>
            <p className="pf-subtitle">Premium Foodie Member</p>
            <div className="pf-stats-row">
              <div className="pf-stat">
                <span className="pf-stat-label">TOTAL ORDERS</span>
                <span className="pf-stat-val">{totalOrders}</span>
              </div>
              <div className="pf-stat-sep" />
              <div className="pf-stat">
                <span className="pf-stat-label">TOTAL SPENT</span>
                <span className="pf-stat-val">₹{totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <div className="pf-stat-sep" />
              <div className="pf-stat">
                <span className="pf-stat-label">FAVORITE</span>
                <span className="pf-stat-val pf-orange">{favCat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="pf-body">
        {message && <div className="pf-alert ok"><FiCheckCircle /> {message}</div>}
        {error   && <div className="pf-alert err"><FiAlertCircle /> {error}</div>}

        <div className="pf-layout">

          {/* LEFT */}
          <div className="pf-col-left">

            {/* Account Details */}
            <div className="pf-card">
              <div className="pf-card-head">
                <FiUser className="pf-icon" />
                <h2>Account Details</h2>
              </div>
              <div className="pf-field">
                <label>FULL NAME</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="pf-field">
                <label>EMAIL ADDRESS</label>
                <input type="email" value={profile.email} disabled />
              </div>
              <button className="pf-btn-orange" onClick={handleSaveProfile} disabled={saving}>
                {saving ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>

            {/* Security */}
            <div className="pf-card">
              <div className="pf-card-head">
                <FiLock className="pf-icon pf-orange" />
                <h2 className="pf-orange">Security</h2>
              </div>
              <form onSubmit={handlePasswordSave}>
                <div className="pf-field">
                  <input type="password" placeholder="Current Password" value={passwordData.oldPassword} onChange={(e) => setPasswordData((p) => ({ ...p, oldPassword: e.target.value }))} />
                </div>
                <div className="pf-field">
                  <input type="password" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))} />
                </div>
                <div className="pf-field">
                  <input type="password" placeholder="Confirm New Password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))} />
                </div>
                {passwordError   && <div className="pf-msg err">{passwordError}</div>}
                {passwordMessage && <div className="pf-msg ok">{passwordMessage}</div>}
                <button type="submit" className="pf-btn-outline">UPDATE PASSWORD</button>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="pf-col-right">

            {/* Address Book */}
            <div className="pf-card">
              <div className="pf-card-head">
                <FiMapPin className="pf-icon" />
                <h2>Address Book</h2>
                <button className="pf-add-circle" title="Add address" onClick={() => { setShowAddressForm(true); setAddressIndex(null); setAddressForm(emptyAddress); }}>
                  <FiPlus size={16} />
                </button>
              </div>

              {(profile.addresses || []).length === 0 && !showAddressForm && (
                <p className="pf-empty">No saved addresses yet.</p>
              )}

              <div className="pf-addr-grid">
                {(profile.addresses || []).map((addr, i) => (
                  <div key={i} className="pf-addr-card">
                    <span className="pf-addr-tag">{addr.label || 'Home'}</span>
                    <p className="pf-addr-name">{addr.fullName}</p>
                    <p className="pf-addr-line">{addr.addressLine}</p>
                    <p className="pf-addr-line">{addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.pincode}</p>
                    <p className="pf-addr-phone"><FiPhone size={12} /> +91 {addr.phone}</p>
                    <div className="pf-addr-actions">
                      <button className="pf-lnk" onClick={() => handleAddressEdit(i)}><FiEdit2 size={12}/> Edit</button>
                      <button className="pf-lnk red" onClick={() => handleAddressDelete(i)}><FiTrash2 size={12}/> Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              {showAddressForm && (
                <div className="pf-addr-form">
                  <div className="pf-form-row2">
                    <div className="pf-field"><label>Label</label><input type="text" value={addressForm.label} onChange={(e) => setAddressForm((p) => ({ ...p, label: e.target.value }))} placeholder="Home / Work" /></div>
                    <div className="pf-field"><label>Full Name</label><input type="text" value={addressForm.fullName} onChange={(e) => setAddressForm((p) => ({ ...p, fullName: e.target.value }))} /></div>
                  </div>
                  <div className="pf-form-row2">
                    <div className="pf-field"><label>Phone</label><input type="text" value={addressForm.phone} onChange={(e) => setAddressForm((p) => ({ ...p, phone: e.target.value }))} /></div>
                    <div className="pf-field"><label>Pincode</label><input type="text" value={addressForm.pincode} onChange={(e) => setAddressForm((p) => ({ ...p, pincode: e.target.value }))} /></div>
                  </div>
                  <div className="pf-field"><label>Address</label><input type="text" value={addressForm.addressLine} onChange={(e) => setAddressForm((p) => ({ ...p, addressLine: e.target.value }))} /></div>
                  <div className="pf-form-row2">
                    <div className="pf-field"><label>City</label><input type="text" value={addressForm.city} onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))} /></div>
                    <div className="pf-field"><label>State</label><input type="text" value={addressForm.state} onChange={(e) => setAddressForm((p) => ({ ...p, state: e.target.value }))} /></div>
                  </div>
                  <label className="pf-check-row">
                    <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm((p) => ({ ...p, isDefault: e.target.checked }))} />
                    Set as default
                  </label>
                  {addressError   && <div className="pf-msg err">{addressError}</div>}
                  {addressMessage && <div className="pf-msg ok">{addressMessage}</div>}
                  <div className="pf-form-actions">
                    <button className="pf-btn-orange" onClick={handleAddressSave}>{addressIndex !== null ? 'Update Address' : 'Add Address'}</button>
                    <button className="pf-btn-outline" onClick={() => { setShowAddressForm(false); setAddressIndex(null); setAddressForm(emptyAddress); }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="pf-card">
              <div className="pf-card-head">
                <FiShoppingBag className="pf-icon" />
                <h2>Recent Orders</h2>
                <a href="/orders" className="pf-view-all">VIEW ALL</a>
              </div>
              {orders.length === 0
                ? <p className="pf-empty">No recent orders yet.</p>
                : <div className="pf-orders">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order._id} className="pf-order-row">
                        <div className="pf-order-ico"><FiShoppingBag size={18} /></div>
                        <div className="pf-order-info">
                          <span className="pf-order-id">#{order._id.slice(-8).toUpperCase()}</span>
                          <span className="pf-order-meta">{fmtDate(order.createdAt)} &bull; {order.items.length} Item{order.items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="pf-order-right">
                          <span className="pf-order-price">₹{order.totalPrice}</span>
                          <span className={`pf-badge ${order.status?.toLowerCase()}`}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>

            {/* Saved Cravings */}
            <div className="pf-card">
              <div className="pf-card-head">
                <FiHeart className="pf-icon" />
                <h2>Saved Cravings</h2>
              </div>
              {(profile.favorites || []).length === 0
                ? <p className="pf-empty">No saved cravings yet.</p>
                : <div className="pf-cravings">
                    {profile.favorites.slice(0, 3).map((item) => (
                      <div key={item._id} className="pf-craving-card">
                        <div className="pf-craving-img-wrap">
                          <img src={item.image} alt={item.name} />
                          <button className="pf-heart-btn" onClick={() => handleFavoriteToggle(item._id)}>
                            <FiHeart size={14} fill="#ff4444" color="#ff4444" />
                          </button>
                        </div>
                        <div className="pf-craving-foot">
                          <div className="pf-craving-row">
                            <span className="pf-craving-name">{item.name}</span>
                            <span className="pf-craving-price">₹{item.price}</span>
                          </div>
                          <span className="pf-craving-cat">{item.category} &bull; {item.cuisine || 'Restaurant'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
