import React, { useCallback, useMemo } from "react";
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
	const selectId = useMemo(() => {
		return crypto.randomUUID();
	}, []);
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={selectId}>
				{label}
				<select
					className={classes.select}
					value={value}
					onChange={handleChange}
					aria-label={label}
					disabled={disabled}
					id={selectId}
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
