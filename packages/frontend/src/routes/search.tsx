import { Container, Stack, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import { centerContainerStyles } from '../styles';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setError(value.length < 3 || /\s/.test(value));
  };

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        color="#e29578"
      >
        <Typography variant="h5">Looking for new friends?</Typography>
        <Typography variant="h5">(੭˃ᴗ˂)੭ ٩(^ᗜ^ )و ´-</Typography>
      </Stack>
      <Stack
        mt={1}
        spacing={1}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <TextField
          id="user-search-input"
          variant="outlined"
          size="small"
          fullWidth
          placeholder="type username..."
          value={searchValue}
          onChange={handleChange}
          error={error}
          helperText={
            error
              ? 'Input must be at least 3 characters and contain no spaces'
              : ''
          }
        />
        <Button
          id="user-search-button"
          variant="contained"
          startIcon={<SearchIcon />}
          color="tealDark"
          disabled={error || searchValue.length === 0}
          sx={{ flex: 'none' }}
        >
          Search
        </Button>
      </Stack>
    </Container>
  );
}
