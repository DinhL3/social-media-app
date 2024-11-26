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

// Add interface for user data
interface UserData {
  username: string;
  _id: string;
}

// Get the initial state from localStorage
const getInitialAuthState = (): AuthState => {
  const token = Cookies.get('token');
  const storedUserId = localStorage.getItem('userId');
  const isAuthenticated = !!token && !isTokenExpired(token);
  return {
    isAuthenticated,
    loading: false,
    error: null,
    token: isAuthenticated ? token : null,
    username: localStorage.getItem('username'),
    userId: isAuthenticated ? storedUserId : null,
  };
};

// Modify loginUser thunk to also return user details
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
      // Fetch user details immediately after successful login
      const userResponse = await axios.get(
        'http://localhost:5000/api/auth/me',
        {
          withCredentials: true,
        },
      );
      return {
        message: response.data.message,
        user: userResponse.data,
      };
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

// Modify registerUser to match loginUser pattern
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        credentials,
        { withCredentials: true },
      );

      // Fetch user details after successful registration
      const userResponse = await axios.get(
        'http://localhost:5000/api/auth/me',
        {
          withCredentials: true,
        },
      );

      return {
        message: response.data.message,
        user: userResponse.data,
      };
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

// Modify fetchUserDetails to properly handle token issues
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, thunkAPI) => {
    const token = Cookies.get('token');
    if (!token || isTokenExpired(token)) {
      return thunkAPI.rejectWithValue('Token expired or invalid');
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

// Helper function to update auth state
const updateAuthState = (state: AuthState, userData: UserData) => {
  state.username = userData.username;
  state.userId = userData._id;
  state.isAuthenticated = true;
  localStorage.setItem('username', userData.username);
  localStorage.setItem('userId', userData._id);
  localStorage.setItem('isAuthenticated', 'true');
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(), // Use the initial state from localStorage
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.username = null;
      localStorage.removeItem('isAuthenticated'); // Remove the state from localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          updateAuthState(state, action.payload.user);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle register - now matches login pattern
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          updateAuthState(state, action.payload.user);
        }
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
          updateAuthState(state, {
            username: action.payload.username,
            _id: action.payload.userId,
          });
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
