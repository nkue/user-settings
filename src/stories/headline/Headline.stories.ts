import type { Meta, StoryObj } from "@storybook/react-vite";
import { Headline } from "./Headline";

const meta = {
	title: "Components/Headline",
	component: Headline,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Section Headline",
		level: 2,
	},
};

export const H3: Story = {
	args: {
		children: "Headline Level 3",
		level: 3,
	},
};

export const H4: Story = {
	args: {
		children: "Headline Level 4",
		level: 4,
	},
};
