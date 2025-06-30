import styles from "./Header.module.css";
import { Button } from "../stories/button/Button";
import { ReloadIcon } from "../assets/ReloadIcon";

interface HeaderProps {
	onReload: () => void;
	disabled?: boolean;
}

export function Header({ onReload, disabled }: HeaderProps) {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>User Profile Settings</h1>
			<Button
				buttonStyle="secondary"
				size="small"
				label={<ReloadIcon />}
				ariaLabel="Reload User Settings"
				onClick={onReload}
				disabled={disabled}
			/>
		</header>
	);
}
