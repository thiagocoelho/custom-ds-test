'use client';

export * from './ThemeRegistry';
export * from './providers';
import { themes } from './styles';

import TestComponent from "./TestComponent";
import { Button, Accordion } from "@mui/material";
import { NormaProvider } from "./providers/NormaProvider";


export { TestComponent, Button, Accordion, NormaProvider, themes};
