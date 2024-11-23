import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';

export const addComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.body.userId;

  try {
    const newComment = new Comment({
      post: postId,
      author: userId,
      content,
      date: new Date(),
    });

    await newComment.save();

    // Populate the author field in the response
    const populatedComment = await newComment.populate('author', 'username');

    // Add comment reference to the post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json(populatedComment); // Send the populated comment
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};
