// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tealDark: PaletteColorOptions;
    tealLight: PaletteColorOptions;
    lightBlue: PaletteColorOptions;
    peachLight: PaletteColorOptions;
    peach: PaletteColorOptions;
  }
  interface PaletteOptions {
    tealDark?: PaletteColorOptions;
    tealLight?: PaletteColorOptions;
    lightBlue?: PaletteColorOptions;
    peachLight?: PaletteColorOptions;
    peach?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tealDark: true;
    tealLight: true;
    lightBlue: true;
    peachLight: true;
    peach: true;
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#edf6f9',
      paper: '#ffffff',
    },
    tealDark: {
      main: '#006d77',
      contrastText: '#ffffff',
    },
    tealLight: {
      main: '#83c5be',
      contrastText: '#000000',
    },
    lightBlue: {
      main: '#edf6f9',
      contrastText: '#000000',
    },
    peachLight: {
      main: '#ffddd2',
      contrastText: '#000000',
    },
    peach: {
      main: '#e29578',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e29578',
      contrastText: '#ffffff',
    },
    success: {
      main: '#006d77',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#006d77',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006d77',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e29578',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#006d77',
          },
          '&.Mui-error': {
            color: '#e29578',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            color: '#e29578',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#006d77', // Custom teal color for default link color
          '&:hover': {
            textDecoration: 'underline',
            color: '#004d4f', // Darker shade for hover (optional)
          },
        },
      },
    },
  },
});

export default theme;
