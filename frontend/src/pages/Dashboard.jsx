import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    draft: 0,
  });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await API.get('/resume/all');
      setResumes(response.data);
      setStats({
        total: response.data.length,
        completed: response.data.filter(r => r.status === 'completed').length,
        draft: response.data.filter(r => r.status === 'draft').length,
      });
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await API.delete(`/resume/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
        alert('✅ Resume deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting resume');
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p style={styles.subtitle}>Manage your resumes and create new ones</p>
        </div>
        <Link to="/builder" style={styles.createBtn}>+ Create New Resume</Link>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{stats.total}</h3>
          <p style={styles.statLabel}>Total Resumes</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{stats.completed}</h3>
          <p style={styles.statLabel}>Completed</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{stats.draft}</h3>
          <p style={styles.statLabel}>Drafts</p>
        </div>
      </div>

      {/* Resume List */}
      <div style={styles.resumeGrid}>
        {resumes.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>📄 No resumes yet. Start building your first one!</p>
            <Link to="/builder" style={styles.emptyBtn}>Build Resume</Link>
          </div>
        ) : (
          resumes.map((resume) => (
            <div key={resume._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>
                  {resume.personalInfo?.fullName || 'Untitled Resume'}
                </h3>
                <span style={{
                  ...styles.statusBadge,
                  background: resume.status === 'completed' ? '#10b981' : '#f59e0b',
                }}>
                  {resume.status || 'draft'}
                </span>
              </div>
              <p style={styles.cardInfo}>
                {resume.personalInfo?.email || 'No email'} • {resume.personalInfo?.phone || 'No phone'}
              </p>
              <p style={styles.cardDate}>
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </p>
              <div style={styles.cardActions}>
                <Link to={`/builder?id=${resume._id}`} style={styles.editBtn}>✏️ Edit</Link>
                <Link to={`/preview/${resume._id}`} style={styles.viewBtn}>👁️ View</Link>
                <button onClick={() => handleDelete(resume._id)} style={styles.deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    padding: '40px 20px',
    background: '#0f172a',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    color: 'white',
    fontSize: '32px',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '16px',
  },
  createBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    background: '#1e293b',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '14px',
    marginTop: '5px',
  },
  resumeGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#1e293b',
    padding: '20px',
    borderRadius: '12px',
    transition: 'transform 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  cardTitle: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
  },
  cardInfo: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '5px',
  },
  cardDate: {
    color: '#64748b',
    fontSize: '12px',
    marginBottom: '15px',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  editBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
  },
  viewBtn: {
    background: '#8b5cf6',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
  },
  deleteBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '80px 20px',
    background: '#1e293b',
    borderRadius: '12px',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: '18px',
    marginBottom: '20px',
  },
  emptyBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #1e293b',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: '20px',
    fontSize: '18px',
  },
};

// Add keyframe animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`);

export default Dashboard;