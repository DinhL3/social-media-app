import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import CreatePost from '../components/postComponents/CreatePost';
import PostCard from '../components/postComponents/PostCard';

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
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mt: 3 }} gutterBottom>
          Welcome to our social media app
        </Typography>
        <Typography variant="body1" gutterBottom>
          Let's meet new friends and chat!
        </Typography>

        {/* Create Post Input Field */}
        <CreatePost />

        {/* Display Posts */}
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
              commentsCount={post.comments.length}
            />
          ))}
      </Container>
    </>
  );
};

export default Root;
