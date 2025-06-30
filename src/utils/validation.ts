export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUsername = (username?: string) => {
	if (!username) {
		return "Username is required";
	}
};

const validateEmail = (email?: string) => {
	if (!email) {
		return "Email is required";
	}
	if (!emailRegex.test(email)) {
		return "Invalid email format";
	}
};

export function validateForm(
	form: { username?: string; email?: string },
	touched: { [key: string]: boolean }
) {
	const validations: { username?: string; email?: string } = {};
	if (touched.username) {
		validations.username = validateUsername(form.username);
	}
	if (touched.email) {
		validations.email = validateEmail(form.email);
	}
	return validations;
}
