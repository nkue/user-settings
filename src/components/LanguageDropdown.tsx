import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";
import Dropdown from "../stories/dropdown/Dropdown";

const languageOptions = [
	{ value: "option1", label: "Option 1" },
	{ value: "option2", label: "Option 2" },
	{ value: "option3", label: "Option 3" },
];

export function LanguageDropdown() {
	const {
		handleDropdownChange,
		form: { language: value = "option1" },
		saveStatus,
	} = useUserSettingsFormContext();
	return (
		<Dropdown
			options={languageOptions}
			value={value}
			onChange={handleDropdownChange}
			label="Select an Option"
			disabled={saveStatus === "saving"}
		/>
	);
}
