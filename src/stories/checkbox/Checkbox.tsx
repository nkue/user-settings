import type React from "react";
import classes from "./Checkbox.module.css";

interface CheckboxProps {
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	label?: string;
	defaultChecked?: boolean;
	checked?: boolean;
}

export const Checkbox = ({
	onChange,
	label,
	defaultChecked,
	checked,
}: CheckboxProps) => (
	<label className={classes.label} data-testid="checkbox-label">
		<input
			type="checkbox"
			className={classes.input}
			defaultChecked={defaultChecked}
			checked={checked}
			onChange={onChange}
			data-testid="checkbox-input"
		/>
		{label}
	</label>
);
