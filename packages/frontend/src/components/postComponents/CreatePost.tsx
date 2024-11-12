import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      content,
      visibility: 'public'       // Set visibility as desired
    };

    try {
      await axios.post('http://localhost:5000/api/posts/newPost', postData, {
        withCredentials: true, // Automatically includes cookies with the request
      });
      setContent(''); // Clear input field after successful post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        label="What's on your mind?"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Post
      </Button>
    </Box>
  );
};

export default CreatePost;
