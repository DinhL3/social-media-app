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
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006d77',
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
