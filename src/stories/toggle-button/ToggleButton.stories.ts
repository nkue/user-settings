import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ToggleButton } from "./ToggleButton";

const meta = {
	title: "Components/ToggleButton",
	component: ToggleButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { onChange: fn() },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Power",
		defaultChecked: false,
	},
};

export const Checked: Story = {
	args: {
		label: "Wi-Fi",
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: "Bluetooth",
		checked: false,
		disabled: true,
	},
};
