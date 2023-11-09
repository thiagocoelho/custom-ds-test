"use client"; 

import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  typography: {
    fontFamily: '"Source Sans 3"',
  },
  palette: {
    primary: {
      main: "#FF7F11",
      contrastText: "#ffffff",
    }
  },
});