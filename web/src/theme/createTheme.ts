'use client'
import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import { themeOptions } from './theme-options';

export function createTheme() {
    let theme = createMuiTheme(themeOptions);
    theme = responsiveFontSizes(theme);
    return theme;
};