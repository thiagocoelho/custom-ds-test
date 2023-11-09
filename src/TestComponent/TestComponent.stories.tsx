import React from "react";
import TestComponent from "./TestComponent";
import {Button, NormaProvider, defaultTheme} from '../';
import { createTheme } from "@mui/material";

// import {ThemeOptions} from '@mui/material/styles';
// @fontsource/source-sans-3

// export const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     ...olosPalette,
//   },
// });

export default {
  title: "TestComponent"
};

export const WithText = () => (
  <TestComponent
    heading="I am a test component"
    content={<h2>Made with love by Harvey</h2>}
  />
);

export const WithButtons = () => (
  <NormaProvider theme={defaultTheme}>
    <TestComponent
      heading="I have a button"
      content={
        <div>
          <button onClick={() => alert("You clicked me!")}>Click me</button>
          <Button variant="contained">Test</Button>
        </div>
      }
    />
  </NormaProvider>
);

export const WithTheme = () => (
  <TestComponent
    heading="I have a button"
    content={
      <div>
        <Button>Test</Button>
      </div>
    }
  />
);
