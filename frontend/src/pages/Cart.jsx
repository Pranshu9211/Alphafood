import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiPlus, FiMinus, FiTrash2, FiArrowRight } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get('/api/cart');
        setCart(res.data);
        const items = res.data.items || [];
        updateCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    void loadCart();
  }, [updateCartCount]);

  const updateQuantity = async (foodId, quantity) => {
    try {
      const res = await axios.put('/api/cart/update', { foodId, quantity });
      setCart(res.data);
      const items = res.data.items || [];
      updateCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
    } catch (err) { console.error(err); }
  };

  const removeItem = async (foodId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${foodId}`);
      setCart(res.data);
      const items = res.data.items || [];
      updateCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
    } catch (err) { console.error(err); }
  };

  const items = cart?.items?.filter(i => i.foodId) || [];
  const total = items.reduce((sum, i) => sum + (i.foodId.price * i.quantity), 0);

  if (loading) return <div className="cart-page"><div className="container section"><p>Loading cart...</p></div></div>;

  return (
    <div className="cart-page">
      <div className="page-hero">
        <h1>Your <span>Cart</span></h1>
        <p>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
      </div>
      <div className="container section">
        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some delicious food to your cart!</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Menu</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.foodId._id} className="cart-item glass-card">
                  <img src={item.foodId.image} alt={item.foodId.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3>{item.foodId.name}</h3>
                    <p className="cart-item-category">{item.foodId.category}</p>
                    <p className="cart-item-price">₹{item.foodId.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.foodId._id, item.quantity - 1)}>
                        <FiMinus />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.foodId._id, item.quantity + 1)}>
                        <FiPlus />
                      </button>
                    </div>
                    <p className="cart-item-subtotal">₹{item.foodId.price * item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeItem(item.foodId._id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary glass-card">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="summary-row"><span>Delivery Fee</span><span className="free">FREE</span></div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total"><span>Total</span><span>₹{total}</span></div>
              <button className="btn btn-primary btn-lg" style={{width:'100%',marginTop:'20px'}} onClick={() => navigate('/checkout')}>
                Proceed to Checkout <FiArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
