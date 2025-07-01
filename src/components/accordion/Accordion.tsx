import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import classes from "./Accordion.module.css";

export interface AccordionItem {
	value: string;
	trigger: React.ReactNode;
	content: React.ReactNode;
}

export interface AccordionProps {
	items: AccordionItem[];
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	collapsible?: boolean;
	disabled?: boolean;
	className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
	items,
	type = "single",
	defaultValue,
	collapsible = true,
	disabled = false,
	className = "",
}) => {
	const rootProps =
		type === "single"
			? {
					type: "single" as const,
					defaultValue:
						typeof defaultValue === "string" ? defaultValue : undefined,
					collapsible,
			  }
			: {
					type: "multiple" as const,
					defaultValue: Array.isArray(defaultValue) ? defaultValue : undefined,
			  };

	return (
		<RadixAccordion.Root
			{...rootProps}
			className={[classes.root, className].join(" ")}
			data-disabled={disabled}
		>
			{items.map((item) => (
				<RadixAccordion.Item
					key={item.value}
					value={item.value}
					className={classes.item}
					data-disabled={disabled}
				>
					<RadixAccordion.Header className={classes.header}>
						<RadixAccordion.Trigger
							className={classes.trigger}
							disabled={disabled}
							aria-disabled={disabled}
						>
							{item.trigger}
							<span className={classes.chevron} aria-hidden>
								<svg width="16" height="16" viewBox="0 0 16 16">
									<path
										d="M4 6L8 10L12 6"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
									/>
								</svg>
							</span>
						</RadixAccordion.Trigger>
					</RadixAccordion.Header>
					<RadixAccordion.Content className={classes.content}>
						{item.content}
					</RadixAccordion.Content>
				</RadixAccordion.Item>
			))}
		</RadixAccordion.Root>
	);
};
