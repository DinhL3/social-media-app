import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import PostCard from '../components/PostCard/PostCard';

interface ProfileData {
  username: string;
  friends: { _id: string; username: string }[];
  posts: {
    _id: string;
    content: string;
    date: string;
    comments: string;
    author: { username: string }; // Ensuring the author structure exists
  }[];
}

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${username}`,
        );
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

    fetchProfile();
  }, [username]);

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

  // Filter posts where the author matches the username from the URL
  const userPosts = profile.posts
    .filter((post) => post.author.username === profile.username) // Compare post's author username with profile.username
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort posts by date (newest first)

  return (
    <Box padding={3}>
      <Stack spacing={3}>
        <Typography variant="h4">@{profile.username}</Typography>
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
                <PostCard
                  key={post._id}
                  postId={post._id}
                  author={post.author.username}
                  content={post.content}
                  date={post.date}
                  commentCount={post.comments.length}
                  isInRootFeed={false}
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
