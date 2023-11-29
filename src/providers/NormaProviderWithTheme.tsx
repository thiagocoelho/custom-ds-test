import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import "@fontsource/source-sans-3"; // Defaults to weight 400

import { createTheme } from '@mui/material/styles';
import { themes } from '../themes/defaultTheme';

const theme = createTheme(themes.light);

type NormaProviderWithTheme = {
  children?: React.ReactNode
}

export const NormaProviderWithTheme = (props:NormaProviderWithTheme) => {
  const { children } = props;
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
