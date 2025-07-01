import styles from "./Section.module.css";
import { Input } from "../components/input/Input";
import { Headline } from "../components/headline/Headline";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";
import Dropdown from "../components/dropdown/Dropdown";

const languageOptions = [
	{ value: "English", label: "English" },
	{ value: "German", label: "German" },
	{ value: "French", label: "French" },
];

export function AccountSection() {
	const {
		form,
		validation,
		saveStatus,
		handleInputChange,
		handleDropdownChange,
	} = useUserSettingsFormContext();
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
				<Dropdown
					options={languageOptions}
					value={form.language}
					onChange={handleDropdownChange}
					label="Select a Language"
					disabled={saveStatus === "saving"}
				/>
			</div>
		</section>
	);
}
