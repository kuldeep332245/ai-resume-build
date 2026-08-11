import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Hero isLoggedIn={isLoggedIn} />
      <Features />
    </div>
  );
};

export default Home;