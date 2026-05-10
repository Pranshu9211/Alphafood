/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * useTheme — consume theme state anywhere in the tree.
 * Returns { theme: 'dark' | 'light', toggleTheme: () => void }
 */
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Read persisted preference; fall back to 'dark'
    return localStorage.getItem('alphafoods-theme') || 'dark';
  });

  // Apply data-theme attribute + persist on every change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alphafoods-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
