import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Input } from "./Input";

const meta = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: "Name",
		placeholder: "Enter your name",
	},
};

export const TypeEmail: Story = {
	args: {
		label: "Email",
		type: "email",
	},
};

export const TypePassword: Story = {
	args: {
		label: "Password",
		type: "password",
	},
};

export const TypeNumber: Story = {
	args: {
		label: "Age",
		type: "number",
	},
};

export const WithPlaceholder: Story = {
	args: {
		label: "Label",
		placeholder: "placeholder text",
	},
};

export const WithDefaultValue: Story = {
	args: {
		label: "Label",
		defaultValue: "default value",
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled",
		value: "Can't edit",
		disabled: true,
	},
};

export const Required: Story = {
	args: {
		label: "Required",
		required: true,
	},
};

export const ErrorMessage: Story = {
	args: {
		label: "Label",
		errorMessage: "This field is required",
	},
};
