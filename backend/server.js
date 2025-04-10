require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./routes/user');
const statusRouter = require('./routes/status');
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-frontend.up.railway.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(mongoSanitize({ replaceWith: '_' }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, '0.0.0.0', () => { // Crucial for Railway
      console.log(`✅ Database connected`);
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if DB fails
  });

// Routes
app.use("/api/user", userRouter);
app.use("/api/status", statusRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});