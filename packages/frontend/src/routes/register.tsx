import { Container, Typography, Link as MaterialLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Register() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Register
      </Typography>

      <Typography variant="body1" gutterBottom>
        Already have an account? Click{' '}
        <MaterialLink component={RouterLink} to="/login">
          here
        </MaterialLink>{' '}
        to log in.
      </Typography>
    </Container>
  );
}
