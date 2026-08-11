const Features = () => {
  const features = [
    { icon: '🤖', title: 'AI Suggestions', desc: 'Get smart recommendations to improve your resume' },
    { icon: '📄', title: 'Multiple Templates', desc: 'Choose from professional templates' },
    { icon: '💾', title: 'Save & Export', desc: 'Save as PDF and share instantly' },
    { icon: '🔒', title: 'Secure Login', desc: 'Your data is safe with us' },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>✨ Why Choose AI Resume Builder?</h2>
        <div style={styles.grid}>
          {features.map((f, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{f.icon}</div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '80px 20px',
    background: '#0f172a',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    color: 'white',
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '50px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  card: {
    background: '#1e293b',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  cardTitle: {
    color: 'white',
    fontSize: '20px',
    marginBottom: '10px',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: '14px',
    lineHeight: '1.6',
  },
};

export default Features;