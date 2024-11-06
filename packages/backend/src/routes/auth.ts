import express from 'express';
import { register, login } from '../controllers/authController';
import { createPost } from '../controllers/postController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/posts', createPost)

export default router;
