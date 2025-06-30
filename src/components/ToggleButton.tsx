import { ToggleButton as StoryToggleButton } from "../stories/toggle-button/ToggleButton";

interface ToggleButtonProps {
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
}

export function ToggleButton({
	label,
	checked,
	onChange,
	disabled = false,
}: ToggleButtonProps) {
	return (
		<StoryToggleButton
			label={label}
			checked={checked}
			onChange={onChange}
			disabled={disabled}
		/>
	);
}
