import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController';
import {
  addComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import { authenticateToken } from '../middleware/authMiddleware';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/newPost', authenticateToken, upload.single('image'), createPost); // Create new post (auth)
router.get('/', getAllPosts); // Get all posts
router.post('/:postId/comments', authenticateToken, addComment); // Add comment (auth)
router.get('/:postId', getPostById); // Get single post
router.put('/:postId', authenticateToken, updatePost); // Update post (auth, author only)
router.delete('/:postId', authenticateToken, deletePost); // Delete post & comments (auth, author only)
router.put('/:postId/comments/:commentId', authenticateToken, updateComment); // Update comment (auth, author only)
router.delete('/:postId/comments/:commentId', authenticateToken, deleteComment); // Delete comment (auth, author only)

export default router;
