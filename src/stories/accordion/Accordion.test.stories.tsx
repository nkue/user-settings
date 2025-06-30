import { expect, userEvent, within } from "storybook/test";
import { type Meta, type StoryFn } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
	title: "Tests/Accordion",
	component: Accordion,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Accordion>;

export default meta;

const Template: StoryFn<typeof Accordion> = (args) => <Accordion {...args} />;

export const BasicInteraction = Template.bind({});
BasicInteraction.args = {
	items: [
		{
			value: "item-1",
			trigger: "First",
			content: "First content",
		},
		{
			value: "item-2",
			trigger: "Second",
			content: "Second content",
		},
	],
};
BasicInteraction.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	// Initially, no regions should be present
	expect(canvas.queryAllByRole("region")).toHaveLength(0);

	// Open first item
	await userEvent.click(canvas.getByText("First"));
	let regions = canvas.getAllByRole("region");
	expect(regions[0]).toHaveAttribute("data-state", "open");

	// Open second item, first should close (single mode)
	await userEvent.click(canvas.getByText("Second"));
	regions = canvas.getAllByRole("region");
	expect(regions[0]).toHaveAttribute("data-state", "closed");
	expect(regions[1]).toHaveAttribute("data-state", "open");
};

export const KeyboardNavigation = Template.bind({});
KeyboardNavigation.args = {
	items: [
		{
			value: "item-1",
			trigger: "Alpha",
			content: "Alpha content",
		},
		{
			value: "item-2",
			trigger: "Beta",
			content: "Beta content",
		},
	],
};
KeyboardNavigation.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const triggers = canvas.getAllByRole("button");

	// Focus and open with keyboard
	triggers[0].focus();
	await userEvent.keyboard("{Enter}");

	const regions = canvas.getAllByRole("region");
	expect(regions[0]).toHaveAttribute("data-state", "open");

	// Close with keyboard
	await userEvent.keyboard("{Enter}");
	expect(regions[0]).toHaveAttribute("data-state", "closed");
};
