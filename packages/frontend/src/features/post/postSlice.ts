import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { delay } from '../../utils';

interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  content: string;
  date: string;
  visibility: 'friends' | 'public';
  comments: Array<{
    _id: string;
    author: {
      _id: string;
      username: string;
    };
    content: string;
    date: string;
  }>;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk for creating a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (
    postData: {
      content: string;
      visibility: 'friends' | 'public';
      userId: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts/newPost',
        postData,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error creating post',
        );
      }
      return thunkAPI.rejectWithValue('Error creating post');
    }
  },
);

// Async thunk for fetching all posts
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error fetching posts',
        );
      }
      return thunkAPI.rejectWithValue('Error fetching posts');
    }
  },
);

// Async thunk for adding a comment to a post
export const addComment = createAsyncThunk(
  'posts/addComment',
  async (
    { postId, content }: { postId: string; content: string },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { content },
        { withCredentials: true },
      );
      return { postId, comment: response.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error adding comment',
        );
      }
      return thunkAPI.rejectWithValue('Error adding comment');
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle createPost
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchAllPosts
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle addComment
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comment } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments.push(comment); // Add the comment to the specified post
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
