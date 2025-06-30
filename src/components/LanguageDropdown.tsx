import Dropdown from "../stories/dropdown/Dropdown";

interface LanguageDropdownProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

const languageOptions = [
	{ value: "option1", label: "Option 1" },
	{ value: "option2", label: "Option 2" },
	{ value: "option3", label: "Option 3" },
];

export function LanguageDropdown({
	value,
	onChange,
	disabled,
}: LanguageDropdownProps) {
	return (
		<Dropdown
			options={languageOptions}
			value={value}
			onChange={onChange}
			label="Select an Option"
			disabled={disabled}
		/>
	);
}
