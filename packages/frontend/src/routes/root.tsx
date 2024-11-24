import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Link as MaterialLink,
} from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from '../components/PostCard/PostCard';
import { centerContainerStyles } from '../styles';
import { AppDispatch, RootState } from '../app/store'; // Import RootState and AppDispatch types
import { fetchAllPosts } from '../features/post/postSlice'; // Import the fetchAllPosts thunk

const Root: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select posts, loading, error, and authentication state from Redux
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Dispatch the fetchAllPosts thunk when the component mounts
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          color="#e29578"
        >
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="h4">(„• ֊ •„)੭</Typography>
        </Stack>

        {!isAuthenticated ? (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Please{' '}
            <MaterialLink component={RouterLink} to="/login">
              log in
            </MaterialLink>{' '}
            or{' '}
            <MaterialLink component={RouterLink} to="/register">
              register
            </MaterialLink>{' '}
            to create a new post.
          </Typography>
        ) : (
          <Stack
            spacing={2}
            direction="row"
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="body1">Share what's on your mind?</Typography>
            <Button
              id="create-new-post-button"
              variant="contained"
              startIcon={<CreateIcon />}
              color="tealDark"
              component={RouterLink}
              to={`/create-new-post`}
            >
              New Post
            </Button>
          </Stack>
        )}

        <Divider textAlign="center" sx={{ width: '100%', mt: 2 }}>
          <Typography variant="caption" component="span" color="text.disabled">
            Your feed
          </Typography>
        </Divider>

        {/* Display loading state */}
        {loading && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
            <CircularProgress sx={{ color: 'tealDark.main' }} />
          </Stack>
        )}

        {/* Display error state */}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {/* Display no posts message */}
        {!loading && !error && posts.length === 0 && (
          <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
            There are no posts to show. Why not create something? :)
          </Typography>
        )}

        {/* Display posts */}
        <Stack direction="column" gap={2} sx={{ mt: 3 }}>
          {posts
            .slice() // Create a shallow copy to avoid mutating the original state
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ) // Sort by date in descending order (newest first)
            .map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                author={post.author.username}
                content={post.content}
                date={post.date}
                commentCount={post.comments.length}
                isInRootFeed={true}
              />
            ))}
        </Stack>
      </Container>
    </>
  );
};

export default Root;
