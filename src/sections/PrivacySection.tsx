import styles from "./Section.module.css";
import { Accordion } from "../components/Accordion";
import { Checkbox } from "../stories/checkbox/Checkbox";
import { Headline } from "../components/Headline";
import { useUserSettingsFormContext } from "../hooks/useUserSettingsFormContext";

type CommPrefs = {
	newsletter: boolean;
	promotions: boolean;
	productUpdates: boolean;
};

const checkboxOptions = [
	{ name: "newsletter", label: "Newsletter" },
	{ name: "promotions", label: "Promotions" },
	{ name: "productUpdates", label: "Product Updates" },
];

export function PrivacySection() {
	const { commPrefs, accordionOpen, handleCheckboxGroupChange } =
		useUserSettingsFormContext();
	return (
		<section id="privacy" className={styles.section}>
			<Headline>Privacy Settings</Headline>
			<Accordion
				items={[
					{
						value: "data-usage",
						trigger: "Data Usage Policy",
						content: (
							<div>
								<p>
									We use your data to improve your experience. You can read more
									about our data usage policy in our documentation.
								</p>
							</div>
						),
					},
					{
						value: "third-party",
						trigger: "Third-Party Access",
						content: (
							<div>
								<p>
									You can control which third-party services have access to your
									account. Manage your integrations here.
								</p>
							</div>
						),
					},
					{
						value: "gdpr",
						trigger: "GDPR Compliance",
						content: (
							<div>
								<p>
									We are committed to GDPR compliance. You can request your data
									or account deletion at any time.
								</p>
								<fieldset className={styles.sectionSpacing}>
									<legend className={styles.checkboxGroupLabel}>
										Communication Preferences
									</legend>
									<div className={styles.checkboxGroup}>
										{checkboxOptions.map((opt) => (
											<Checkbox
												key={opt.name}
												label={opt.label}
												checked={commPrefs[opt.name as keyof CommPrefs]}
												onChange={(e) =>
													handleCheckboxGroupChange(
														opt.name as keyof CommPrefs,
														e.target.checked
													)
												}
											/>
										))}
									</div>
								</fieldset>
							</div>
						),
					},
				]}
				type="single"
				collapsible
				defaultValue={accordionOpen}
			/>
		</section>
	);
}
