import "./App.module.css";
import { Header } from "./sections/Header";
import { Sidebar } from "./sections/Sidebar";
import { MainContent } from "./sections/MainContent";
import { UserSettingsFormContextWrapper } from "./hooks/UserSettingsFormProvider";
import classes from "./App.module.css";

export default function App() {
	return (
		<UserSettingsFormContextWrapper>
			<div className={classes.appContainer}>
				<Header />
				<main className={classes.mainContent}>
					<Sidebar />
					<MainContent />
				</main>
			</div>
		</UserSettingsFormContextWrapper>
	);
}
