import React from "react";
import { TextField as MuiTextField } from '@mui/material';

import { CustomTextFieldProps } from "./TextField.types";

const TextField = ({ children, ...rest }:CustomTextFieldProps) => {
  return (
    <MuiTextField {...rest}>{children}</MuiTextField>
  )
}

export default TextField;
