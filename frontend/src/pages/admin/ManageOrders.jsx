/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css'; // Reusing premium table styles

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/admin');
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status });
      fetchOrders();
    } catch (e) { console.error(e); }
  };

  const getStatusClass = (status) => {
    if (status === 'Confirmed') return 'admin'; // Using role-tag admin style
    if (status === 'Cancelled') return 'admin'; // Could use a danger style
    if (status === 'Delivered') return 'user'; // Using role-tag user style
    return ''; // Pending
  };

  const getStatusColor = (status) => {
    if (status === 'Confirmed') return { background: 'rgba(0, 136, 255, 0.1)', color: '#0088ff', border: '1px solid rgba(0, 136, 255, 0.2)' };
    if (status === 'Cancelled') return { background: 'rgba(233, 69, 96, 0.1)', color: 'var(--primary)', border: '1px solid rgba(233, 69, 96, 0.2)' };
    if (status === 'Delivered') return { background: 'rgba(0, 212, 170, 0.1)', color: '#00d4aa', border: '1px solid rgba(0, 212, 170, 0.2)' };
    return { background: 'rgba(245, 166, 35, 0.1)', color: 'var(--secondary)', border: '1px solid rgba(245, 166, 35, 0.2)' };
  };

  return (
    <div className="manage-users-page fade-in">
      <div className="page-header">
        <div>
          <h1>Manage <span>Orders</span></h1>
          <p>Track, update, and manage customer orders.</p>
        </div>
        <div className="header-stats">
          <div className="h-stat glass-panel">
            <span className="h-stat-label">Total Orders</span>
            <span className="h-stat-val">{orders.length}</span>
          </div>
        </div>
      </div>

      <div className="table-wrapper glass-panel">
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">No orders found.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <span className="u-name" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span className="u-name">{order.userId?.name || 'Guest User'}</span>
                        <span className="u-id">{order.userId?.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <span className="u-id" style={{ display: 'block', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </span>
                    </td>
                    <td>
                      <span className="u-name" style={{ color: 'var(--accent)' }}>₹{order.totalPrice}</span>
                    </td>
                    <td>
                      <span className="role-tag" style={getStatusColor(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <select
                        className="form-input"
                        style={{ 
                          padding: '8px 12px', 
                          fontSize: '0.85rem', 
                          width: '130px', 
                          background: 'rgba(0,0,0,0.2)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer'
                        }}
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Pending" style={{ background: '#1a1a2e', color: 'white' }}>Pending</option>
                        <option value="Confirmed" style={{ background: '#1a1a2e', color: 'white' }}>Confirmed</option>
                        <option value="Delivered" style={{ background: '#1a1a2e', color: 'white' }}>Delivered</option>
                        <option value="Cancelled" style={{ background: '#1a1a2e', color: 'white' }}>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
