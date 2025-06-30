import styles from "./Section.module.css";
import { UserInput } from "./UserInput";
import { LanguageDropdown } from "./LanguageDropdown";
import { Headline } from "./Headline";

interface AccountForm {
	username?: string;
	email?: string;
	language?: string;
}

interface AccountSectionProps {
	form: AccountForm;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDropdownChange: (value: string) => void;
	disabled: boolean;
	validation: { username?: string; email?: string };
}

export function AccountSection({
	form,
	onInputChange,
	onDropdownChange,
	disabled,
	validation,
}: AccountSectionProps) {
	return (
		<section id="account" className={styles.section}>
			<Headline>Account Information</Headline>
			<UserInput
				label="Username"
				type="text"
				name="username"
				value={form.username ?? ""}
				onChange={onInputChange}
				disabled={disabled}
				required
				errorMessage={validation.username}
			/>
			<UserInput
				label="Email Address"
				type="email"
				name="email"
				value={form.email ?? ""}
				onChange={onInputChange}
				disabled={disabled}
				required
				errorMessage={validation.email}
			/>
			<div className={styles.sectionSpacing}>
				<LanguageDropdown
					value={form.language ?? "option1"}
					onChange={onDropdownChange}
					disabled={disabled}
				/>
			</div>
		</section>
	);
}
