import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Get the initial state from localStorage
const getInitialAuthState = (): AuthState => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return {
    isAuthenticated,
    loading: false,
    error: null,
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
      // Handle error messages returned from backend
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.error || 'Login failed',
        );
      }
      return thunkAPI.rejectWithValue('Login failed');
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
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
