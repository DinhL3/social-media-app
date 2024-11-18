import express, { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const router = express.Router();

// Send a friend request
router.post('/sendRequest', async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    if (senderId === receiverId) {
      res.status(400).json({ message: "You can't send a friend request to yourself." });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      res.status(404).json({ message: 'User not found.' });
    }

    // Check if the receiver already has a friend request from the sender
    if (receiver.friendRequests.includes(senderId)) {
      res.status(400).json({ message: 'Friend request already sent.' });
    }

    // Add the sender to the receiver's friendRequests
    receiver.friendRequests.push(senderId);
    await receiver.save();

    res.status(200).json({ message: 'Friend request sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept a friend request
router.post('/acceptRequest', async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      res.status(404).json({ message: 'User not found.' });
    }

    // Check if the sender is in the receiver's friendRequests
    if (!receiver.friendRequests.includes(senderId)) {
      res.status(400).json({ message: 'No friend request from this user.' });
    }

    // Add sender to receiver's friends list
    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    // Remove the sender from receiver's friendRequests
    receiver.friendRequests = receiver.friendRequests.filter(
      (id: mongoose.Types.ObjectId) => id.toString() !== senderId.toString()
    );

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: 'Friend request accepted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Decline a friend request
router.post('/declineRequest', async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      res.status(404).json({ message: 'User not found.' });
    }

    // Check if the sender is in the receiver's friendRequests
    if (!receiver.friendRequests.includes(senderId)) {
      res.status(400).json({ message: 'No friend request from this user.' });
    }

    // Remove the sender from receiver's friendRequests
    receiver.friendRequests = receiver.friendRequests.filter(
      (id: mongoose.Types.ObjectId) => id.toString() !== senderId.toString()
    );

    await receiver.save();

    res.status(200).json({ message: 'Friend request declined.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's friend list
router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friends', 'username'); // Populate the friend's username

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
    }

    // Return the list of friends
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
