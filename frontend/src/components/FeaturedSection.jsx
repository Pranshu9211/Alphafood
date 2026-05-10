import { useNavigate } from 'react-router-dom';
import './FeaturedSection.css';
import Paneertikka from '../assets/Pannertikka.jpg'

const FeaturedSection = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/menu');
  };

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-content">
          <div className="featured-badge">⭐ Chef's Special</div>
          <h2 className="featured-title">Signature Paneer Tikka Platter</h2>
          <p className="featured-description">
            A delightful blend of marinated paneer tikka, cooked to perfection and served with a side of creamy raita and fresh roti.
          </p>
          <div className="featured-rating">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <span className="rating-text">(2,845 ratings)</span>
          </div>
          <div className="featured-meta">
            <span className="meta-item">🕐 25-30 mins</span>
            <span className="meta-item">📦 Free Delivery</span>
            <span className="meta-item">♻️ Eco-friendly Packaging</span>
          </div>
          <div className="featured-price">
            <span className="price-label">From</span>
            <span className="price-amount">$45</span>
            <span className="price-original">$55</span>
          </div>
          <button className="featured-btn" onClick={handleOrderClick}>
            Order Now
          </button>
        </div>
        <div className="featured-image">
          <img 
            src={Paneertikka}
            alt="Signature Paneer Tikka Platter"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
