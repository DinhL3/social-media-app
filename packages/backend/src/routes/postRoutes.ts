import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
} from '../controllers/postController';
import { addComment } from '../controllers/commentController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/newPost', authenticateToken, createPost); // Create a new post
router.get('/', getAllPosts); // Get all posts
router.post('/:postId/comments', authenticateToken, addComment); // Add comment to a post
router.get('/:postId', getPostById); // Get post by ID

export default router;
