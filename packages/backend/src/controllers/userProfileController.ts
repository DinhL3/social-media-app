const express = require('express');
import User from '../models/User';
import Post from '../models/Post';
const router = express.Router();

// Get profile details
router.get('/:username', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username })
          .populate('friends', 'username') // Populate friends' usernames
          .populate('friendRequests', 'username') // Populate friendRequests' usernames
          .exec();

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const posts = await Post.find({ author: user._id })
          .populate('author', 'username') // Populate the author's username
          .sort({ createdAt: -1 });

      res.json({
          _id: user._id,
          username: user.username,
          friends: user.friends,
          friendRequests: user.friendRequests, // Include friendRequests in the response
          posts,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});



export default router;
