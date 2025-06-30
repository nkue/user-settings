import styles from "./Section.module.css";
import { ToggleButton } from "./ToggleButton";
import { Headline } from "./Headline";

interface GeneralForm {
	isDarkModeEnabled: boolean;
	receivePushNotifications: boolean;
}

interface GeneralSectionProps {
	form: GeneralForm;
	onToggleChange: (name: string, checked: boolean) => void;
	disabled: boolean;
}

export function GeneralSection({
	form,
	onToggleChange,
	disabled,
}: GeneralSectionProps) {
	return (
		<section id="general" className={styles.section}>
			<Headline>General Settings</Headline>
			<div className={styles.toggleGroup}>
				<ToggleButton
					label="Enable Dark Mode"
					checked={!!form.isDarkModeEnabled}
					onChange={(checked) => onToggleChange("isDarkModeEnabled", checked)}
					disabled={disabled}
				/>
				<ToggleButton
					label="Receive Push Notifications"
					checked={!!form.receivePushNotifications}
					onChange={(checked) =>
						onToggleChange("receivePushNotifications", checked)
					}
					disabled={disabled}
				/>
			</div>
		</section>
	);
}
