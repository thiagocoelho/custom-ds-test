import React from "react";
import { Accordion as MuiAccordion } from '@mui/material';

import { AccordionProps } from "./Accordion.types";

const Accordion = ({ children, ...rest }:AccordionProps) => {
  return (
    <MuiAccordion {...rest}>{children}</MuiAccordion>
  )
}

export default Accordion;
