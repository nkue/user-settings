import "./App.css";
import { useState } from "react";
import { Button } from "./stories/button/Button";
import { LanguageDropdown } from "./components/LanguageDropdown";
import { SaveLanguageButton } from "./components/SaveLanguageButton";
import {
	fetchUserSettings,
	saveUserSettings,
	type UserSettings,
} from "./api/userSettings";

if (import.meta.env.DEV && typeof window !== "undefined") {
	import("./mocks/server").then(({ worker }) => worker.start());
}

function App() {
	const [selectedOption, setSelectedOption] = useState("option1");
	const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	// Fetch user settings from API and display them
	const onButtonClick = async () => {
		setError(null);
		try {
			const data = await fetchUserSettings();
			setUserSettings(data);
		} catch (e: unknown) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	// Save dropdown selection to user settings
	const onSaveLanguage = async () => {
		setSaveStatus("saving");
		setError(null);
		try {
			const updated = await saveUserSettings({
				...userSettings,
				language: selectedOption,
			});
			setUserSettings(updated);
			setSaveStatus("success");
		} catch (e: unknown) {
			setSaveStatus("error");
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<>
			<div className="card">
				<Button
					buttonStyle="primary"
					size="large"
					label="Fetch User Settings"
					onClick={onButtonClick}
					disabled={false}
				/>
				<Button
					buttonStyle="toggle"
					size="medium"
					label=""
					ariaLabel="Toggle Button"
					disabled={false}
				/>
			</div>
			<LanguageDropdown value={selectedOption} onChange={setSelectedOption} />
			<SaveLanguageButton
				onClick={onSaveLanguage}
				disabled={!userSettings || saveStatus === "saving"}
				status={saveStatus}
			/>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{userSettings && (
				<div>
					<h3>User Settings</h3>
					<pre>{JSON.stringify(userSettings, null, 2)}</pre>
				</div>
			)}
		</>
	);
}

export default App;
