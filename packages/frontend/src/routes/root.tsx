import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import axios from 'axios';
import PostCard from '../components/PostCard/PostCard';
import { centerContainerStyles } from '../styles';

interface Post {
  _id: string;
  author: { username: string };
  content: string;
  date: string;
  comments: { _id: string }[];
}

const Root: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts'); // Replace with your backend endpoint URL
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="h4">(„• ֊ •„)੭</Typography>
        </Stack>
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
            color="primary"
            component={Link}
            to={`/create-new-post`}
          >
            New Post
          </Button>
        </Stack>

        <Divider textAlign="center" sx={{ width: '100%', mt: 2 }}>
          <Typography variant="caption" component="span" color="text.disabled">
            Your feed
          </Typography>
        </Divider>
        {/* Display Posts */}
        <Stack direction="column" gap={2} sx={{ mt: 3 }}>
          {posts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ) // Sort by date in descending order (newest first) this will be changed later
            .map((post) => (
              <PostCard
                key={post._id}
                author={post.author.username}
                content={post.content}
                date={post.date}
                commentCount={post.comments.length}
              />
            ))}
        </Stack>
      </Container>
    </>
  );
};

export default Root;
