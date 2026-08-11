import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'Password reset email sent successfully!');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a password reset link</p>

        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={styles.linkText}>
          <Link to="/login" style={styles.link}>← Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0f172a',
    padding: '20px',
  },
  card: {
    background: '#1e293b',
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    color: 'white',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: 'white',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  success: {
    color: '#10b981',
    textAlign: 'center',
    marginBottom: '15px',
    padding: '10px',
    background: '#064e3b',
    borderRadius: '8px',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '15px',
    padding: '10px',
    background: '#7f1d1d',
    borderRadius: '8px',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
  },
};

export default ForgotPassword;