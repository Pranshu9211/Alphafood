import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiPhone, FiHeart } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="logo-alpha">Alpha</span>
              <span className="logo-foods">Foods</span>
            </h3>
            <p className="footer-desc">
              Your favorite food, delivered fast. Experience the best flavors from top restaurants right at your doorstep.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link"><FaFacebookF /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaYoutube /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/">Pizza</Link></li>
              <li><Link to="/">Burgers</Link></li>
              <li><Link to="/">Indian Food</Link></li>
              <li><Link to="/">Desserts</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li><FiMapPin /> <span>123 Food Street, Indore</span></li>
              <li><FiMail /> <span>support@alphafoods.com</span></li>
              <li><FiPhone /> <span>+91 98765 43210</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 AlphaFoods. All rights reserved. Made with <FiHeart className="heart-icon" /> in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
