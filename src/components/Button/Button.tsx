import React from "react";
import { Button as MuiButton } from '@mui/material';

import { ButtonProps } from "./Button.types";

const Button = ({ children, ...rest }:ButtonProps) => {
  return (
    <MuiButton {...rest}>{children}</MuiButton>
  )
}

export default Button;
