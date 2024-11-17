import { Container, Typography } from '@mui/material';
import { centerContainerStyles } from '../styles';

export default function CreateNewPost() {
  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Create a new post
      </Typography>
    </Container>
  );
}
