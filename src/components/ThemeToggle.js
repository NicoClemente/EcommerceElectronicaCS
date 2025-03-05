import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/theme-styles.css'; 

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button
      variant={darkMode ? "light" : "dark"}
      size="sm"
      onClick={toggleTheme}
      className="d-flex align-items-center justify-content-center rounded-circle"
      style={{ 
        width: '40px',
        height: '40px',
        padding: 0,
        transition: 'all 0.3s ease'
      }}
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? (
        <i className="bi bi-sun-fill fs-5"></i>
      ) : (
        <i className="bi bi-moon-fill fs-5"></i>
      )}
    </Button>
  );
};

export default ThemeToggle;