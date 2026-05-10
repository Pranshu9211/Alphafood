import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiUsers, FiPackage, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const profileImageUrl = user?.profileImage;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Admin';

  return (
    <div className="premium-dashboard">
      {/* Dynamic Header */}
      <div className="dashboard-header">
        <div className="header-greeting">
          <div className="admin-avatar">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Admin" />
            ) : (
              <span>{firstName.charAt(0).toUpperCase()}</span>
            )}
            <div className="status-dot"></div>
          </div>
          <div>
            <h1 className="greeting-text">Welcome back, <span>{firstName}</span></h1>
            <p className="greeting-subtext">Here's what's happening with AlphaFoods today.</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card users-card">
          <div className="metric-icon-wrap">
            <FiUsers className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Users</p>
            <h2 className="metric-value">
              {loading ? <span className="skeleton-text"></span> : stats.totalUsers}
            </h2>
            <div className="metric-trend positive">
              <FiTrendingUp /> <span>+12% this week</span>
            </div>
          </div>
          <div className="card-glow"></div>
        </div>

        <div className="metric-card orders-card">
          <div className="metric-icon-wrap">
            <FiPackage className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Orders</p>
            <h2 className="metric-value">
              {loading ? <span className="skeleton-text"></span> : stats.totalOrders}
            </h2>
            <div className="metric-trend positive">
              <FiTrendingUp /> <span>+5% this week</span>
            </div>
          </div>
          <div className="card-glow"></div>
        </div>

        <div className="metric-card revenue-card">
          <div className="metric-icon-wrap">
            <FiDollarSign className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Revenue</p>
            <h2 className="metric-value">
              {loading ? <span className="skeleton-text"></span> : `₹${stats.totalRevenue.toLocaleString('en-IN')}`}
            </h2>
            <div className="metric-trend positive">
              <FiActivity /> <span>Steady growth</span>
            </div>
          </div>
          <div className="card-glow"></div>
        </div>
      </div>

      {/* Removed System Status & Quick Info */}
    </div>
  );
};

export default AdminDashboard;
