import styles from "./Headline.module.css";

interface HeadlineProps {
	children: React.ReactNode;
	level?: 2 | 3 | 4 | 5 | 6;
}

export function Headline({ children, level = 2 }: HeadlineProps) {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	return <Tag className={styles.headline}>{children}</Tag>;
}
