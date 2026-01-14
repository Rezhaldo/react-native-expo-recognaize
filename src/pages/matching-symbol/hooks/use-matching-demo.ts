import { useState } from "react";
import type { MatchingDemoStep } from "../component/demoSteps";

export function useMatchingDemo(steps: MatchingDemoStep[]) {
	const [stepIndex, setStepIndex] = useState(0);
	const [successCount, setSuccessCount] = useState(0);
	const [freePlaySuccessCount, setFreePlaySuccessCount] = useState(0);

	const step = steps[stepIndex];

	const next = () => {
		setFreePlaySuccessCount(0);
		setStepIndex((i) => Math.min(i + 1, steps.length - 1));
	};

	const prev = () => {
		setSuccessCount(0);
		setStepIndex((i) => Math.max(i - 1, 0));
	};

	const registerFreePlaySuccess = () => {
		if (step?.type !== "free-play") return;

		const nextCount = freePlaySuccessCount + 1;
		setFreePlaySuccessCount(nextCount);

		if (nextCount >= step.rounds) {
			next(); // ✅ AFTER 3 correct answers → reminder
		}
	};

	return {
		step,
		isDemoFinished: step?.type === "end",
		next,
		prev,
		registerFreePlaySuccess,
	};
}
