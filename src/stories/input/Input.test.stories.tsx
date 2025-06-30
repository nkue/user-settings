import { type Meta, type StoryFn } from "@storybook/react-vite";
import { expect, userEvent, within, fn } from "storybook/test";
import { Input } from "./Input";

const meta = {
	title: "Tests/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Input>;

export default meta;
const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Controlled = Template.bind({});
Controlled.args = {
	label: "Controlled Input",
	value: "",
	onChange: fn(),
};
Controlled.play = async ({ args, canvasElement }) => {
	const canvas = within(canvasElement);
	const input = canvas.getByTestId("input-element");
	expect(input).toHaveValue("");
	await userEvent.type(input, "Test Input");
	expect(args.onChange).toHaveBeenCalled();
};

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
	label: "Uncontrolled Input",
	defaultValue: "",
};
Uncontrolled.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const input = canvas.getByTestId("input-element");
	expect(input).toHaveValue("");
	await userEvent.type(input, "Test Input");
	expect(input).toHaveValue("Test Input");
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
	label: "Input with Placeholder",
	placeholder: "Enter text here",
};
WithPlaceholder.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const input = canvas.getByTestId("input-element");
	expect(input).toHaveAttribute("placeholder", "Enter text here");
	await userEvent.type(input, "Test Input");
	expect(input).toHaveValue("Test Input");
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: "Disabled Input",
	disabled: true,
};
Disabled.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const input = canvas.getByTestId("input-element");
	expect(input).toBeDisabled();
	await userEvent.type(input, "Test Input");
	expect(input).toHaveValue("");
};
