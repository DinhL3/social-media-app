import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  post: mongoose.Types.ObjectId; // Reference to Post model
  author: mongoose.Types.ObjectId; // Reference to User model
  content: string;
  date: Date;
}

const CommentSchema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
