import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link as MaterialLink,
  Stack,
  Box,
} from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store'; // Import your RootState and AppDispatch types
import { loginUser } from '../features/auth/authSlice'; // Import the loginUser thunk

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();

  // Get Redux state
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the loginUser thunk
    dispatch(loginUser({ username: form.username, password: form.password }));
  };

  // If the user is authenticated, navigate to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Log in
      </Typography>

      {/* Show backend error if it exists */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Username"
            variant="filled"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={!!error}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!error}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading ||
              form.username.trim() === '' ||
              form.password.trim() === ''
            }
            fullWidth
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Stack>
      </form>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Don't have an account? Click{' '}
          <MaterialLink component={RouterLink} to="/register">
            here
          </MaterialLink>{' '}
          to register.
        </Typography>
      </Box>
    </Container>
  );
}
