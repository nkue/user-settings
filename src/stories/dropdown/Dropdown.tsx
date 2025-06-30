import React from "react";
import classes from "./Dropdown.module.css";

export interface DropdownProps {
	/** Options for the dropdown */
	options: { value: string; label: string }[];
	/** Selected value */
	value: string;
	/** Change handler */
	onChange: (value: string) => void;
	/** Label for the dropdown */
	label: string;
	disabled?: boolean;
}
/** Dropdown component for selecting an option */
const Dropdown: React.FC<DropdownProps> = ({
	options,
	value,
	onChange,
	label,
	disabled = false,
}) => {
	const selectId = `dropdown-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={selectId}>
				{label}
				<select
					className={classes.select}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					aria-label={label}
					disabled={disabled}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};
export default Dropdown;
