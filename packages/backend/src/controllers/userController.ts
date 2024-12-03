import { Request, Response } from 'express';
import User from '../models/User';

export const searchUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string' || keyword.length < 3) {
    res
      .status(400)
      .json({ error: 'Keyword must be at least 3 characters long' });
    return;
  }

  try {
    const users = await User.find({
      username: { $regex: keyword, $options: 'i' }, // Case-insensitive search
    }).select('username');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for users' });
  }
};
