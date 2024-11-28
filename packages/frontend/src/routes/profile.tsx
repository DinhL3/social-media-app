import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Stack, Button } from '@mui/material';
import PostCardFeedView from '../components/PostCard/PostCardFeedView';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ProfileData {
  username: string;
  friends: { _id: string; username: string }[];
  friendRequests: { _id: string }[]; // Include friendRequests
  posts: {
    _id: string;
    content: string;
    date: string;
    comments: string;
    author: { username: string };
  }[];
  _id: string;
}

interface UserDetails {
  username: string;
  userId: string;
}

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserDetails | null>(null);
  const [friendStatus, setFriendStatus] = useState<'notFriend' | 'friends' | 'self' | 'friendRequestSent' | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${username}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        setProfile(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError('An error occurred while fetching the profile');
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return; // Not logged in
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
        setCurrentUser({
          username: response.data.username,
          userId: response.data._id,
        });
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };

    fetchProfile();
    fetchCurrentUser();
  }, [username]);

  useEffect(() => {
    if (profile && currentUser) {
      if (profile._id === currentUser.userId) {
        setFriendStatus('self');
      } else if (profile.friends.some((friend) => friend._id === currentUser.userId)) {
        setFriendStatus('friends');
      } else if (profile.friendRequests.some((request) => request._id === currentUser.userId)) {
        setFriendStatus('friendRequestSent');
      } else {
        setFriendStatus('notFriend');
      }
    }
  }, [profile, currentUser]);

  const handleSendFriendRequest = async () => {
    if (!currentUser || !profile) return;
    const requestData = {
      senderId: currentUser.userId,
      receiverId: profile._id,
    };

    console.log("Sending friend request with data:", requestData);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/friends/sendRequest',
        { senderId: currentUser.userId, receiverId: profile._id },
        { withCredentials: true }
      );
      setFriendStatus('friendRequestSent'); // Update button state dynamically
    } catch (error: any) {
      console.error('Error sending friend request:', error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!profile) {
    return <Typography variant="h6">Profile not found</Typography>;
  }

  const userPosts = profile.posts
    .filter((post) => post.author.username === profile.username)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Box padding={3}>
      <Stack spacing={3}>
        <Typography variant="h4">@{profile.username}</Typography>
        <Stack width='15em'>
          {friendStatus === 'friends' && (
            <Button variant='contained' color='tealDark' href='/chat'> Chat with {profile.username}</Button>
          )}

          {friendStatus === 'notFriend' && (
            <Button variant="contained" color="tealDark" onClick={handleSendFriendRequest}>
              Send Friend Request
            </Button>
          )}

          {friendStatus === 'friendRequestSent' && (
            <Typography color="tealDark">Friend Request Sent</Typography>
          )}

          {!currentUser && (
            <Button variant="contained" color="tealDark" href="/login">
              Log in to add friend
            </Button>
          )}
        </Stack>
        <Box>
          <Typography variant="h6">Friends</Typography>
          {profile.friends.length > 0 ? (
            <Stack spacing={1}>
              {profile.friends.map((friend) => (
                <Box key={friend._id}>
                  <Typography>@{friend.username}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography>No friends yet</Typography>
          )}
        </Box>
        <Box>
          <Typography variant="h6">{profile.username}'s posts:</Typography>
          {userPosts.length > 0 ? (
            <Stack spacing={2}>
              {userPosts.map((post) => (
                <PostCardFeedView
                  key={post._id}
                  postId={post._id}
                  author={post.author.username}
                  content={post.content}
                  date={post.date}
                  commentCount={post.comments.length}
                />
              ))}
            </Stack>
          ) : (
            <Typography>No posts yet</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
