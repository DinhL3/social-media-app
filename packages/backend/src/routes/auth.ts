import express from 'express';
import { register, login, getUserDetails } from '../controllers/authController';
import { createPost } from '../controllers/postController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/posts', createPost);
router.get('/me', authenticateToken, getUserDetails); // Get user details

export default router;
