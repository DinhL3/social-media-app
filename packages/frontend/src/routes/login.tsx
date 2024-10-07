import { Container, Typography, Link as MaterialLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Log in
      </Typography>

      <Typography variant="body1" gutterBottom>
        Don't have an account? Click{' '}
        <MaterialLink component={RouterLink} to="/register">
          here
        </MaterialLink>{' '}
        to register.
      </Typography>
    </Container>
  );
}
