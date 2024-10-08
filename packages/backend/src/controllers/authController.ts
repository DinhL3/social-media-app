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
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered' });
    }
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

    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
