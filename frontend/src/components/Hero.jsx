import { Link } from 'react-router-dom';

const Hero = ({ isLoggedIn }) => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <h1 style={styles.title}>🚀 Build Your AI-Powered Resume</h1>
        <p style={styles.subtitle}>
          Create professional resumes in minutes with AI suggestions. 
          Stand out from the crowd and get your dream job!
        </p>
        {isLoggedIn ? (
          <Link to="/dashboard" style={styles.btn}>📊 Go to Dashboard</Link>
        ) : (
          <Link to="/signup" style={styles.btn}>Get Started Free →</Link>
        )}
      </div>
    </section>
  );
};

const styles = {
  hero: {
    background: 'transparent',
    padding: '100px 20px',
    textAlign: 'center',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: 'white',
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '20px',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  btn: {
    background: '#3b82f6',
    color: 'white',
    padding: '15px 40px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'background 0.3s',
  },
};

export default Hero;