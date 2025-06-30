import React from "react";
import type { UserSettingsState } from "./useUserSettingsForm";

export const UserSettingFormContext = React.createContext<
	UserSettingsState | undefined
>(undefined);
export function useUserSettingsFormContext() {
	const context = React.useContext(UserSettingFormContext);
	if (!context) {
		throw new Error(
			"useUserSettingsFormContext must be used within a UserSettingsFormProvider"
		);
	}
	return context;
}
