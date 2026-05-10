import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiPhone, FiMapPin, FiHome, FiHash, FiDollarSign, FiTruck, FiCreditCard, FiShoppingBag, FiCheck, FiAlertCircle } from 'react-icons/fi';
import './Checkout.css';

const Checkout = () => {
  const { user, updateCartCount } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [onlineMsg, setOnlineMsg] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    addressLine: '',
    city: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get('/api/cart');
        setCart(res.data);
        if (!res.data || !res.data.items || res.data.items.length === 0) {
          navigate('/cart');
        }
      } catch (err) {
        console.error(err);
        navigate('/cart');
      }
      setLoading(false);
    };
    void loadCart();
  }, [navigate]);

  const items = cart?.items?.filter(i => i.foodId) || [];
  const total = items.reduce((sum, i) => sum + (i.foodId.price * i.quantity), 0);

  const validate = () => {
    const errs = {};
    if (!address.fullName.trim()) errs.fullName = 'Full name is required';
    if (!address.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(address.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
    if (!address.addressLine.trim()) errs.addressLine = 'Address is required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.pincode.trim()) errs.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(address.pincode.trim())) errs.pincode = 'Enter a valid 6-digit pincode';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePaymentSelect = (method) => {
    if (method === 'Online') {
      setOnlineMsg(true);
      setTimeout(() => setOnlineMsg(false), 3000);
      return;
    }
    setPaymentMethod(method);
    setOnlineMsg(false);
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setPlacing(true);
    setApiError('');
    try {
      await axios.post('/api/orders', {
        deliveryAddress: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          addressLine: address.addressLine.trim(),
          city: address.city.trim(),
          pincode: address.pincode.trim()
        },
        paymentMethod: 'COD'
      });
      setOrderSuccess(true);
      updateCartCount(0);
      setTimeout(() => navigate('/orders'), 3000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to place order');
    }
    setPlacing(false);
  };

  if (loading) return <div className="checkout-page"><div className="container section"><p>Loading...</p></div></div>;

  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="container section">
          <div className="order-success-card animate-fadeInUp">
            <div className="success-icon-wrap">
              <FiCheck className="success-icon" />
            </div>
            <h2>Order Placed Successfully! 🎉</h2>
            <p>Your order has been placed and is being prepared.</p>
            <div className="success-details glass-card">
              <div className="success-detail-row">
                <FiTruck /> <span>Delivery to: {address.addressLine}, {address.city} - {address.pincode}</span>
              </div>
              <div className="success-detail-row">
                <FiDollarSign /> <span>Payment: Cash on Delivery</span>
              </div>
              <div className="success-detail-row">
                <FiShoppingBag /> <span>Total: ₹{total}</span>
              </div>
            </div>
            <p className="redirect-msg">Redirecting to your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-hero">
        <h1><span>Checkout</span></h1>
        <p>Complete your order details</p>
      </div>
      <div className="container section">
        <div className="checkout-layout">
          {/* Left - Forms */}
          <div className="checkout-forms">
            {/* Address Section */}
            <div className="checkout-section glass-card">
              <div className="checkout-section-header">
                <div className="section-step">1</div>
                <div>
                  <h3>Delivery Address</h3>
                  <p>Where should we deliver your food?</p>
                </div>
              </div>

              <div className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-icon-wrap">
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        name="fullName"
                        className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                        placeholder="Enter your full name"
                        value={address.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-icon-wrap">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="10-digit phone number"
                        value={address.phone}
                        onChange={handleChange}
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Address Line</label>
                  <div className="input-icon-wrap">
                    <FiHome className="input-icon" />
                    <input
                      type="text"
                      name="addressLine"
                      className={`form-input ${errors.addressLine ? 'input-error' : ''}`}
                      placeholder="House no, Street, Landmark"
                      value={address.addressLine}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.addressLine && <span className="field-error">{errors.addressLine}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <div className="input-icon-wrap">
                      <FiMapPin className="input-icon" />
                      <input
                        type="text"
                        name="city"
                        className={`form-input ${errors.city ? 'input-error' : ''}`}
                        placeholder="Enter your city"
                        value={address.city}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <div className="input-icon-wrap">
                      <FiHash className="input-icon" />
                      <input
                        type="text"
                        name="pincode"
                        className={`form-input ${errors.pincode ? 'input-error' : ''}`}
                        placeholder="6-digit pincode"
                        value={address.pincode}
                        onChange={handleChange}
                        maxLength={6}
                      />
                    </div>
                    {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="checkout-section glass-card">
              <div className="checkout-section-header">
                <div className="section-step">2</div>
                <div>
                  <h3>Payment Method</h3>
                  <p>Choose how you'd like to pay</p>
                </div>
              </div>

              <div className="payment-options">
                <div
                  className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('COD')}
                >
                  <div className="payment-radio">
                    {paymentMethod === 'COD' && <div className="radio-dot"></div>}
                  </div>
                  <FiTruck className="payment-icon" />
                  <div className="payment-info">
                    <h4>Cash on Delivery</h4>
                    <p>Pay when your food arrives</p>
                  </div>
                  <span className="payment-badge available">Available</span>
                </div>

                <div
                  className="payment-option disabled"
                  onClick={() => handlePaymentSelect('Online')}
                >
                  <div className="payment-radio"></div>
                  <FiCreditCard className="payment-icon" />
                  <div className="payment-info">
                    <h4>Online Payment</h4>
                    <p>UPI, Cards, Net Banking</p>
                  </div>
                  <span className="payment-badge unavailable">Coming Soon</span>
                </div>
              </div>

              {onlineMsg && (
                <div className="online-warning animate-fadeInUp">
                  <FiAlertCircle />
                  <span>Online payment is currently not available. Please use Cash on Delivery.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="checkout-summary glass-card">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item.foodId._id} className="checkout-item">
                  <img src={item.foodId.image} alt={item.foodId.name} className="checkout-item-img" />
                  <div className="checkout-item-info">
                    <h4>{item.foodId.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="checkout-item-price">₹{item.foodId.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span className="free">FREE</span></div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total"><span>Total</span><span>₹{total}</span></div>

            {apiError && (
              <div className="checkout-error">
                <FiAlertCircle /> {apiError}
              </div>
            )}

            <button
              className="btn btn-primary btn-lg checkout-btn"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              <FiShoppingBag />
              {placing ? 'Placing Order...' : `Place Order • ₹${total}`}
            </button>

            <p className="checkout-note">
              <FiTruck /> Estimated delivery: 30-45 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
