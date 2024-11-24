import { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUserDetails, logout } from '../../features/auth/authSlice';

const pages = ['Home', 'Chat', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function useIsMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedOut, setLoggedOut] = useState(false); // State to trigger redirection after logout
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();

  // Get authentication and user details from Redux state
  const {
    isAuthenticated,
    username,
    loading: authLoading,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !username) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, isAuthenticated, username]);

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
    dispatch(logout());
    setLoggedOut(true);
    handleCloseUserMenu();
  };

  const renderNavMenu = () => {
    const mobileNavMenu = (
      <>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <IconButton
            size="large"
            aria-label="menu"
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
        <EmojiEmotionsIcon sx={{ mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/"
          sx={{
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

    const desktopNavMenu = (
      <>
        <EmojiEmotionsIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          SOCIAL
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
              sx={{ my: 2, color: 'white', mx: 1 }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </>
    );

    return isMobile ? mobileNavMenu : desktopNavMenu;
  };

  const renderUserMenu = () => {
    const userMenuContent = (
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
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    );

    const mobileUserMenu = (
      <IconButton color="inherit" onClick={handleOpenUserMenu}>
        <AccountCircleIcon />
      </IconButton>
    );

    const desktopUserMenu = (
      <Button
        sx={{
          color: 'white',
          fontSize: '1rem',
          textTransform: 'lowercase',
        }}
        onClick={handleOpenUserMenu}
        endIcon={<AccountCircleIcon />}
      >
        @{username}
      </Button>
    );

    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open user menu">
          {authLoading ? (
            <CircularProgress size={32} sx={{ color: 'white' }} />
          ) : isMobile ? (
            mobileUserMenu
          ) : (
            desktopUserMenu
          )}
        </Tooltip>
        {userMenuContent}
      </Box>
    );
  };

  const renderLoginMenu = () => (
    <Tooltip title="Login">
      <Button
        component={Link}
        to="/login"
        color="inherit"
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
    </Tooltip>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'tealDark.main' }}>
      {loggedOut && <Navigate to="/" replace />}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {renderNavMenu()}
          {isAuthenticated ? renderUserMenu() : renderLoginMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
