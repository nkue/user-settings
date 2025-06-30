import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "./stories/button/Button";
import { LanguageDropdown } from "./components/LanguageDropdown";
import { SaveLanguageButton } from "./components/SaveLanguageButton";
import {
	fetchUserSettings,
	saveUserSettings,
	type UserSettings,
} from "./api/userSettings";
import { UserInput } from "./components/UserInput";
import { Accordion } from "./components/Accordion";

if (import.meta.env.DEV && typeof window !== "undefined") {
	import("./mocks/server").then(({ worker }) => worker.start());
}

function App() {
	const [form, setForm] = useState<Partial<UserSettings>>({});
	const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	// Fetch user settings on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchUserSettings();
				setUserSettings(data);
				setForm(data);
			} catch (e: unknown) {
				setError(e instanceof Error ? e.message : "An unknown error occurred");
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement;
		const { name, value, type } = target;
		const checked =
			type === "checkbox" && "checked" in target
				? (target as HTMLInputElement).checked
				: undefined;

		if (name.startsWith("communicationPreferences.")) {
			const prefKey = name.split(
				"."
			)[1] as keyof UserSettings["communicationPreferences"];
			setForm((prev) => {
				const prevPrefs = prev.communicationPreferences ?? {
					newsletter: false,
					productUpdates: false,
				};
				return {
					...prev,
					communicationPreferences: {
						newsletter:
							typeof prevPrefs.newsletter === "boolean"
								? prevPrefs.newsletter
								: false,
						productUpdates:
							typeof prevPrefs.productUpdates === "boolean"
								? prevPrefs.productUpdates
								: false,
						[prefKey]: type === "checkbox" ? !!checked : value,
					},
				};
			});
		} else if (type === "checkbox") {
			setForm((prev) => ({ ...prev, [name]: !!checked }));
		} else {
			handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
		}
	};

	const handleLanguageChange = (value: string) => {
		setForm((prev) => ({ ...prev, language: value }));
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setSaveStatus("saving");
		setError(null);
		try {
			const updated = await saveUserSettings(form);
			setUserSettings(updated);
			setForm(updated);
			setSaveStatus("success");
		} catch (e: unknown) {
			setSaveStatus("error");
			setError(e instanceof Error ? e.message : "An unknown error occurred");
		}
	};

	return (
		<>
			<form
				className="card"
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: 16 }}
			>
				<Button
					buttonStyle="primary"
					size="large"
					label="Reload User Settings"
					onClick={async () => {
						setError(null);
						try {
							const data = await fetchUserSettings();
							setUserSettings(data);
							setForm(data);
						} catch (e: unknown) {
							setError(
								e instanceof Error ? e.message : "An unknown error occurred"
							);
						}
					}}
					disabled={saveStatus === "saving"}
				/>
				<UserInput
					label="Username:"
					type="text"
					name="username"
					value={form.username ?? ""}
					onChange={handleInputChange}
					disabled={saveStatus === "saving"}
				/>
				<UserInput
					label="Email:"
					type="email"
					name="email"
					value={form.email ?? ""}
					onChange={handleInputChange}
					disabled={saveStatus === "saving"}
				/>
				<Accordion
					items={[
						{
							value: "preferences",
							trigger: "Preferences",
							content: (
								<>
									<label>
										Enable Dark Mode:
										<input
											type="checkbox"
											name="isDarkModeEnabled"
											checked={!!form.isDarkModeEnabled}
											onChange={handleChange}
											disabled={saveStatus === "saving"}
										/>
									</label>
									<LanguageDropdown
										value={form.language ?? "option1"}
										onChange={handleLanguageChange}
										disabled={saveStatus === "saving"}
									/>
								</>
							),
						},
						{
							value: "communication",
							trigger: "Communication Preferences",
							content: (
								<fieldset style={{ border: "none", padding: 0 }}>
									<legend style={{ display: "none" }}>
										Communication Preferences
									</legend>
									<label>
										Newsletter:
										<input
											type="checkbox"
											name="communicationPreferences.newsletter"
											checked={
												!!(
													form.communicationPreferences &&
													form.communicationPreferences.newsletter
												)
											}
											onChange={handleChange}
											disabled={saveStatus === "saving"}
										/>
									</label>
									<label>
										Product Updates:
										<input
											type="checkbox"
											name="communicationPreferences.productUpdates"
											checked={
												!!(
													form.communicationPreferences &&
													form.communicationPreferences.productUpdates
												)
											}
											onChange={handleChange}
											disabled={saveStatus === "saving"}
										/>
									</label>
								</fieldset>
							),
						},
					]}
					type="single"
					collapsible
				/>
				<SaveLanguageButton
					onClick={() => handleSubmit()}
					disabled={saveStatus === "saving"}
					status={saveStatus}
				/>
				<button
					className="storybook-button storybook-button--primary storybook-button--medium"
					type="submit"
					disabled={saveStatus === "saving"}
				>
					Submit Changes
				</button>
				{error && <div style={{ color: "red" }}>{error}</div>}
			</form>
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
