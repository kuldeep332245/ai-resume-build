import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import TemplatePreview from '../components/TemplatePreview';

const PublicResume = () => {
  const { shareLink } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await API.get(`/resume/public/${shareLink}`);
        setResume(response.data);
      } catch (err) {
        setError('Resume not found or not public');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [shareLink]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>🔒 {error}</h2>
        <p>The resume you're looking for doesn't exist or is not shared publicly.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <TemplatePreview resumeData={resume} templateId={resume.template || 'modern'} />
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    background: '#0f172a',
    minHeight: '100vh',
  },
  loading: {
    color: 'white',
    textAlign: 'center',
    padding: '60px',
    fontSize: '20px',
    background: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #1e293b',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    color: 'white',
    textAlign: 'center',
    padding: '60px',
    background: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default PublicResume;