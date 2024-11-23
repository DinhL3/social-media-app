import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { centerContainerStyles } from '../styles';
import PostCard from '../components/PostCard/PostCard';
import { fetchPostById, addComment } from '../features/post/postSlice'; // Import addComment
import { AppDispatch, RootState } from '../app/store';
import CommentCard from '../components/CommentCard/CommentCard';

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  // Select posts, loading, and error state from Redux
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );
  const post = posts.find((p) => p._id === postId);

  // Handle content change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    const lineBreaks = newValue.split('\n').length;

    // Enforce character and line break limits
    if (lineBreaks <= 10 && newValue.length <= 300) {
      setContent(newValue);
    } else {
      const trimmedValue = newValue
        .split('\n')
        .slice(0, 10) // Limit to 10 lines
        .join('\n')
        .slice(0, 300); // Limit to 300 characters
      setContent(trimmedValue);
    }
  };

  // Handle sending a comment
  const handleSendCommentClick = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim().length > 0) {
      await dispatch(addComment({ postId: postId!, content })); // Pass postId and content
      setContent(''); // Clear input
    }
  };

  // Fetch the post if not already available
  useEffect(() => {
    if (postId && !post) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId, post]);

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="subtitle1" color="text.disabled" gutterBottom>
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

      {/* Display message if post is not found */}
      {!loading && !error && !post && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Post not found.
        </Typography>
      )}

      {/* Display post details */}
      {!loading && !error && post && (
        <>
          <PostCard
            postId={post._id}
            author={post.author.username}
            content={post.content}
            date={post.date}
            commentCount={post.comments.length}
            isInRootFeed={false}
          />

          {/* Add a comment */}
          <Stack
            direction="row"
            justifyContent="center"
            gap={1}
            sx={{ mt: 2 }}
            width="100%"
          >
            <TextField
              id="comment-input"
              multiline
              variant="outlined"
              fullWidth
              maxRows={4}
              placeholder="Write your comment"
              value={content}
              onChange={handleChange}
              helperText={
                commentError || `${300 - content.length} characters remaining`
              }
              error={!!commentError}
            />
            <IconButton
              onClick={handleSendCommentClick}
              sx={{ alignSelf: 'flex-start', color: 'tealDark.main' }}
              size="large"
            >
              <SendIcon fontSize="large" />
            </IconButton>
          </Stack>

          {/* Display comments */}
          <Stack direction="column" sx={{ mt: 2, width: '100%' }} gap={1}>
            {post?.comments
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  commentId={comment._id}
                  author={comment.author.username}
                  content={comment.content}
                  date={comment.date}
                />
              ))}
          </Stack>
        </>
      )}
    </Container>
  );
}
