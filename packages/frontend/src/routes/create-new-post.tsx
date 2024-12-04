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
  Alert,
  AlertTitle,
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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.posts);
  const { userId } = useSelector((state: RootState) => state.auth);

  const handleClose = () => {
    setAlertOpen(false);
    setAlertContent(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    const lineBreaks = newValue.split('\n').length;

    if (lineBreaks <= 10 && newValue.length <= 300) {
      setContent(newValue);
    } else {
      const trimmedValue = newValue
        .split('\n')
        .slice(0, 10)
        .join('\n')
        .slice(0, 300);
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

  const checkToxicity = async (text: string) => {
    try {
      const response = await fetch('http://localhost:5050/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      return data.is_hate_speech;
    } catch (error) {
      console.error('Error checking toxicity:', error);
      return false;
    }
  };

  const handlePostClick = async (e: FormEvent) => {
    e.preventDefault();

    if (content.trim().length > 0 && content.trim().length <= 300) {
      const isToxic = await checkToxicity(content);
      if (isToxic) {
        setAlertContent('Your post contains toxic content and cannot be posted.');
        setAlertOpen(true);
        return;
      }

      try {
        await dispatch(
          createPost({
            content,
            visibility: 'public',
            userId: userId!,
            image: image || undefined,
          }),
        );
        setRedirect(true);
      } catch (error: any) {
        if (error.response?.data?.error) {
          const { error: errorMessage, details } = error.response.data;
          if (details?.is_hate_speech) {
            setAlertContent(
              `${errorMessage}\n` +
              `Analyzed Text: "${details.analyzed_text}"\n` +
              `Confidence: ${(details.probability * 100).toFixed(2)}%`
            );
          } else {
            setAlertContent(errorMessage);
          }
        } else {
          setAlertContent('An unexpected error occurred. Please try again.');
        }
        setAlertOpen(true);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      {alertOpen && (
        <Alert severity="error" onClose={handleClose} sx={{ mb: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {alertContent}
        </Alert>
      )}
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
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <IconButton component="span" sx={{ color: 'tealDark.main' }}>
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