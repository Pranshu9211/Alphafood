import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiPackage, FiUsers, FiUser } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="premium-admin-layout">
      {/* Sidebar */}
      <aside className="premium-admin-sidebar">
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FiHome className="nav-icon" />
            <span>Dashboard</span>
            <div className="nav-indicator"></div>
          </NavLink>
          
          <NavLink to="/admin/food" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FiGrid className="nav-icon" />
            <span>Manage Menu</span>
            <div className="nav-indicator"></div>
          </NavLink>
          
          <NavLink to="/admin/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FiPackage className="nav-icon" />
            <span>Manage Orders</span>
            <div className="nav-indicator"></div>
          </NavLink>
          
          <NavLink to="/admin/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FiUser className="nav-icon" />
            <span>Admin Profile</span>
            <div className="nav-indicator"></div>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="premium-admin-main">
        <div className="admin-content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
