import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
	title: "Components/Accordion",
	component: Accordion,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		items: [
			{
				value: "item-1",
				trigger: "Is it accessible?",
				content: "Yes! You can animate the Accordion with CSS or JavaScript.",
			},
			{
				value: "item-2",
				trigger: "Is it unstyled?",
				content: "Yes! You can animate the Accordion with CSS or JavaScript.",
			},
			{
				value: "item-3",
				trigger: "Can it be animated?",
				content: "Yes! You can animate the Accordion with CSS or JavaScript.",
			},
		],
	},
};
