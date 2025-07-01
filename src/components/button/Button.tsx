import "./button.css";

export interface ButtonProps {
	/** Is this the principal call to action on the page? */
	buttonStyle?: "primary" | "secondary";
	/** How large should the button be? */
	size?: "small" | "medium" | "large";
	/** Button contents */
	label: string | React.ReactNode;
	/** ARIA label for accessibility */
	ariaLabel?: string;
	disabled?: boolean;
	/** Optional click handler */
	onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
	buttonStyle = "primary",
	size = "medium",
	label,
	ariaLabel = `${buttonStyle} button`,
	disabled = false,
	...props
}: ButtonProps) => {
	const mode = `storybook-button--${buttonStyle}`;
	return (
		<button
			type="button"
			className={[
				"storybook-button",
				`storybook-button--${size}`,
				disabled ? "storybook-button--disabled" : "",
				mode,
			].join(" ")}
			onClick={() => {
				if (props.onClick) {
					props.onClick();
				}
			}}
			aria-label={ariaLabel}
			disabled={disabled}
			{...props}
		>
			{label}
		</button>
	);
};
