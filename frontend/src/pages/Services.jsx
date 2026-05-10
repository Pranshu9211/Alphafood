import { Link } from 'react-router-dom';
import './Services.css';
import { FiTruck, FiClock, FiSmartphone, FiHeadphones, FiShield, FiStar, FiArrowRight } from 'react-icons/fi';

const services = [
  {
    icon: <FiTruck />,
    title: 'Lightning Fast Delivery',
    desc: 'Average delivery time of just 30 minutes. Real-time GPS tracking keeps you informed every step of the way.',
    accent: '#ff6600',
    tag: 'Delivery',
  },
  {
    icon: <FiClock />,
    title: 'Freshly Cooked Every Time',
    desc: 'Every meal is prepared fresh upon your order. We partner with kitchens that prioritize quality ingredients.',
    accent: '#f5a623',
    tag: 'Quality',
  },
  {
    icon: <FiSmartphone />,
    title: 'Seamless Ordering',
    desc: 'Browse, select, and checkout in under a minute. Our app is designed for effortless discovery and speed.',
    accent: '#00d4aa',
    tag: 'App',
  },
  {
    icon: <FiHeadphones />,
    title: '24/7 Customer Support',
    desc: 'Round-the-clock support from our dedicated team. We\'re always here to help with any query, any time.',
    accent: '#7c5cff',
    tag: 'Support',
  },
  {
    icon: <FiShield />,
    title: 'Safe & Secure Payments',
    desc: 'Your payment data is fully encrypted. We support UPI, cards, wallets, and cash on delivery.',
    accent: '#e94560',
    tag: 'Security',
  },
  {
    icon: <FiStar />,
    title: 'Loyalty Rewards',
    desc: 'Earn points on every order. Redeem for discounts, free delivery, and exclusive deals with partner restaurants.',
    accent: '#ff6600',
    tag: 'Rewards',
  },
];

const highlights = [
  { value: '30 min', label: 'Average Delivery' },
  { value: '99.2%', label: 'On-Time Rate' },
  { value: '24/7',  label: 'Support' },
  { value: '200+',  label: 'Partner Kitchens' },
];

const Services = () => {
  return (
    <div className="sv-page">

      {/* ── HERO ── */}
      <div className="sv-hero">
        <div className="sv-hero-inner">
          <span className="sv-badge"><FiStar size={12} /> WHY ALPHAFOODS</span>
          <h1 className="sv-hero-title">
            Services Built Around <span className="sv-orange">You</span>
          </h1>
          <p className="sv-hero-sub">
            From lightning-fast delivery to round-the-clock support — everything we do is designed to make your food experience effortless.
          </p>
        </div>
      </div>

      {/* ── HIGHLIGHTS BAR ── */}
      <div className="sv-highlights">
        {highlights.map((h, i) => (
          <div key={i} className="sv-highlight-item">
            <span className="sv-highlight-val">{h.value}</span>
            <span className="sv-highlight-label">{h.label}</span>
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="sv-body">

        {/* Services grid */}
        <div className="sv-grid">
          {services.map((s, i) => (
            <div
              key={i}
              className="sv-card"
              style={{ '--sv-accent': s.accent }}
            >
              <div className="sv-card-top">
                <div className="sv-icon-wrap">{s.icon}</div>
                <span className="sv-tag">{s.tag}</span>
              </div>
              <h3 className="sv-card-title">{s.title}</h3>
              <p className="sv-card-desc">{s.desc}</p>
              <div className="sv-card-arrow"><FiArrowRight size={14} /></div>
              <div className="sv-glow" />
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="sv-cta">
          <div className="sv-cta-text">
            <h2>Ready to experience it yourself?</h2>
            <p>Join 50,000+ happy customers who order with AlphaFoods every day.</p>
          </div>
          <Link to="/menu" className="sv-cta-btn">Order Now <FiArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
