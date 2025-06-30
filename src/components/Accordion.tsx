import {
	Accordion as StoryAccordion,
	type AccordionItem,
} from "../stories/accordion/Accordion";

export interface AccordionProps {
	items: AccordionItem[];
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	collapsible?: boolean;
	disabled?: boolean;
	className?: string;
}

export function Accordion(props: AccordionProps) {
	return <StoryAccordion {...props} />;
}
