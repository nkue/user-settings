import { Button } from "../stories/button/Button";

interface SaveLanguageButtonProps {
	onClick: () => void;
	disabled: boolean;
	status: "idle" | "saving" | "success" | "error";
}

export function SaveLanguageButton({
	onClick,
	disabled = false,
	status,
}: SaveLanguageButtonProps) {
	return (
		<>
			<Button
				buttonStyle="primary"
				size="medium"
				label="Save Language"
				onClick={onClick}
				disabled={disabled}
			/>
			{status === "saving" && <div>Saving...</div>}
			{status === "success" && <div>Language saved!</div>}
		</>
	);
}
