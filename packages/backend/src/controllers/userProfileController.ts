const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

// Get profile details
router.get('/:username', async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // Assume user is authenticated and `req.user` is populated.

    // Fetch the user by username
    const user = await User.findOne({ username: req.params.username })
      .populate('friends', 'username') // Populate friends' usernames
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the logged-in user is a friend or has sent/received a request
    const isFriend = user.friends.some(friend => friend._id.toString() === loggedInUserId);
    const hasSentRequest = user.friendRequests.includes(loggedInUserId);
    const hasReceivedRequest = await User.findOne({
      _id: loggedInUserId,
      friendRequests: user._id
    });

    // Fetch the user's posts
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({
      username: user.username,
      friends: user.friends,
      posts,
      relationshipStatus: isFriend
        ? 'friends'
        : hasSentRequest
        ? 'request_sent'
        : hasReceivedRequest
        ? 'request_received'
        : 'none'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router
