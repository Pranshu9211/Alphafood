import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiShield, FiUser, FiMoreVertical } from 'react-icons/fi';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setMessage('');
      setError('');
      const res = await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
      setMessage(res.data.message);
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      setActiveDropdown(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId, email) => {
    if (email === 'admin@alphafoods.com') {
      setError('Cannot delete the primary admin account.');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to permanently delete user ${email}?`)) return;

    try {
      setMessage('');
      setError('');
      const res = await axios.delete(`/api/admin/users/${userId}`);
      setMessage(res.data.message);
      setUsers(users.filter(u => u._id !== userId));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDropdown = (id) => {
    if (activeDropdown === id) setActiveDropdown(null);
    else setActiveDropdown(id);
  };

  return (
    <div className="manage-users-page fade-in">
      <div className="page-header">
        <div>
          <h1>Manage <span>Users</span></h1>
          <p>Control access, roles, and user accounts.</p>
        </div>
        <div className="header-stats">
          <div className="h-stat glass-panel">
            <span className="h-stat-label">Total</span>
            <span className="h-stat-val">{users.length}</span>
          </div>
        </div>
      </div>

      {message && <div className="alert-toast success">{message}</div>}
      {error && <div className="alert-toast error">{error}</div>}

      <div className="table-wrapper glass-panel">
        {loading ? (
          <div className="table-loader">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Contact Info</th>
                  <th>Joined Date</th>
                  <th>Role Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-profile-cell">
                          <div className="user-avatar-sm">
                            {user.profileImage ? (
                              <img src={user.profileImage} alt={user.name} />
                            ) : (
                              <span>{user.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="user-name-cell">
                            <span className="u-name">{user.name}</span>
                            <span className="u-id">ID: {user._id.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <span className="u-email">{user.email}</span>
                          <span className="u-phone">{user.phone || 'No phone'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="date-cell">{formatDate(user.createdAt)}</span>
                      </td>
                      <td>
                        <span className={`role-tag ${user.role}`}>
                          {user.role === 'admin' && <FiShield size={12} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="text-right">
                        {user.email === 'admin@alphafoods.com' ? (
                          <span className="locked-badge">Primary Admin</span>
                        ) : (
                          <div className="action-menu-container">
                            <button className="icon-btn" onClick={() => toggleDropdown(user._id)}>
                              <FiMoreVertical />
                            </button>
                            {activeDropdown === user._id && (
                              <div className="action-dropdown glass-panel">
                                <div className="dropdown-title">Change Role</div>
                                <button className="dropdown-item" onClick={() => handleRoleChange(user._id, 'user')}>
                                  Set as User
                                </button>
                                <button className="dropdown-item" onClick={() => handleRoleChange(user._id, 'admin')}>
                                  Set as Admin
                                </button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item danger" onClick={() => handleDeleteUser(user._id, user.email)}>
                                  <FiTrash2 /> Delete User
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
