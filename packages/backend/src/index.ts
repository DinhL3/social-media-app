import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import postRoutes from './routes/postRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS
import morgan from 'morgan'; // Import Morgan
import friendController from './controllers/friendController';
import { setupWebSocket } from './websocket/Chat';
import http from 'http';
import messageController from './controllers/messageController';
import userProfileController from './controllers/userProfileController';

dotenv.config();
// .env file should be in /packages/backend/

const app = express();
const port = 5000;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Connect to MongoDB
mongoose
  .connect(databaseUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    credentials: true, // Enable cookies to be sent along with the request
  }),
);
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friends', friendController);
app.use('/api/messages', messageController);
app.use('/api/profile', userProfileController);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Express with TypeScript!');
});

// Create HTTP server and set up WebSocket
const httpServer = http.createServer(app);
setupWebSocket(httpServer); // Call the WebSocket setup

// Start the server
httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
