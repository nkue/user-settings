import type React from "react";
import { useCallback, useMemo } from "react";
import classes from "./ToggleButton.module.css";

export interface ToggleButtonProps {
	label?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
}

export const ToggleButton = ({
	label,
	checked,
	onChange,
	disabled = false,
}: ToggleButtonProps) => {
	const isChecked = checked;

	const handleToggle = useCallback(() => {
		if (disabled) return;
		onChange?.(!isChecked);
	}, [disabled, isChecked, onChange]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				handleToggle();
			}
		},
		[handleToggle]
	);

	const toggleButtonId = useMemo(() => {
		return crypto.randomUUID();
	}, []);

	return (
		<div className={classes.wrapper}>
			<label className={classes.label}>
				{label}
				<button
					id={toggleButtonId}
					type="button"
					role="switch"
					aria-checked={isChecked}
					aria-disabled={disabled}
					disabled={disabled}
					tabIndex={0}
					className={[
						classes.toggle,
						isChecked ? classes.on : classes.off,
						disabled ? classes.disabled : "",
					].join(" ")}
					onClick={handleToggle}
					onKeyDown={handleKeyDown}
					data-testid="toggle-button"
				>
					<span className={classes.knob} />
					<span className={classes.stateText}>{isChecked ? "On" : "Off"}</span>
				</button>
			</label>
		</div>
	);
};
