import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Listen for storage changes (if token changes in another tab)
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsLoggedIn(!!updatedToken);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>🚀 AI Resume Builder</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <Link to="/builder" style={styles.link}>Builder</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#1e293b',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  logo: {
    color: '#60a5fa',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'background 0.3s',
  },
  logoutBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Navbar;