import { Link } from 'react-router-dom';
import './About.css';
import { FiTarget, FiHeart, FiStar, FiAward, FiUsers, FiPackage, FiClock, FiZap } from 'react-icons/fi';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '200+', label: 'Restaurant Partners' },
  { value: '30 min', label: 'Avg Delivery Time' },
  { value: '4.9★', label: 'App Rating' },
];

const values = [
  { icon: <FiTarget />, title: 'Quality First', desc: 'We maintain the highest standards of food quality and hygiene across every partner kitchen we work with.' },
  { icon: <FiHeart />, title: 'Customer Love', desc: 'Your satisfaction is our top priority. Every decision we make starts and ends with your experience.' },
  { icon: <FiStar />, title: 'Innovation', desc: 'Constantly improving our platform — from smarter discovery to faster checkout and live order tracking.' },
  { icon: <FiAward />, title: 'Excellence', desc: 'Award-winning service recognized across the industry for reliability, speed, and culinary diversity.' },
];

const team = [
  { name: 'Lucky Sharma', role: 'Founder & CEO', initials: 'LS' },
  { name: 'Priya Verma', role: 'Head of Operations', initials: 'PV' },
  { name: 'Rahul Gupta', role: 'CTO', initials: 'RG' },
];

const About = () => {
  return (
    <div className="ab-page">

      {/* ── HERO ── */}
      <div className="ab-hero">
        <div className="ab-hero-inner">
          <span className="ab-badge"><FiZap size={12} /> OUR STORY</span>
          <h1 className="ab-hero-title">
            Crafting <span className="ab-orange">Memorable</span> Meals<br />Since 2024
          </h1>
          <p className="ab-hero-sub">
            Born from a simple belief — everyone deserves access to delicious, high-quality food delivered fast and fresh to their doorstep.
          </p>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="ab-stats-bar">
        {stats.map((s, i) => (
          <div key={i} className="ab-stat-item">
            <span className="ab-stat-val">{s.value}</span>
            <span className="ab-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── STORY ── */}
      <div className="ab-body">
        <section className="ab-story">
          <div className="ab-story-text">
            <span className="ab-section-tag"><FiUsers size={12} /> WHO WE ARE</span>
            <h2 className="ab-section-title">More Than Just Food Delivery</h2>
            <p>AlphaFoods was born from a simple idea: everyone deserves access to delicious, high-quality food delivered right to their doorstep. Founded in 2024, we've grown from a small startup to one of India's most trusted food delivery platforms.</p>
            <p>We partner with the finest restaurants and local kitchens to bring you a diverse menu that caters to every craving. From classic Indian dishes to international cuisine, we've got something for everyone.</p>
            <div className="ab-story-chips">
              {['Fast Delivery', 'Live Tracking', 'Fresh Ingredients', 'Verified Partners'].map(chip => (
                <span key={chip} className="ab-chip">{chip}</span>
              ))}
            </div>
          </div>
          <div className="ab-story-visual">
            <div className="ab-story-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=450&fit=crop"
                alt="Our kitchen"
              />
              <div className="ab-story-badge-float">
                <FiPackage size={18} />
                <span>200+ Partners</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="ab-values">
          <div className="ab-section-header">
            <span className="ab-section-tag"><FiStar size={12} /> OUR VALUES</span>
            <h2 className="ab-section-title">What We Stand For</h2>
            <p className="ab-section-sub">Our core values drive every decision we make</p>
          </div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <div key={i} className="ab-value-card">
                <div className="ab-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="ab-team">
          <div className="ab-section-header">
            <span className="ab-section-tag"><FiUsers size={12} /> THE TEAM</span>
            <h2 className="ab-section-title">The People Behind the Magic</h2>
          </div>
          <div className="ab-team-grid">
            {team.map((m, i) => (
              <div key={i} className="ab-team-card">
                <div className="ab-team-avatar">{m.initials}</div>
                <p className="ab-team-name">{m.name}</p>
                <p className="ab-team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-cta">
          <div className="ab-cta-inner">
            <FiClock size={28} className="ab-cta-icon" />
            <h2>Ready to Order?</h2>
            <p>Experience the AlphaFoods difference today. Hot food, delivered in under 30 minutes.</p>
            <Link to="/menu" className="ab-cta-btn">Browse the Menu</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
