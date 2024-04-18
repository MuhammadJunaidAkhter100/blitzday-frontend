import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import { baseOptions } from './base-options';
import { colorOptions } from './color-options';

export const createTheme = () => {
  let theme = createMuiTheme(baseOptions, colorOptions);

  theme = responsiveFontSizes(theme);

  return theme;
};