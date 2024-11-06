import { Request, Response } from 'express';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const { author, content, visibility } = req.body;

  try {
    const newPost = new Post({
      author,
      content,
      date: new Date(),
      visibility,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating post' });
  }
};
