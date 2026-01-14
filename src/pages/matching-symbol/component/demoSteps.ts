export type MatchingDemoStep =
	| {
			type: "focus-main-symbol";
			duration?: number; // ms, auto next
	  }
	| {
			type: "focus-symbol";
			index: number;
			duration?: number;
	  }
	| {
			type: "press-number";
			value: string; // waits for correct input
	  }
	| {
			type: "reminder";
			rounds: number; // number of correct inputs
	  }
	| {
			type: "user-confirmation";
			rounds: number; // number of correct inputs
	  }
	| {
			type: "free-play";
			rounds: number; // number of correct inputs
	  }
	| {
			type: "end";
			rounds: number; // number of correct inputs
	  };

export const matchingSymbolDemoSteps: MatchingDemoStep[] = [
	{
		type: "focus-main-symbol",
		duration: 1200,
	},
	{
		type: "focus-symbol",
		index: 2,
		duration: 1200,
	},
	{
		type: "press-number",
		value: "6",
	},

	{
		type: "reminder",
		rounds: 5,
	},
	{
		type: "user-confirmation",
		rounds: 6,
	},
	{
		type: "free-play",
		rounds: 3,
	},
	{
		type: "end",
		rounds: 7,
	},
];
