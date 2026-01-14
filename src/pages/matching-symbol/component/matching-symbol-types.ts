export type DemoStep = {
	target?: "symbol" | "list" | "keypad" | "conveyor";
	text: string;
	allowInteraction?: boolean;
};
