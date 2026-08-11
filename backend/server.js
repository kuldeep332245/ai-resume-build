require('dotenv').config({ path: './.env' });
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working! 🚀' });
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});