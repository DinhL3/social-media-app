import { Request, Response } from 'express';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
  const { content, visibility, userId } = req.body;
  console.log('Received userId in controller:', userId);

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' }); // If userId is not present, return Unauthorized
  }

  try {
    const newPost = new Post({
      author: userId,  // Use userId from req.body instead of req.user
      content,
      date: new Date(),
      visibility,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username') // Populates the author's username field
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }, // Populate comments with author usernames
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};
