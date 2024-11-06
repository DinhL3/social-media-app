import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';

export const addComment = async (req: Request, res: Response): Promise<Response> => {
  const { postId } = req.params;
  const { author, content } = req.body;

  try {
    const newComment = new Comment({
      post: postId,
      author,
      content,
      date: new Date(),
    });

    await newComment.save();

    // Add comment reference to the post
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: 'Error adding comment' });
  }
};
