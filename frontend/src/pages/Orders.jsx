import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingBag, FiClock, FiPackage, FiCheckCircle, FiXCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Orders.css';

const statusConfig = {
  Pending:   { cls: 'od-badge-pending',   icon: <FiClock size={11} /> },
  Confirmed: { cls: 'od-badge-confirmed', icon: <FiCheckCircle size={11} /> },
  Delivered: { cls: 'od-badge-delivered', icon: <FiCheckCircle size={11} /> },
  Cancelled: { cls: 'od-badge-cancelled', icon: <FiXCircle size={11} /> },
};

const Orders = () => {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [expanded, setExpanded]   = useState({});

  useEffect(() => {
    axios.get('/api/orders/user')
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  if (loading) {
    return (
      <div className="od-page">
        <div className="od-hero">
          <div className="od-hero-inner">
            <div className="od-skeleton-title" />
            <div className="od-skeleton-sub" />
          </div>
        </div>
        <div className="od-body">
          {[1, 2, 3].map(i => <div key={i} className="od-skeleton-card" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="od-page">

      {/* ── HERO ── */}
      <div className="od-hero">
        <div className="od-hero-inner">
          <span className="od-hero-tag"><FiShoppingBag size={12} /> ORDER HISTORY</span>
          <h1 className="od-hero-title">
            My <span className="od-orange">Orders</span>
          </h1>
          <p className="od-hero-sub">
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed with us so far
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="od-body">
        {orders.length === 0 ? (
          <div className="od-empty">
            <div className="od-empty-icon"><FiPackage size={36} /></div>
            <h3>No Orders Yet</h3>
            <p>Looks like you haven't placed any orders. Start exploring our menu!</p>
            <a href="/" className="od-browse-btn">Browse Menu</a>
          </div>
        ) : (
          <div className="od-list">
            {orders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.Pending;
              const open = expanded[order._id];
              return (
                <div key={order._id} className="od-card">

                  {/* Card header */}
                  <div className="od-card-top" onClick={() => toggle(order._id)}>
                    <div className="od-card-left">
                      <div className="od-card-ico"><FiShoppingBag size={18} /></div>
                      <div>
                        <p className="od-card-id">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="od-card-date">{fmtDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="od-card-right">
                      <span className={`od-badge ${cfg.cls}`}>
                        {cfg.icon} {order.status}
                      </span>
                      <span className="od-card-total">₹{order.totalPrice}</span>
                      <button className="od-toggle-btn">
                        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded items */}
                  {open && (
                    <div className="od-items">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="od-item">
                          <img src={item.image} alt={item.name} className="od-item-img" />
                          <div className="od-item-info">
                            <span className="od-item-name">{item.name}</span>
                            <span className="od-item-qty">×{item.quantity}</span>
                          </div>
                          <span className="od-item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="od-footer">
                        <div className="od-footer-row">
                          <span>Subtotal</span>
                          <span>₹{order.items.reduce((s, i) => s + i.price * i.quantity, 0)}</span>
                        </div>
                        <div className="od-footer-row od-footer-total">
                          <span>Total</span>
                          <span className="od-orange">₹{order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
