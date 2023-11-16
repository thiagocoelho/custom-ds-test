'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { NormaProvider } from '../providers/NormaProvider';
import { createTheme } from '@mui/material/styles';
import { themes } from '../styles';

const theme = createTheme(themes.light);

export default function ThemeRegistry({ children, useServerInsertedHTML }: { children: React.ReactNode, useServerInsertedHTML:any}) {
  return (
    <NextAppDirEmotionCacheProvider useServerInsertedHTML={useServerInsertedHTML} options={{ key: 'mui' }}>
      <NormaProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </NormaProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
