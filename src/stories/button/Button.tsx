import { useState } from "react";

import "./button.css";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  buttonStyle?: "primary" | "secondary" | "toggle";
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
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
  const [toggleState, setToggleState] = useState(false);
  return (
    <button
      type="button"
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        `${toggleState ? "storybook-button--toggled" : ""}`,
        disabled ? "storybook-button--disabled" : "",
        mode,
      ].join(" ")}
      onClick={() => {
        if (buttonStyle === "toggle") {
          setToggleState(!toggleState);
        } else if (props.onClick) {
          props.onClick();
        }
      }}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {label}
      {buttonStyle === "toggle" && (
        <span className="toggle-indicator">{toggleState ? "ON" : "OFF"}</span>
      )}
    </button>
  );
};
