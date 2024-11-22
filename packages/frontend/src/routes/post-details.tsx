import { useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { centerContainerStyles } from '../styles';
import PostCard from '../components/PostCard/PostCard';
import { fetchPostById } from '../features/post/postSlice'; // Import the fetchPostById thunk
import { AppDispatch, RootState } from '../app/store'; // Import types for dispatch and state

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Select posts, loading, and error state from Redux
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );
  const post = posts.find((p) => p._id === postId);

  // Fetch the post details on mount
  useEffect(() => {
    if (postId && !post) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId, post]);

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Post details
      </Typography>

      {/* Display loading spinner */}
      {loading && (
        <CircularProgress
          sx={{ display: 'block', margin: '20px auto', color: 'tealDark.main' }}
        />
      )}

      {/* Display error message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Display post details if available */}
      {!loading && !error && post && (
        <PostCard
          postId={post._id}
          author={post.author.username}
          content={post.content}
          date={post.date}
          commentCount={post.comments.length}
          isClickable={false}
        />
      )}

      {/* Display message if post is not found */}
      {!loading && !error && !post && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Post not found.
        </Typography>
      )}
    </Container>
  );
}
