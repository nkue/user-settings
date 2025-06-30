import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Label",
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    checked: true,
  },
};
