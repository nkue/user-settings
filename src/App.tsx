import "./App.css";
import { Header } from "./sections/Header";
import { Sidebar } from "./sections/Sidebar";
import { MainContent } from "./sections/MainContent";
import { UserSettingsFormContextWrapper } from "./hooks/UserSettingsFormProvider";

export default function App() {
	return (
		<UserSettingsFormContextWrapper>
			<div
				style={{
					minHeight: "100vh",
					background: "var(--color-bg)",
					color: "var(--color-text)",
					fontFamily: "var(--font-family)",
				}}
			>
				<Header />
				<main
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "var(--space-xl)",
						padding: "var(--space-xl)",
						justifyContent: "center",
					}}
				>
					<Sidebar />
					<MainContent />
				</main>
			</div>
		</UserSettingsFormContextWrapper>
	);
}
