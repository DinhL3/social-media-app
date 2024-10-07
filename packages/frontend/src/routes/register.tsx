import { Container, Typography } from '@mui/material';

export default function Register() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Register
      </Typography>

      <Typography variant="body1" gutterBottom>
        This is the register page
      </Typography>
    </Container>
  );
}
