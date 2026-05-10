import { useState } from 'react';
import {
  FiMapPin, FiMail, FiPhone, FiSend,
  FiCheckCircle, FiClock, FiMessageSquare
} from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const contactItems = [
    {
      icon: <FiMapPin />,
      label: 'Our Location',
      value: '123 Food Street, Indore, MP 452001',
      sub: 'Open for dine-in & delivery',
    },
    {
      icon: <FiMail />,
      label: 'Email Us',
      value: 'support@foodsbylucky.com',
      sub: 'We reply within 24 hours',
    },
    {
      icon: <FiPhone />,
      label: 'Call Us',
      value: '+91 98115 40000',
      sub: 'Mon – Sat, 10 AM – 10 PM',
    },
    {
      icon: <FiClock />,
      label: 'Working Hours',
      value: '10:00 AM – 10:00 PM',
      sub: 'All days including weekends',
    },
  ];

  return (
    <div className="ct-page">

      {/* ── HERO ── */}
      <div className="ct-hero">
        <div className="ct-hero-inner">
          <span className="ct-hero-tag">
            <FiMessageSquare size={13} /> GET IN TOUCH
          </span>
          <h1 className="ct-hero-title">
            We'd Love to <span className="ct-orange">Hear</span> From You
          </h1>
          <p className="ct-hero-sub">
            Questions, feedback, or just craving a chat? Drop us a message and we'll get back to you real quick.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="ct-body">

        {/* Info cards row */}
        <div className="ct-info-grid">
          {contactItems.map((item, i) => (
            <div className="ct-info-card" key={i}>
              <div className="ct-info-icon">{item.icon}</div>
              <div>
                <p className="ct-info-label">{item.label}</p>
                <p className="ct-info-val">{item.value}</p>
                <p className="ct-info-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid: form + map placeholder */}
        <div className="ct-main-grid">

          {/* Form card */}
          <div className="ct-form-card">
            <div className="ct-form-head">
              <FiSend className="ct-form-icon" />
              <h2>Send a Message</h2>
            </div>

            {sent && (
              <div className="ct-success">
                <FiCheckCircle size={18} />
                Message sent! We'll reply within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-row2">
                <div className="ct-field">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Lucky Sharma"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="ct-field">
                  <label>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    placeholder="lucky@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="ct-field">
                <label>SUBJECT</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              <div className="ct-field">
                <label>MESSAGE</label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="ct-submit-btn" disabled={sending}>
                {sending ? (
                  <><span className="ct-spinner" /> Sending…</>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Map / visual panel */}
          <div className="ct-visual-panel">
            <div className="ct-map-placeholder">
              <div className="ct-map-pin-wrap">
                <div className="ct-map-pin">
                  <FiMapPin size={32} />
                </div>
                <div className="ct-map-pulse" />
              </div>
              <p className="ct-map-label">Indore, Madhya Pradesh</p>
              <p className="ct-map-sub">India 452001</p>
            </div>

            <div className="ct-social-block">
              <p className="ct-social-title">Follow Our Journey</p>
              <div className="ct-social-links">
                {['Instagram', 'Facebook', 'Twitter', 'YouTube'].map((s) => (
                  <a key={s} href="#" className="ct-social-pill">{s}</a>
                ))}
              </div>
            </div>

            <div className="ct-hours-block">
              <p className="ct-hours-title">
                <FiClock size={14} /> Kitchen Hours
              </p>
              {[
                { day: 'Mon – Fri', time: '10 AM – 10 PM' },
                { day: 'Saturday', time: '10 AM – 11 PM' },
                { day: 'Sunday',   time: '11 AM – 9 PM'  },
              ].map(({ day, time }) => (
                <div key={day} className="ct-hours-row">
                  <span>{day}</span><span className="ct-orange">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
