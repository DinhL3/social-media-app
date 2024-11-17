import { Container, Alert } from '@mui/material';
import { centerContainerStyles } from '../../styles';

export default function ErrorPage() {
  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Alert severity="error">
        Are you lost? (っ º - º ς) <br /> The page you are looking for does not
        exist.
      </Alert>
    </Container>
  );
}
