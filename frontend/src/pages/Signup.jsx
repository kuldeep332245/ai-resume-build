import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Signup</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn}>Signup</button>
        </form>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  },
  title: {
    color: 'white',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: 'white',
    fontSize: '16px',
  },
  btn: {
    padding: '12px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '15px',
  },
  linkText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '15px',
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
  },
};

export default Signup;