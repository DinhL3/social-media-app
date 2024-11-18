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
import { RootState, AppDispatch } from '../app/store';
import { registerUser } from '../features/auth/authSlice';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [passwordError, setPasswordError] = useState(''); // State to hold password validation error
  const dispatch = useDispatch<AppDispatch>();

  // Get Redux state
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  // Password validation function
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password must contain both letters and numbers';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    // Validate password when it changes
    if (name === 'password') {
      const validationError = validatePassword(value);
      setPasswordError(validationError);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if password is valid before dispatching
    if (passwordError === '') {
      // Dispatch the registerUser thunk
      dispatch(
        registerUser({ username: form.username, password: form.password }),
      );
    }
  };

  // Redirect to the home page if registration was successful and the user is authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Create a new account
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
            variant="outlined"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={!!error}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!passwordError} // Show error if password is invalid
            helperText={passwordError} // Display password validation message
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading ||
              form.username.trim() === '' ||
              form.password.trim() === '' ||
              passwordError !== '' // Disable if password is invalid
            }
            fullWidth
            color="tealDark"
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Stack>
      </form>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Already have an account? Click{' '}
          <MaterialLink component={RouterLink} to="/login">
            here
          </MaterialLink>{' '}
          to log in.
        </Typography>
      </Box>
    </Container>
  );
}
