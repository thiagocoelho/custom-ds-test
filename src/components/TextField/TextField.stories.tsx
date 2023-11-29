import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  argTypes: {
    label: {
      control: "text"
    }
  }
  // tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Basic: Story = {};