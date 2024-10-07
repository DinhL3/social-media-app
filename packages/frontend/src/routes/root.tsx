import { Container, Typography } from '@mui/material';
import ReduxCounter from '../components/ReduxDummy/ReduxCounter';

export default function Root() {
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          Redux Counter
        </Typography>
        <ReduxCounter />
      </Container>
    </>
  );
}
