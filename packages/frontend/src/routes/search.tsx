import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Link as MaterialLink,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip, // Import Tooltip
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import AccountCircleIcon
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../app/store'; // Import RootState type
import axios from 'axios';
import { delay } from '../utils'; // Import delay utility

import { centerContainerStyles } from '../styles';

interface User {
  _id: string;
  username: string;
}

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleSearch = async () => {
    if (error || searchValue.length < 3) return;

    setLoading(true);
    setSearchError(null);
    setHasSearched(true);
    try {
      await delay(500);
      const response = await axios.get(
        `http://localhost:5000/api/users/search?keyword=${searchValue}`,
        {
          withCredentials: true,
        },
      );
      setUsers(response.data);
    } catch (err: any) {
      setSearchError(err.response?.data?.error || 'Failed to search users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setError(value.length < 3 || /\s/.test(value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !error && searchValue.length >= 3) {
      handleSearch();
    }
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

      {!isAuthenticated ? (
        <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
          Please{' '}
          <MaterialLink component={RouterLink} to="/login">
            log in
          </MaterialLink>{' '}
          or{' '}
          <MaterialLink component={RouterLink} to="/register">
            register
          </MaterialLink>{' '}
          to search.
        </Typography>
      ) : (
        <Stack
          mt={1}
          spacing={1}
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Tooltip
            title={
              error
                ? 'Input must be at least 3 characters and contain no spaces'
                : ''
            }
            placement="top"
            arrow
            open={error}
          >
            <TextField
              id="user-search-input"
              variant="outlined"
              size="small"
              placeholder="type username..."
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={error}
            />
          </Tooltip>
          <Button
            id="user-search-button"
            variant="contained"
            startIcon={<SearchIcon />}
            color="tealDark"
            disabled={error || searchValue.length === 0 || loading}
            sx={{ flex: 'none' }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>
      )}

      {searchError && (
        <Typography color="error" sx={{ mt: 2 }}>
          {searchError}
        </Typography>
      )}

      {loading ? (
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <CircularProgress sx={{ color: 'tealDark.main' }} />
        </Stack>
      ) : (
        <List dense sx={{ mt: 2 }}>
          {users.length === 0 && searchValue && hasSearched && !searchError ? (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              No users found
            </Typography>
          ) : (
            users.map((user) => (
              <ListItem key={user._id}>
                <ListItemButton
                  component={RouterLink}
                  to={`/profile/${user.username}`}
                >
                  <ListItemAvatar>
                    <AccountCircleIcon
                      sx={{ fontSize: 48, color: 'peach.main' }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`@${user.username}`} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      )}
    </Container>
  );
}
