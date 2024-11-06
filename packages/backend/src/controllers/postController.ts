import { Request, Response, RequestHandler } from 'express';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
  const { author, content, visibility } = req.body;

  try {
    const newPost = new Post({
      author,
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
