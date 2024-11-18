import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import http from 'http';

export const setupWebSocket = (httpServer: http.Server): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'http://localhost:5173', // Allow frontend to connect
      credentials: true,
    },
  });

  const users = new Map<string, string>(); // Mapping userId to socketId
  const socketToUserMap = new Map<string, string>(); // Mapping socketId to userId

  io.on('connection', (socket) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log('No token provided, disconnecting socket:', socket.id);
      socket.disconnect();
      return;
    }

    // Verify the token and fetch the userId
    jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded: any) => {
      if (err) {
        console.log('Invalid token, disconnecting socket:', socket.id);
        socket.disconnect();
        return;
      }

      try {
        const userId = decoded.userId; // Extract user ID from token

        // Validate user in the database
        const user = await User.findById(userId);
        if (!user) {
          console.log('User not found, disconnecting socket:', socket.id);
          socket.disconnect();
          return;
        }

        // Register user and map socket ID to user ID
        socketToUserMap.set(socket.id, userId);
        users.set(userId, socket.id); // This allows us to find the socket by userId
        console.log(
          `User ${user.username} connected with socket ID ${socket.id}`,
        );
      } catch (error) {
        console.error('Error during user validation:', error);
        socket.disconnect();
      }
    });

    // Register user for messaging
    socket.on('register', (userId: string) => {
      users.set(userId, socket.id);
      console.log(`${userId} is registered with socket ID: ${socket.id}`);
    });

    // Handle private messages
    socket.on('private_message', ({ senderId, recipientId, message }) => {
      const recipientSocketId = users.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('private_message', { senderId, message });
      } else {
        console.log(`User ${recipientId} is not connected`);
      }
    });

    // Disconnect user
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId); // Remove user from the user map
          socketToUserMap.delete(socket.id); // Clean up the socket-to-user mapping
          break;
        }
      }
    });
  });
  return io;
};
