import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // Get the token from cookies

  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token found' }); // Send response immediately if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }; // Decode token and expect userId
    console.log('Decoded token:', decoded);

    req.body.userId = decoded.userId;  // Attach userId to req.body
    console.log('userId added to req.body:', req.body.userId);

    next(); // Call next() to proceed to the next middleware or controller
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid token' }); // Send response immediately on invalid token
  }
};
