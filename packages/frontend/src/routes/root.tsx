import { Container, Typography } from '@mui/material';

export default function Root() {
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mt: 3 }} gutterBottom>
          Welcome to our social media app
        </Typography>
        <Typography variant="body1" gutterBottom>
          Let's meet new friends and chat!
        </Typography>
      </Container>
    </>
  );
}
