import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
  TextField,
  IconButton,
  useMediaQuery,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { io, Socket } from 'socket.io-client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Friend {
  _id: string;
  username: string;
}

interface DecodedToken {
  userId: string;
}

const Chat: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<
    { senderId: string; message: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      const fetchFriends = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/friends/${userId}`,
          );
          setFriends(response.data.friends);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching friends:', error);
          setLoading(false);
        }
      };

      fetchFriends();

      const socketConnection = io('http://localhost:5000', {
        auth: { token },
      });

      setSocket(socketConnection);

      socketConnection.on('private_message', ({ senderId, message }) => {
        setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
      });

      return () => {
        socketConnection.disconnect();
      };
    } else {
      console.error('JWT token not found in cookies');
      setLoading(false);
    }
  }, []);

  const markMessagesAsRead = useCallback(async () => {
    if (activeChat) {
      const token = Cookies.get('token');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.userId;

        try {
          await axios.post(
            `http://localhost:5000/api/messages/read/${userId}/${activeChat._id}`,
          );
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      }
    }
  }, [activeChat]);

  const fetchChatHistory = async (friendId: string) => {
    const token = Cookies.get('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${userId}/${friendId}`,
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && activeChat) {
      const token = Cookies.get('token');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const senderId = decoded.userId;

        socket?.emit('private_message', {
          senderId,
          recipientId: activeChat._id,
          message: newMessage,
        });

        try {
          await axios.post('http://localhost:5000/api/messages', {
            senderId,
            recipientId: activeChat._id,
            message: newMessage,
          });
        } catch (error) {
          console.error('Error saving message:', error);
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { senderId, message: newMessage },
        ]);
        setNewMessage('');
      }
    }
  };

  const handleBackToFriends = () => {
    setActiveChat(null);
    setMessages([]);
  };

  useEffect(() => {
    if (activeChat) {
      fetchChatHistory(activeChat._id);
      markMessagesAsRead();
    }
  }, [activeChat, markMessagesAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100% - 70px)',
        width: '100%',
        position: 'absolute',
        top: 70,
        left: 0,
      }}
    >
      {/* Friend List */}
      {(!isMobile || !activeChat) && (
        <Box
          sx={{
            minWidth: isMobile ? '100%' : '25%',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #ddd',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>
            Choose a friend to chat
          </Typography>
          <List>
            {friends.length === 0 ? (
              <ListItem>No friends yet.</ListItem>
            ) : (
              friends.map((friend) => (
                <>
                  <ListItem
                    key={friend._id}
                    disablePadding
                    alignItems="flex-start"
                  >
                    <ListItemButton onClick={() => setActiveChat(friend)}>
                      <ListItemAvatar>
                        <AccountCircleIcon
                          sx={{ fontSize: 48, color: 'peach.main' }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={friend.username} />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))
            )}
          </List>
        </Box>
      )}
      {/* Chat Section */}
      {(isMobile && activeChat) || !isMobile ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minWidth: '75%',
          }}
        >
          {!activeChat ? (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', marginTop: '20%' }}
            >
              Select a friend to start chatting.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  padding: 2,
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  onClick={handleBackToFriends}
                  sx={{ marginRight: 1 }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">{activeChat.username}</Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: 2,
                  backgroundColor: '#f1f1f1',
                }}
              >
                {messages.map((msg, index) => {
                  const isUserMessage = msg.senderId === activeChat._id;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: isUserMessage
                          ? 'flex-start'
                          : 'flex-end',
                        marginBottom: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: isUserMessage
                            ? '#dedede'
                            : '#006d77',
                          color: isUserMessage ? '#000000' : '#ffffff',
                          padding: 1,
                          borderRadius: 2,
                          maxWidth: '50%',
                          wordWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                        }}
                      >
                        {msg.message}
                      </Box>
                    </Box>
                  );
                })}
                <div ref={messagesEndRef} />
              </Box>

              <Box
                sx={{
                  padding: 2,
                  borderTop: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  value={newMessage}
                  onChange={handleMessageChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  sx={{ marginRight: 1 }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  sx={{ color: '#006d77' }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export default Chat;
