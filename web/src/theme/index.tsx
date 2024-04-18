'use client'
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { createTheme } from './createTheme';

type Props = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
    const theme = createTheme();
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider