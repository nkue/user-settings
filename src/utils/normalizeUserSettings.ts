import type { UserSettings } from "../api/userSettings";
import type { CommPrefs } from "../types";

export function normalizeCommPrefs(
	commPrefs: Partial<UserSettings["communicationPreferences"]> = {},
	extra: Partial<CommPrefs> = {}
): CommPrefs {
	return {
		newsletter: !!commPrefs.newsletter,
		productUpdates: !!commPrefs.productUpdates,
		promotions: !!extra.promotions,
	};
}
