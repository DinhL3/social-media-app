import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { centerContainerStyles } from '../styles';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { createPost } from '../features/post/postSlice'; // Import createPost thunk
import { Navigate } from 'react-router-dom';

export default function CreateNewPost() {
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Get loading state from Redux store
  const { loading } = useSelector((state: RootState) => state.posts);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 300) {
      setContent(newValue);
    }
  };

  const handlePostClick = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim().length > 0 && content.trim().length <= 300) {
      await dispatch(createPost({ content, visibility: 'public' }));
      setRedirect(true);
    }
  };

  // Redirect to root after successful post creation
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Create a new post
      </Typography>
      <TextField
        id="standard-multiline-flexible"
        multiline
        maxRows={4}
        variant="standard"
        fullWidth
        placeholder="What's up?"
        value={content}
        onChange={handleChange}
        helperText={`${300 - content.length} characters remaining`}
      />
      <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          color="tealDark"
          onClick={handlePostClick}
          disabled={
            loading || content.trim().length === 0 || content.length > 300
          }
        >
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </Stack>
    </Container>
  );
}
