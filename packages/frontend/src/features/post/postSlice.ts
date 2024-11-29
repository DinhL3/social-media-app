import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
        { content }, // Only send content; `userId` will be inferred from the backend token
        { withCredentials: true },
      );
      return { postId, comment: response.data }; // Return the new comment and postId
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

// Async thunk for fetching a post by ID
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${postId}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error fetching post by ID',
        );
      }
      return thunkAPI.rejectWithValue('Error fetching post by ID');
    }
  },
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (
    {
      postId,
      content,
      visibility,
      userId,
    }: {
      postId: string;
      content: string;
      visibility: 'friends' | 'public';
      userId: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        { content, visibility, userId },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error updating post',
        );
      }
      return thunkAPI.rejectWithValue('Error updating post');
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ postId, userId }: { postId: string; userId: string }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        data: { userId },
        withCredentials: true,
      });
      return postId; // Return postId to remove it from state
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error deleting post',
        );
      }
      return thunkAPI.rejectWithValue('Error deleting post');
    }
  },
);

export const updateComment = createAsyncThunk(
  'posts/updateComment',
  async (
    {
      postId,
      commentId,
      content,
    }: {
      postId: string;
      commentId: string;
      content: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        { content },
        { withCredentials: true },
      );
      return { postId, comment: response.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error updating comment',
        );
      }
      return thunkAPI.rejectWithValue('Error updating comment');
    }
  },
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async (
    { postId, commentId }: { postId: string; commentId: string },
    thunkAPI,
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        { withCredentials: true },
      );
      return { postId, commentId };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Error deleting comment',
        );
      }
      return thunkAPI.rejectWithValue('Error deleting comment');
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
          post.comments.push(comment); // Add the new comment to the post
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchPostById
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        // Here, you could handle the fetched post, for example, by replacing or appending it to the posts array.
        const fetchedPost = action.payload;
        const existingPostIndex = state.posts.findIndex(
          (p) => p._id === fetchedPost._id,
        );
        if (existingPostIndex >= 0) {
          state.posts[existingPostIndex] = fetchedPost;
        } else {
          state.posts.push(fetchedPost);
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle updatePost
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle deletePost
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle updateComment
    builder
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comment } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c._id === comment._id,
          );
          if (commentIndex !== -1) {
            post.comments[commentIndex] = comment;
          }
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle deleteComment
    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, commentId } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments = post.comments.filter((c) => c._id !== commentId);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
