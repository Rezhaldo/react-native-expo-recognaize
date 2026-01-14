import { useCallback, useEffect, useState } from "react";

type TrailGameHook = {
	pointCount: number;
	positions: { x: number; y: number }[];
	onSuccess: () => void;
	onError: () => void;
	onComplete: () => void;
};

export function useTrailGame({
	pointCount,
	positions,
	onComplete,
	onError,
	onSuccess,
}: TrailGameHook) {
	const [prevPoint, setPrevPoint] = useState(-1);
	const [lines, setLines] = useState<{ from: number; to: number }[]>([]);
	const [errorIndex, setErrorIndex] = useState<number | null>(null);

	const handlePress = useCallback(
		(pointIndex: number) => {
			if (pointIndex !== prevPoint + 1) {
				onError();
				setErrorIndex(pointIndex);
				return { status: "error" };
			}

			onSuccess();

			if (prevPoint >= 0) {
				setLines((lines) => [...lines, { from: prevPoint, to: pointIndex }]);
			}

			setPrevPoint(pointIndex);
			return { status: "success" };
		},
		[onError, onSuccess, prevPoint],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (prevPoint === pointCount - 1) {
			onComplete();
		}
	}, [prevPoint]);

	useEffect(() => {
		if (errorIndex === null) return;

		const t = setTimeout(() => setErrorIndex(null), 300);
		return () => clearTimeout(t);
	}, [errorIndex]);

	return {
		prevPoint,
		lines,
		errorIndex,
		handlePress,
	};
}
