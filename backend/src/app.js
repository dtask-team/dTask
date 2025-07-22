// src/app.js

import express from 'express';
import cors from 'cors';

// Route imports
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/tasks.js';


const app = express();

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse incoming JSON bodies

// Route bindings
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


// Health check route
app.get('/', (req, res) => {
  res.send('dTask API is running...');
});

export default app;
