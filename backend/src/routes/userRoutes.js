// src/routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getMe } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/users/login', loginUser); // Optional alias

// Protected route
router.get('/profile', protect, getUserProfile); // GET user profile (requires Bearer token)
router.get('/me', protect, getMe);
export default router;
