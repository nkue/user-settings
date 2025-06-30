import React from "react";
import { UserSettingFormContext } from "./useUserSettingsFormContext";
import { useUserSettingsForm } from "./useUserSettingsForm";

export const UserSettingsFormContextWrapper = (
	props: React.PropsWithChildren
) => {
	const state = useUserSettingsForm();
	return (
		<UserSettingFormContext.Provider value={state}>
			{props.children}
		</UserSettingFormContext.Provider>
	);
};
