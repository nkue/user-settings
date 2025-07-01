import styles from "./SaveButton.module.css";
import { Button } from "../components/button/Button";

interface SaveButtonProps {
	onClick: (e?: React.FormEvent) => void;
	disabled: boolean;
}

export function SaveButton({ onClick, disabled }: SaveButtonProps) {
	return (
		<div className={styles.saveButtonWrapper}>
			<Button
				buttonStyle="primary"
				label="Save Changes"
				onClick={onClick}
				disabled={disabled}
			/>
		</div>
	);
}
