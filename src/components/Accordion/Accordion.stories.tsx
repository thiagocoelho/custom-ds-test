import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
  // argTypes: {
  // }
  // tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: () => (
    <div>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  )
}

// export const Primary: Story = {
//   args: {
//     children: "Primary 😃",
//     size: "large",
//     variant: "contained",
//   },
// };

// export const Small: Story = {
//   args: {
//     children: "Botão pequeno",
//     size: "small"
//   }
// }