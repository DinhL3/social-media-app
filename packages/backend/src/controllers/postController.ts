import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs/promises'; // Use promises version
import path from 'path';
import Post from '../models/Post';
import Comment from '../models/Comment';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createPost = async (req: Request, res: Response) => {
  const { content, visibility, userId } = req.body;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  let imageUrl = null;
  let originalFilePath = null;

  try {
    if (req.file) {
      originalFilePath = req.file.path;
      const uploadsDir = path.join(__dirname, '../../uploads');
      const outputPath = path.join(uploadsDir, `resized-${req.file.filename}`);
      imageUrl = `/uploads/resized-${req.file.filename}`;

      // Ensure the uploads directory exists
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Process image with sharp
      const sharpInstance = sharp(originalFilePath);
      await sharpInstance
        .resize({ width: 500, height: 500, fit: 'inside' })
        .toFile(outputPath);

      // Wait for Sharp to finish and release file handles
      await delay(100);

      // Delete original file
      try {
        await fs.unlink(originalFilePath);
      } catch (unlinkError) {
        console.error('Failed to delete original file:', unlinkError);
        // Continue execution even if delete fails
      }
    }

    const newPost = new Post({
      author: userId,
      content,
      date: new Date(),
      visibility,
      imageUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    // Clean up any files if post creation fails
    if (imageUrl) {
      const resizedPath = path.join(__dirname, '../..', imageUrl);
      try {
        await fs.unlink(resizedPath);
      } catch (cleanupError) {
        console.error('Failed to clean up resized file:', cleanupError);
      }
    }
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

export const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.params; // Get the post ID from the route parameters

  try {
    const post = await Post.findById(postId)
      .populate('author', 'username') // Populate the author's username field
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }, // Populate comments with author usernames
      });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the post' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, visibility, userId } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content, visibility },
      { new: true },
    )
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username',
        },
      });

    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (post.author.toString() !== userId) {
      res.status(403).json({ error: 'Not authorized to delete this post' });
      return;
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: postId });

    // Delete the post
    await Post.findByIdAndDelete(postId);
    res
      .status(200)
      .json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post and comments' });
  }
};
