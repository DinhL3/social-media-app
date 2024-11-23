import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token; // Get the token from cookies

  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token found' });
    return; // Ensure the function exits after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };
    req.body.userId = decoded.userId; // Attach userId to the request body
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid token' });
    return; // Ensure the function exits after sending a response
  }
};
