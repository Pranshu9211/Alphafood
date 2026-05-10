import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiHome, FiInfo, FiPhone, FiSettings, FiShield, FiSun, FiMoon } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  const { user, cartCount, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <nav className={`navbar ${(scrolled || !isHome) ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-alpha">Alpha</span>
          <span className="logo-foods">Foods</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <FiHome /> Home
          </Link>
          <Link to="/menu" onClick={closeMenu} className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}>
            <MdRestaurantMenu /> Menu
          </Link>
          <Link to="/about" onClick={closeMenu} className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            <FiInfo /> About
          </Link>
          <Link to="/services" onClick={closeMenu} className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
            <FiSettings /> Services
          </Link>
          <Link to="/contact" onClick={closeMenu} className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            <FiPhone /> Contact
          </Link>
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="theme-toggle-icon spin-in" key={theme}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </span>
          </button>

          {user ? (
            <>
              {user.role !== 'admin' && (
                <>
                  <Link to="/cart" className="nav-action-btn cart-btn" title="Cart">
                    <FiShoppingCart />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                  <Link to="/orders" className="nav-action-btn" title="Orders">
                    <span className="orders-icon">📦</span>
                  </Link>
                  <Link to="/profile" className="nav-action-btn profile-btn" title="Profile">
                    <FiUser />
                    <span className="user-name">{user.name.split(' ')[0]}</span>
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-action-btn profile-btn" title="Admin Dashboard">
                  <FiUser />
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                </Link>
              )}
              <button onClick={handleLogout} className="nav-action-btn logout-btn" title="Logout">
                <FiLogOut />
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
