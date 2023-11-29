import React from 'react';

import { Preview } from '@storybook/react';

import { NormaProviderWithTheme } from "../src";

import '@fontsource/material-icons';

const preview: Preview = {
  decorators: [
    (Story) => (
      <NormaProviderWithTheme>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </NormaProviderWithTheme>
    ),
  ],
};

export default preview;