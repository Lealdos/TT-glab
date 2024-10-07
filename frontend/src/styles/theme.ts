import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h1: {
            fontSize: '2.4rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});
