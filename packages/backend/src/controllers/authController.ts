import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'This username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};
