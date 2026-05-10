import { useNavigate } from 'react-router-dom';
import './Hero.css';

const heroParticles = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${3 + Math.random() * 4}s`
}));

const Hero = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/menu');
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-particles">
        {heroParticles.map((particle, i) => (
          <div key={i} className="particle" style={particle}></div>
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badge">🔥 #1 Food Delivery Platform</div>
        <h1 className="hero-title">
          Welcome to <span className="hero-brand">AlphaFoods</span>
        </h1>
        <p className="hero-subtitle">
          Discover delicious meals from the best restaurants. Fast delivery, fresh food, unforgettable taste.
        </p>
        <button className="order-now-btn" onClick={handleOrderNow}>
          Order Now
        </button>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Restaurants</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">30min</span>
            <span className="stat-label">Avg. Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
