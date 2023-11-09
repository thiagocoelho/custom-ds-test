import React from 'react';
import { ThemeProvider } from '@mui/material';
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import "@fontsource/source-sans-3"; // Defaults to weight 400

export const NormaProvider = (props:ThemeProviderProps) => {
  const { theme, children } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
