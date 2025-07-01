import styles from "./Section.module.css";
import { ToggleButton } from "../stories/toggle-button/ToggleButton";
import { Headline } from "../stories/headline/Headline";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";

export function GeneralSection() {
	const { form, saveStatus, handleToggleChange } = useUserSettingsFormContext();
	return (
		<section id="general" className={styles.section}>
			<Headline>General Settings</Headline>
			<div className={styles.toggleGroup}>
				<ToggleButton
					label="Enable Dark Mode:"
					checked={!!form.isDarkModeEnabled}
					onChange={(checked) =>
						handleToggleChange("isDarkModeEnabled", checked)
					}
					disabled={saveStatus === "saving"}
				/>
				<ToggleButton
					label="Enable Notifications:"
					checked={!!form.isNotificationsEnabled}
					onChange={(checked) =>
						handleToggleChange("isNotificationsEnabled", checked)
					}
					disabled={saveStatus === "saving"}
				/>
			</div>
		</section>
	);
}
