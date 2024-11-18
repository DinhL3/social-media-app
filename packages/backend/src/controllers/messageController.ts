const express = require('express');
const Message = require('../models/Message'); // Import your message model

const router = express.Router();

// Save the message to the database
router.post('/', async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      recipientId,
      message,
    });

    await newMessage.save();

    res.status(200).send({ success: true, message: 'Message saved' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send({ success: false, message: 'Error saving message' });
  }
});

// Get messages for a particular chat (senderId and recipientId)
router.get('/:userId/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: friendId },
        { senderId: friendId, recipientId: userId },
      ],
    }).sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send({ success: false, message: 'Error fetching messages' });
  }
});

// Mark messages as read
router.post('/read/:userId/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    await Message.updateMany(
      {
        senderId: friendId,
        recipientId: userId,
        read: false,  // Only mark unread messages
      },
      {
        read: true,  // Mark them as read
      }
    );

    res.status(200).send({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).send({ success: false, message: 'Error marking messages as read' });
  }
});

export default router;
