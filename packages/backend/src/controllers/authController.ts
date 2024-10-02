import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};
