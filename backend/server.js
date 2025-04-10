require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');  // Import cors

const userRouter = require('./routes/user');
const statusRouter = require('./routes/status');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'https://scai-ai-league-production.up.railway.app',  //  frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Security Middleware
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize({ replaceWith: '_' }));

// Mongoose Config
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("db connected and Server running on port", process.env.PORT || 4000);
    });
  })
  .catch(err => {
    console.error("ERROR in db connection", err);
  });

// Routes
app.use("/api/user", userRouter);
app.use("/api/status", statusRouter);

// Optional: catch-all error logger
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
