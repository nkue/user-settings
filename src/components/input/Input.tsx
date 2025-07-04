import type React from "react";
import classes from "./Input.module.css";
import { useMemo } from "react";

interface InputProps {
	name?: string;
	label?: string;
	value?: string;
	defaultValue?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	type?: "text" | "email" | "password" | "number";
	disabled?: boolean;
	required?: boolean;
	errorMessage?: string;
}

export const Input = ({
	name,
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	disabled = false,
	required = false,
	errorMessage,
}: InputProps) => {
	const errorMessageId = useMemo(() => {
		return crypto.randomUUID();
	}, []);

	return (
		<div>
			<label className={classes.label}>
				{label}
				{required && <span> *</span>}
				<input
					className={classes.input + (errorMessage ? ` ${classes.error}` : "")}
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					disabled={disabled}
					required={required}
					aria-describedby={errorMessage ? errorMessageId : undefined}
					data-testid="input-element"
				/>
			</label>
			{errorMessage && (
				<div className={classes.errorMessage} id={errorMessageId}>
					{errorMessage}
				</div>
			)}
		</div>
	);
};
