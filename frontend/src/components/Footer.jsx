const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2026 AI Resume Builder. Built with ❤️ for BCA students.</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#0f172a',
    padding: '30px 20px',
    textAlign: 'center',
    borderTop: '1px solid #1e293b',
  },
  text: {
    color: '#64748b',
    fontSize: '14px',
  },
};

export default Footer;