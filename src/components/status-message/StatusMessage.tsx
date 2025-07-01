import styles from "./StatusMessage.module.css";

interface StatusMessageProps {
	type: "success" | "error";
	children: React.ReactNode;
}

export function StatusMessage({ type, children }: StatusMessageProps) {
	return (
		<div className={type === "success" ? styles.success : styles.error}>
			{children}
		</div>
	);
}
