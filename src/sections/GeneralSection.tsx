import styles from "./Section.module.css";
import { ToggleButton } from "../components/ToggleButton";
import { Headline } from "../stories/headline/Headline";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";

export function GeneralSection() {
	const { form, saveStatus, handleToggleChange } = useUserSettingsFormContext();
	return (
		<section id="general" className={styles.section}>
			<Headline>General Settings</Headline>
			<div className={styles.toggleGroup}>
				<ToggleButton
					label="Enable Dark Mode"
					checked={!!form.isDarkModeEnabled}
					onChange={(checked) =>
						handleToggleChange("isDarkModeEnabled", checked)
					}
					disabled={saveStatus === "saving"}
				/>
			</div>
		</section>
	);
}
