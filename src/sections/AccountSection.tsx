import styles from "./Section.module.css";
import { Input } from "../stories/input/Input";
import { LanguageDropdown } from "../components/LanguageDropdown";
import { Headline } from "../stories/headline/Headline";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";

export function AccountSection() {
	const { form, validation, saveStatus, handleInputChange } =
		useUserSettingsFormContext();
	return (
		<section id="account" className={styles.section}>
			<Headline>Account Information</Headline>
			<Input
				label="Username"
				type="text"
				name="username"
				value={form.username ?? ""}
				onChange={handleInputChange}
				disabled={saveStatus === "saving"}
				required
				errorMessage={validation.username}
			/>
			<Input
				label="Email Address"
				type="email"
				name="email"
				value={form.email ?? ""}
				onChange={handleInputChange}
				disabled={saveStatus === "saving"}
				required
				errorMessage={validation.email}
			/>
			<div className={styles.sectionSpacing}>
				<LanguageDropdown />
			</div>
		</section>
	);
}
