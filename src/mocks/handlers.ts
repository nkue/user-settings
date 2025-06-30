import { http, HttpResponse } from "msw";

interface UserSettings {
	username: string;
	email: string;
	isDarkModeEnabled: boolean;
	language: string;
	communicationPreferences: {
		newsletter: boolean;
		productUpdates: boolean;
	};
	[key: string]: unknown;
}

let userSettings: UserSettings = {
	username: "johndoe",
	email: "john@example.com",
	isDarkModeEnabled: false,
	language: "en",
	communicationPreferences: {
		newsletter: true,
		productUpdates: false,
	},
};

export const handlers = [
	http.get("/api/user/settings", () => {
		return HttpResponse.json(userSettings, { status: 200 });
	}),

	http.post("/api/user/settings", async ({ request }) => {
		const data = ((await request.json()) ?? {}) as Partial<UserSettings>;

		if (data.username === "erroruser") {
			return HttpResponse.json(
				{ message: "Internal Server Error: Invalid username" },
				{ status: 500 }
			);
		}

		userSettings = { ...userSettings, ...data };

		return HttpResponse.json(
			{
				message: "Settings updated successfully",
				settings: userSettings,
			},
			{ status: 200 }
		);
	}),
];
