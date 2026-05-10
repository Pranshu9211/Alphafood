/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Set axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCartCount(0);
    delete axios.defaults.headers.common['Authorization'];
  }

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get('/api/auth/profile');
          setUser(res.data);
          // Load cart count
          try {
            const cartRes = await axios.get('/api/cart');
            const items = cartRes.data.items || [];
            setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
          } catch {
            setCartCount(0);
          }
        } catch {
          console.error('Token invalid, logging out');
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const data = res.data;
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    // Load cart
    try {
      const cartRes = await axios.get('/api/cart');
      const items = cartRes.data.items || [];
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      setCartCount(0);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const res = await axios.post('/api/auth/register', { name, email, password });
    const data = res.data;
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const refreshUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      cartCount,
      login,
      register,
      logout,
      updateCartCount,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
