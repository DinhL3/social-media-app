import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  author: mongoose.Types.ObjectId; // Reference to User model
  content: string;
  date: Date;
  visibility: 'friends' | 'public';
  comments: mongoose.Types.ObjectId[]; // References to Comment model
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  visibility: { type: String, enum: ['friends', 'public'], default: 'public' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<IPost>('Post', PostSchema);
