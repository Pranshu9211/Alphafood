import { useAuth } from '../../context/AuthContext';
import { FiShield } from 'react-icons/fi';
import './AdminProfile.css';

const AdminProfile = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const profileImageUrl = user.profileImage;
  const firstName = user.name ? user.name.split(' ')[0] : 'Admin';

  return (
    <div className="admin-profile-page">
      <div className="ap-header">
        <h1>Admin <span>Profile</span></h1>
        <p>Manage your administrative account details.</p>
      </div>

      <div className="ap-card">
        <div className="ap-top">
          <div className="ap-avatar">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Admin Avatar" />
            ) : (
              <span>{firstName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="ap-title">
            <h2>{user.name}</h2>
            <p><FiShield /> System Administrator</p>
          </div>
        </div>

        <div className="ap-details">
          <div className="ap-field">
            <label>Full Name</label>
            <div className="ap-value">{user.name}</div>
          </div>
          
          <div className="ap-field">
            <label>Email Address</label>
            <div className="ap-value">{user.email}</div>
          </div>
          
          <div className="ap-field">
            <label>Account Role</label>
            <div className="ap-value" style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700' }}>
              {user.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
