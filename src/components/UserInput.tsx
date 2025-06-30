import { Input } from "../stories/input/Input";

interface UserInputProps {
	label: string;
	type: "text" | "email";
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
	errorMessage?: string;
	placeholder?: string;
}

export function UserInput({
	label,
	type,
	name,
	value,
	onChange,
	disabled = false,
	required = false,
	errorMessage,
	placeholder,
}: UserInputProps) {
	return (
		<Input
			label={label}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			required={required}
			errorMessage={errorMessage}
			placeholder={placeholder}
		/>
	);
}
