import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataGrid from "./DataGrid";
import data from './sample-data.json';

const meta: Meta<typeof DataGrid> = {
  title: "DataGrid",
  component: DataGrid,
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Basic: Story = {
  args: {
    data: data,
    onRowClick: (row: any) => console.log('row click'),
  }
}