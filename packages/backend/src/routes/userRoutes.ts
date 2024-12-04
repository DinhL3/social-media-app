import express, { Router } from 'express';
import { searchUsers } from '../controllers/userController';

const router: Router = express.Router();

router.get('/search', searchUsers as express.RequestHandler);

export default router;
