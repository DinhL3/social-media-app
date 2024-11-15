import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice'; // Import the logout action

const pages = ['Home', 'Discover', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedOut, setLoggedOut] = useState(false); // State to trigger redirection after logout
  const dispatch = useDispatch();

  // Get the authentication state from Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    setLoggedOut(true); // Set the state to trigger redirection
    handleCloseUserMenu(); // Close the user menu
  };

  // Mobile Menu Function
  const renderMobileMenu = () => (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page}
              component={Link}
              to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <EmojiEmotionsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        SOCIAL
      </Typography>
    </>
  );

  // Desktop Menu Function
  const renderDesktopMenu = () => (
    <>
      <EmojiEmotionsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        SOCIAL
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            component={Link}
            to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
            sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );

  const renderUserMenu = () => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open user menu">
        <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
          >
            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const renderLoginMenu = () => (
    <Tooltip title="Login">
      <Button
        component={Link}
        to="/login"
        color="inherit"
        startIcon={<LoginIcon />}
        sx={{
          display: { xs: 'flex', md: 'inline-flex' },
          fontSize: { xs: 0, md: 'inherit' },
        }}
        size="large"
      >
        <Typography
          variant="button"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Login
        </Typography>
      </Button>
    </Tooltip>
  );

  return (
    <AppBar position="static">
      {loggedOut && <Navigate to="/" replace />} {/* Redirect after logout */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {renderDesktopMenu()}
          {renderMobileMenu()}
          {isAuthenticated ? renderUserMenu() : renderLoginMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
