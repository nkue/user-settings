import type { CommPrefs } from "../types";

export interface UserSettings {
	username?: string;
	email?: string;
	isDarkModeEnabled: boolean;
	language: string;
	communicationPreferences: CommPrefs;
}

export async function fetchUserSettings(): Promise<UserSettings> {
	const res = await fetch("/api/user/settings");
	if (!res.ok) throw new Error("Failed to fetch user settings");
	return res.json();
}

export async function saveUserSettings(
	settings: Partial<UserSettings>
): Promise<UserSettings> {
	const res = await fetch("/api/user/settings", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(settings),
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || "Failed to save settings");
	}
	const data = await res.json();
	return data.settings ?? data;
}
