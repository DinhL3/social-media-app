import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { isTokenExpired } from './tokenUtils';

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
  username: string | null;
  userId: string | null; // Add userId to state
}

// Get the initial state from localStorage
const getInitialAuthState = (): AuthState => {
  const token = Cookies.get('token');
  const isAuthenticated = !!token && !isTokenExpired(token);
  return {
    isAuthenticated,
    loading: false,
    error: null,
    token: isAuthenticated ? token : null,
    username: null,
    userId: null, // Add userId to initial state
  };
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        credentials,
        {
          withCredentials: true, // Include the cookie in the response
        },
      );
      return response.data; // Expect message: 'Logged in successfully'
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Login failed',
        );
      }
      return thunkAPI.rejectWithValue('Login failed');
    }
  },
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        credentials,
        {
          withCredentials: true,
        },
      );
      // Automatically log in the user upon successful registration
      return response.data; // Return data to be handled in `extraReducers`
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.message || 'Registration failed',
        );
      }
      return thunkAPI.rejectWithValue('Registration failed');
    }
  },
);

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, thunkAPI) => {
    const token = Cookies.get('token');
    if (!token || isTokenExpired(token)) {
      thunkAPI.rejectWithValue('Token expired or invalid');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true,
      });
      return {
        username: response.data.username,
        userId: response.data._id, // Assuming backend sends _id
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user details');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(), // Use the initial state from localStorage
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated'); // Remove the state from localStorage
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Remove JWT token from cookies
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true'); // Save state to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true; // Log in the user automatically
        localStorage.setItem('isAuthenticated', 'true'); // Save state to localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Handle fetch user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.username = action.payload.username;
          state.userId = action.payload.userId; // Store userId in state
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
