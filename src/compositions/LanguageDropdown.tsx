import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";
import Dropdown from "../components/dropdown/Dropdown";

const languageOptions = [
	{ value: "English", label: "English" },
	{ value: "German", label: "German" },
	{ value: "French", label: "French" },
];

export function LanguageDropdown() {
	const {
		handleDropdownChange,
		form: { language: value = "English" },
		saveStatus,
	} = useUserSettingsFormContext();
	return (
		<Dropdown
			options={languageOptions}
			value={value}
			onChange={handleDropdownChange}
			label="Select a Language"
			disabled={saveStatus === "saving"}
		/>
	);
}
