import { useState, useEffect, useMemo } from "react";
import {
	fetchUserSettings,
	saveUserSettings,
	type UserSettings,
} from "../api/userSettings";
import { normalizeCommPrefs } from "../utils/normalizeUserSettings";
import { validateForm } from "../utils/validation";
import type { CommPrefs, Validation } from "../types";

export type UserSettingsState = {
	form: UserSettings;
	commPrefs: CommPrefs;
	accordionOpen: string;
	validation: Validation;
	saveStatus: "idle" | "saving" | "success" | "error";
	isChanged: boolean;
	isValid: boolean;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleDropdownChange: (value: string) => void;
	handleToggleChange: (name: string, checked: boolean) => void;
	handleCheckboxGroupChange: (name: keyof CommPrefs, checked: boolean) => void;
	handleReload: () => Promise<void>;
	handleSubmit: (e?: React.FormEvent) => Promise<void>;
	success: string | null;
	error: string | null;
};

const fallbackUserSettings: UserSettings = {
	isDarkModeEnabled: true,
	isNotificationsEnabled: true,
	language: "en",
	communicationPreferences: {
		newsletter: false,
		promotions: false,
		productUpdates: false,
	},
};

export function useUserSettingsForm(): UserSettingsState {
	const [form, setForm] = useState(fallbackUserSettings);
	const [initialForm, setInitialForm] = useState(fallbackUserSettings);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");
	const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
	const [accordionOpen] = useState<string>("data-usage");
	const [validation, setValidation] = useState<Validation>({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchUserSettings();
				const commPrefs = normalizeCommPrefs(data.communicationPreferences);
				setForm({ ...data, communicationPreferences: commPrefs });
				setInitialForm({ ...data, communicationPreferences: commPrefs });
			} catch (e: unknown) {
				setError(e instanceof Error ? e.message : "An unknown error occurred");
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		setValidation(validateForm(form, touched));
	}, [form, touched]);

	const isValid = useMemo(() => {
		return Object.values(validation).filter((value) => value).length === 0;
	}, [validation]);

	const isChanged = useMemo(() => {
		return JSON.stringify(form) !== JSON.stringify(initialForm);
	}, [form, initialForm]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setTouched((prev) => ({ ...prev, [name]: true }));
	};

	const handleDropdownChange = (value: string) => {
		setForm((prev) => ({ ...prev, language: value }));
	};

	const handleToggleChange = (name: string, checked: boolean) => {
		setForm((prev) => ({ ...prev, [name]: checked }));
	};

	const handleCheckboxGroupChange = (
		name: keyof CommPrefs,
		checked: boolean
	) => {
		setForm((prev) => {
			const prevPrefs = normalizeCommPrefs(
				prev.communicationPreferences,
				prev.communicationPreferences
			);
			return {
				...prev,
				communicationPreferences: {
					...prevPrefs,
					[name]: checked,
				},
			};
		});
	};

	const handleReload = async () => {
		setError(null);
		setSuccess(null);
		try {
			const data = await fetchUserSettings();
			const commPrefs = normalizeCommPrefs(data.communicationPreferences);
			setForm({ ...data, communicationPreferences: commPrefs });
			setInitialForm({ ...data, communicationPreferences: commPrefs });
			setTouched({});
			setValidation({});
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "An unknown error occurred");
		}
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setSaveStatus("saving");
		setError(null);
		setSuccess(null);
		try {
			const updated = await saveUserSettings(form);
			const commPrefs = normalizeCommPrefs(
				updated.communicationPreferences,
				form.communicationPreferences
			);
			setForm({ ...updated, communicationPreferences: commPrefs });
			setInitialForm({ ...updated, communicationPreferences: commPrefs });
			setSaveStatus("success");
			setSuccess("Settings saved!");
			setTimeout(() => setSuccess(null), 2000);
		} catch (e: unknown) {
			setSaveStatus("error");
			setError(e instanceof Error ? e.message : "Error saving settings.");
			setTimeout(() => setError(null), 3000);
		}
	};

	const commPrefs = normalizeCommPrefs(
		form.communicationPreferences,
		form.communicationPreferences
	);

	return {
		form,
		commPrefs,
		accordionOpen,
		validation,
		saveStatus,
		isChanged,
		isValid,
		handleInputChange,
		handleDropdownChange,
		handleToggleChange,
		handleCheckboxGroupChange,
		handleReload,
		handleSubmit,
		success,
		error,
	};
}
