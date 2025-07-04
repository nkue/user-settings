import { type Meta, type StoryFn } from "@storybook/react-vite";
import { expect, userEvent, within, fn } from "storybook/test";
import { ToggleButton } from "./ToggleButton";

const meta = {
	title: "Tests/ToggleButton",
	component: ToggleButton,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ToggleButton>;

export default meta;
const Template: StoryFn<typeof ToggleButton> = (args) => (
	<ToggleButton {...args} />
);

export const Controlled = Template.bind({});
Controlled.args = {
	label: "Controlled Toggle",
	checked: false,
	onChange: fn(),
};
Controlled.play = async ({ args, canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByTestId("toggle-button");
	expect(button).toHaveAttribute("aria-checked", "false");
	await userEvent.click(button);
	expect(args.onChange).toHaveBeenCalledWith(true);
};
