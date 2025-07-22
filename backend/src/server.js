// src/server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import app from './app.js'; // App already includes all routes

// Connect to MongoDB
connectDB();

// Serve uploaded files statically
app.use('/uploads', express.static('uploads')); // Only this line is okay here

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
