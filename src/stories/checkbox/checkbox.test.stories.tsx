import { type Meta, type StoryFn } from "@storybook/react-vite";
import { expect, userEvent, within, fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Tests/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Controlled = Template.bind({});
Controlled.args = {
  label: "Controlled Checkbox",
  checked: false,
  onChange: fn(),
};
Controlled.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId("checkbox-input")).not.toBeChecked();
  await userEvent.click(canvas.getByTestId("checkbox-label"));
  expect(args.onChange).toHaveBeenCalledOnce();
};

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  label: "Uncontrolled Checkbox",
  defaultChecked: false,
};
Uncontrolled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId("checkbox-input")).not.toBeChecked();
  await userEvent.click(canvas.getByTestId("checkbox-label"));
  expect(canvas.getByTestId("checkbox-input")).toBeChecked();
};
