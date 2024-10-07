import { Container, Typography } from '@mui/material';

export default function Login() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        Log in
      </Typography>

      <Typography variant="body1" gutterBottom>
        This is the log in page
      </Typography>
    </Container>
  );
}
