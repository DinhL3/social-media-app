const express = require('express');
import User from '../models/User';
import Post from '../models/Post';
const router = express.Router();

// Get profile details
router.get('/:username', async (req, res) => {
  try {
      // Fetch the user by username
      const user = await User.findOne({ username: req.params.username })
          .populate('friends', 'username')
          .exec();

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Fetch the user's posts and populate author with username
      const posts = await Post.find({ author: user._id })
          .populate('author', 'username')
          .sort({ createdAt: -1 });

      // Include user._id in the response
      res.json({
          _id: user._id,
          username: user.username,
          friends: user.friends,
          posts,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});



export default router;
