import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: darkMode ? '#1e293b' : '#e2e8f0',
        color: darkMode ? 'white' : '#0f172a',
        border: '1px solid #334155',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;