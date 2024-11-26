import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'This username already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set the token as a cookie and send a response with user data
    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
    });
    res.status(201).json({
      message: 'User registered and logged in',
      user: {
        username: newUser.username,
        _id: newUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ error: 'Invalid username or password' });
      return;
      // Return early if user is not found
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid username or password' });
      return;
    }

    // Ensure JWT_SECRET is defined
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
    });
    res.json({
      message: 'Logged in successfully',
      user: {
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.body.userId; // Extracted from authenticateToken middleware

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' }); // Send response if userId is missing
    return; // Ensure the function does not continue execution
  }

  try {
    const user = await User.findById(userId, 'username _id'); // Add _id to projection
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return; // Stop further execution
    }

    res.status(200).json({
      username: user.username,
      _id: user._id, // Include the _id in response
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};
