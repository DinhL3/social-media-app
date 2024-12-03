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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import AccountCircleIcon
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../app/store'; // Import RootState type

import { centerContainerStyles } from '../styles';

const dummyUsers = [
  { username: 'tabbycat' },
  { username: 'doglover' },
  { username: 'birdwatcher' },
  { username: 'fishkeeper' },
];

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Get authentication state from Redux

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
              error={error}
            />
          </Tooltip>
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
      )}
      <List dense sx={{ mt: 2 }}>
        {dummyUsers.map((user) => (
          <>
            <ListItem key={user.username}>
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
          </>
        ))}
      </List>
    </Container>
  );
}
