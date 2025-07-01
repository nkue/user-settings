import styles from "./Sidebar.module.css";

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<nav>
				<ul className={styles.navList}>
					<li>
						<a href="#account" className={styles.link}>
							Account Information
						</a>
					</li>
					<li>
						<a href="#general" className={styles.link}>
							General Settings
						</a>
					</li>
					<li>
						<a href="#privacy" className={styles.link}>
							Privacy Settings
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
