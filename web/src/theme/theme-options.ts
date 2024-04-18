'use client'
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5D22FE',
      light: '#5D22FE',
      dark: '#270a78',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#000000',
      paper: '#0b0b0b',
    },
    text: {
      primary: '#DAFDFF',
      secondary: 'rgba(218,253,255,0.6)',
    },
  },
  typography: {
    fontSize: 24,
    button: {
      fontSize: 20,
      '@media (max-width:768px)': {
        fontSize: '16px',
      },
    },
    h1: {
      fontSize: '62px',
      fontWeight: 'bold',
      '@media (max-width:1280px)': {
        fontSize: '42px',
      },
      '@media (max-width:768px)': {
        fontSize: '32px',
      },
    },
    h2: {
      fontSize: 48,
      fontWeight: '500',
    },
    h3: {
      fontSize: 36,
      fontWeight: '500',
    },
    h4: {
      fontSize: 32,
      fontWeight: '500',
    },
    h5: {
      fontSize: 24,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          minWidth: 160,
          fontWeight: 500
        },
        sizeMedium: {
          paddingInline: '28px',
          minHeight: 48,
        },
        text: {
          fontSize: '24px !important',
          color: '#DAFDFF',
          minWidth: 'unset',
          height: 38,
          padding: '4px 16px',
        }
      },
    }
  },
};