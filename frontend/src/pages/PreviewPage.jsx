import TemplatePreview from '../components/TemplatePreview';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import API from '../services/api';

const PreviewPage = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await API.get(`/resume/${id}`);
        setResume(response.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

 return <TemplatePreview resumeData={resume} templateId={resume?.template || 'modern'} />;
};

const styles = {
  loading: {
    color: 'white',
    textAlign: 'center',
    padding: '60px',
    fontSize: '20px',
    background: '#0f172a',
    minHeight: '80vh',
  },
};

export default PreviewPage;