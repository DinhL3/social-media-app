import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;