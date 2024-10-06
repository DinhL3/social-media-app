import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
        About this app
      </Typography>

      <Typography variant="h5" gutterBottom>
        Authors
      </Typography>
      <Typography variant="body1" gutterBottom>
        This app was made by the two best developers west of Mississippi for
        $200,000 (Breaking Bad reference).
      </Typography>
    </Container>
  );
}
