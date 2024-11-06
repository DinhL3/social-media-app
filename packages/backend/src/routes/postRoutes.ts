import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController';
import { addComment } from '../controllers/commentController';

const router = express.Router();

router.post('/posts', createPost);           // Create a new post
router.get('/posts', getAllPosts);           // Get all posts
router.post('/posts/:postId/comments', addComment);  // Add comment to a post

export default router;
