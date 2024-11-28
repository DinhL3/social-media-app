import React, { useState, useEffect } from 'react';
import {
  Modal,
  Paper,
  Typography,
  Divider,
  Stack,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store'; // Assuming you have a redux store for state management

interface FriendRequestsModalProps {
  open: boolean;
  onClose: () => void;
}

const FriendRequestsModal: React.FC<FriendRequestsModalProps> = ({
  open,
  onClose,
}) => {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId); // Assuming you have the userId in your redux store

  // Fetch the friend's requests when modal is opened
  useEffect(() => {
    if (open && userId) {
      axios
        .get(`http://localhost:5000/api/friends/requests/${userId}`, { withCredentials: true })
        .then((res) => setFriendRequests(res.data.friendRequests))
        .catch((err) => console.error('Error fetching friend requests:', err));
    }
  }, [open, userId]);

  const handleAcceptRequest = async (senderId: string) => {
    try {
      await axios.post(
        `http://localhost:5000/api/friends/acceptRequest`,
        { senderId, receiverId: userId }, // Pass receiverId (logged-in user) and senderId
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== senderId));
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  const handleRejectRequest = async (senderId: string) => {
    try {
      await axios.post(
        `http://localhost:5000/api/friends/declineRequest`,
        { senderId, receiverId: userId }, // Pass receiverId (logged-in user) and senderId
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== senderId));
    } catch (err) {
      console.error('Error rejecting friend request:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="friend-requests-modal">
      <Paper
        sx={{
          maxWidth: 400,
          margin: 'auto',
          marginTop: '10%',
          padding: 3,
          outline: 'none',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Friend Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {friendRequests.length > 0 ? (
            friendRequests.map((req) => (
              <Box
                key={req._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>@{req.username}</Typography>
                <Box>
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleAcceptRequest(req._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRejectRequest(req._id)}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No friend requests</Typography>
          )}
        </Stack>
      </Paper>
    </Modal>
  );
};

export default FriendRequestsModal;
