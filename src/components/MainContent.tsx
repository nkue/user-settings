import styles from "./MainContent.module.css";
import { AccountSection } from "./AccountSection";
import { GeneralSection } from "./GeneralSection";
import { PrivacySection } from "./PrivacySection";
import { SaveButton } from "./SaveButton";
import { StatusMessage } from "./StatusMessage";

type CommPrefs = {
	newsletter: boolean;
	promotions: boolean;
	productUpdates: boolean;
};

interface FormData {
	username: string;
	email: string;
	isDarkModeEnabled?: boolean;
	receivePushNotifications?: boolean;
	language?: string;
	// Add other fields as needed
}

interface MainContentProps {
	form: FormData;
	commPrefs: CommPrefs;
	accordionOpen: string;
	validation: { username?: string; email?: string };
	saveStatus: "idle" | "saving" | "success" | "error";
	isChanged: boolean;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDropdownChange: (value: string) => void;
	onToggleChange: (name: string, checked: boolean) => void;
	onCheckboxGroupChange: (name: keyof CommPrefs, checked: boolean) => void;
	onSave: (e?: React.FormEvent) => void;
	success: string | null;
	error: string | null;
}

export function MainContent({
	form,
	commPrefs,
	accordionOpen,
	validation,
	saveStatus,
	isChanged,
	onInputChange,
	onDropdownChange,
	onToggleChange,
	onCheckboxGroupChange,
	onSave,
	success,
	error,
}: MainContentProps) {
	return (
		<section className={styles.mainContent}>
			<AccountSection
				form={form}
				onInputChange={onInputChange}
				onDropdownChange={onDropdownChange}
				disabled={saveStatus === "saving"}
				validation={validation}
			/>
			<GeneralSection
				form={{
					isDarkModeEnabled: !!form.isDarkModeEnabled,
					receivePushNotifications: !!form.receivePushNotifications,
				}}
				onToggleChange={onToggleChange}
				disabled={saveStatus === "saving"}
			/>
			<PrivacySection
				commPrefs={commPrefs}
				onCheckboxChange={onCheckboxGroupChange}
				accordionOpen={accordionOpen}
			/>
			<SaveButton
				onClick={onSave}
				disabled={
					!isChanged ||
					saveStatus === "saving" ||
					Object.keys(validation).length > 0
				}
			/>
			{success && <StatusMessage type="success">{success}</StatusMessage>}
			{error && <StatusMessage type="error">{error}</StatusMessage>}
		</section>
	);
}
