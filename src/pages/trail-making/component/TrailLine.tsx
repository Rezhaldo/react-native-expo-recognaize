import Svg, { Line } from "react-native-svg";

type TrailLineProps = {
    from: number;
    to: number;
    positions: { x: number; y: number }[];
};

const RADIUS = 26;

export function TrailLine({ from, to, positions }: TrailLineProps) {
    const start = positions[from];
    const end = positions[to];

    const x1 = start.x + RADIUS;
    const y1 = start.y + RADIUS;
    const x2 = end.x + RADIUS;
    const y2 = end.y + RADIUS;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return null;

    const offsetX = (dx / distance) * RADIUS;
    const offsetY = (dy / distance) * RADIUS;

    return (
        <Svg
            pointerEvents="none"
            style={{ position: "absolute", left: 0, top: 0 }}
            width="100%"
            height="100%"
        >
            <Line
                x1={x1 + offsetX}
                y1={y1 + offsetY}
                x2={x2 - offsetX}
                y2={y2 - offsetY}
                stroke="#02865E"
                strokeWidth={6}
                strokeLinecap="round"
            />
        </Svg>
    );
}
