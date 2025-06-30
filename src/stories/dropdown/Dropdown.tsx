// A component for selecting a single option from a list. It should include a clear label associated with the select element. Accept an array of options (e.g., { value: string, label: string }[]). Handle value and onChange events. It must be accessible (e.g., using for attribute on labels, appropriate ARIA roles).

import React from "react";
import "./dropdown.css";

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
		<div className="dropdown-container">
			<label className="dropdown-label" htmlFor={selectId}>
				{label}
			</label>
			<select
				className="dropdown-select"
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
		</div>
	);
};
export default Dropdown;
