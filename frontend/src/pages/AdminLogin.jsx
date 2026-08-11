import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Submitting:', { email, password }); // Debug

    try {
      const response = await API.post('/admin/login', { email, password });
      console.log('Response:', response.data); // Debug
      
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.log('Error:', err.response?.data || err.message); // Debug
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👨‍💼 Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Admin Email" 
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
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
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
    background: '#0f172a' 
  },
  card: { 
    background: '#1e293b', 
    padding: '40px', 
    borderRadius: '12px', 
    width: '100%', 
    maxWidth: '400px' 
  },
  title: { 
    color: 'white', 
    fontSize: '28px', 
    textAlign: 'center', 
    marginBottom: '20px' 
  },
  input: { 
    width: '100%', 
    padding: '12px', 
    marginBottom: '10px', 
    borderRadius: '8px', 
    border: '1px solid #334155', 
    background: '#0f172a', 
    color: 'white',
    fontSize: '16px',
    boxSizing: 'border-box'
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
    fontWeight: 'bold'
  },
  error: { 
    color: '#ef4444', 
    textAlign: 'center', 
    marginBottom: '15px' 
  },
};

export default AdminLogin;