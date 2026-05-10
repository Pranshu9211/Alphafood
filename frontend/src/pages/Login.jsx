import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    const trimmed = password.trim();
    if (!trimmed) return 'Password is required';
    if (/^\s*$/.test(trimmed)) return 'Password cannot be empty or only spaces';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password.trim());
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your AlphaFoods account</p>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
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
                <input type="password" className="form-input" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
              {loading ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
            </button>
          </form>
          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
