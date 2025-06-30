export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(
	form: { username?: string; email?: string },
	touched: { [key: string]: boolean }
) {
	const v: { username?: string; email?: string } = {};
	if (touched.username && !form.username) v.username = "Username is required";
	if (touched.email && !form.email) v.email = "Email is required";
	else if (touched.email && form.email && !emailRegex.test(form.email))
		v.email = "Invalid email format";
	return v;
}
