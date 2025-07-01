import styles from "./MainContent.module.css";
import { AccountSection } from "./AccountSection";
import { GeneralSection } from "./GeneralSection";
import { PrivacySection } from "./PrivacySection";
import { SaveButton } from "../compositions/SaveButton";
import { StatusMessage } from "../components/status-message/StatusMessage";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";
import { Button } from "../components/button/Button";

export function MainContent() {
	const {
		saveStatus,
		isChanged,
		isValid,
		handleSubmit,
		handleReload,
		success,
		error,
	} = useUserSettingsFormContext();
	return (
		<section className={styles.mainContent}>
			<AccountSection />
			<GeneralSection />
			<PrivacySection />
			<Button
				buttonStyle="secondary"
				label="Cancel Changes"
				onClick={handleReload}
				disabled={saveStatus === "saving"}
			/>
			<SaveButton
				onClick={handleSubmit}
				disabled={!isChanged || saveStatus === "saving" || !isValid}
			/>
			{success && <StatusMessage type="success">{success}</StatusMessage>}
			{error && <StatusMessage type="error">{error}</StatusMessage>}
		</section>
	);
}
