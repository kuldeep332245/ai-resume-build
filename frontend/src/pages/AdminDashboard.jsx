import { useEffect, useState } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalResumes: 0, activeUsers: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/dashboard');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👨‍💼 Admin Dashboard</h1>
      <div style={styles.stats}>
        <div style={styles.statCard}><h3>Total Users</h3><p>{stats.totalUsers}</p></div>
        <div style={styles.statCard}><h3>Total Resumes</h3><p>{stats.totalResumes}</p></div>
        <div style={styles.statCard}><h3>Active Users</h3><p>{stats.activeUsers}</p></div>
      </div>
      <div style={styles.userList}>
        <h2>All Users</h2>
        {users.map(user => (
          <div key={user._id} style={styles.userCard}>
            <p>{user.name} - {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', background: '#0f172a', minHeight: '80vh', color: 'white' },
  title: { textAlign: 'center', fontSize: '32px' },
  stats: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' },
  statCard: { background: '#1e293b', padding: '20px', borderRadius: '12px', textAlign: 'center', width: '200px' },
  userList: { maxWidth: '800px', margin: '0 auto' },
  userCard: { background: '#1e293b', padding: '10px 20px', borderRadius: '8px', marginBottom: '10px' },
};

export default AdminDashboard;