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

export const updateComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    if (comment.author.toString() !== userId) {
      res.status(403).json({ error: 'Not authorized to edit this comment' });
      return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true },
    ).populate('author', 'username');

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    if (comment.author.toString() !== userId) {
      res.status(403).json({ error: 'Not authorized to delete this comment' });
      return;
    }

    // Remove comment reference from the post
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
