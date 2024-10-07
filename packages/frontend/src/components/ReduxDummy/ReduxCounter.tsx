import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store'; // Import the types from store
import { decrement, increment } from '../../features/counter/counterSlice';
import { Button, Container, Stack, Typography } from '@mui/material';

export default function ReduxCounter() {
  // Use RootState type in useSelector to type the state correctly
  const count = useSelector((state: RootState) => state.counter.value);

  // Use AppDispatch for proper typing of dispatch
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth="md">
      <Stack direction="row" spacing={2} justifyContent="flex-start">
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Typography variant="h3">{count}</Typography>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </Stack>
    </Container>
  );
}
