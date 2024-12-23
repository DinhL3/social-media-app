import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { AppDispatch, RootState } from '../app/store';
import { createPost } from '../features/post/postSlice';
import { centerContainerStyles } from '../styles';

export default function CreateNewPost() {
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Get loading state from Redux store
  const { loading } = useSelector((state: RootState) => state.posts);
  const { userId } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    const lineBreaks = newValue.split('\n').length;

    // Allow input and pasting, but enforce the character and line break limits
    if (lineBreaks <= 10 && newValue.length <= 300) {
      setContent(newValue);
    } else {
      // If pasted content exceeds the conditions, trim it to fit within the limits
      const trimmedValue = newValue
        .split('\n')
        .slice(0, 10) // Limit to 10 lines
        .join('\n')
        .slice(0, 300); // Limit to 300 characters
      setContent(trimmedValue);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostClick = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim().length > 0 && content.trim().length <= 300) {
      await dispatch(
        createPost({
          content,
          visibility: 'public',
          userId: userId!,
          image: image || undefined,
        }),
      );
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
        id="post-content-input"
        multiline
        minRows={5}
        variant="outlined"
        fullWidth
        placeholder="What's up?"
        value={content}
        onChange={handleChange}
        helperText={`${300 - content.length} characters remaining`}
      />
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Image preview"
          sx={{ width: 100, height: 100, mt: 2, objectFit: 'cover' }}
        />
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        sx={{ mt: 1 }}
      >
        {/* Label wraps the input to make it look like a button */}
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }} // Hide the default file input
            onChange={handleImageChange}
          />
          <IconButton
            component="span" // Make the label look like a button
            sx={{ color: 'tealDark.main' }}
          >
            <AddPhotoAlternateOutlinedIcon />
          </IconButton>
        </label>
        <Button
          variant="contained"
          startIcon={!loading && <SendIcon />}
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
