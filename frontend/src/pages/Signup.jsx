import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateName = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return 'Name must be at least 2 characters long';
    return '';
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    const trimmed = password.trim();
    if (trimmed.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (nameError || emailError || passwordError) {
      setError(nameError || emailError || passwordError);
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password.trim());
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join AlphaFoods and start ordering</p>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon-wrap">
                <FiUser className="input-icon" />
                <input type="text" className="form-input" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="input-icon-wrap">
                <FiMail className="input-icon" />
                <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-icon-wrap">
                <FiLock className="input-icon" />
                <input type="password" className="form-input" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
              {loading ? 'Creating account...' : <>Create Account <FiArrowRight /></>}
            </button>
          </form>
          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
