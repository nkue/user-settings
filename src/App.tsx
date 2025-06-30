import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { useUserSettingsForm } from "./hooks/useUserSettingsForm";

if (import.meta.env.DEV && typeof window !== "undefined") {
	import("./mocks/server").then(({ worker }) => worker.start());
}

export default function App() {
	const {
		form,
		commPrefs,
		accordionOpen,
		validation,
		saveStatus,
		isChanged,
		handleInputChange,
		handleDropdownChange,
		handleToggleChange,
		handleCheckboxGroupChange,
		handleReload,
		handleSubmit,
		success,
		error,
	} = useUserSettingsForm();

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "var(--color-bg)",
				color: "var(--color-text)",
				fontFamily: "var(--font-family)",
			}}
		>
			<Header onReload={handleReload} disabled={saveStatus === "saving"} />
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
				<MainContent
					form={{
						...form,
						username: form.username ?? "",
						email: form.email ?? "",
					}}
					commPrefs={commPrefs}
					accordionOpen={accordionOpen}
					validation={validation}
					saveStatus={saveStatus}
					isChanged={isChanged}
					onInputChange={handleInputChange}
					onDropdownChange={handleDropdownChange}
					onToggleChange={handleToggleChange}
					onCheckboxGroupChange={handleCheckboxGroupChange}
					onSave={handleSubmit}
					success={success}
					error={error}
				/>
			</main>
		</div>
	);
}
