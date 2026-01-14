import { TrailLine } from "./TrailLine";
import { TrailPoint } from "./TrailPoint";

type TrailCanvasProps = {
    positions: { x: number; y: number }[];
    game: {
        lines: { from: number; to: number }[];
        prevPoint: number;
        handlePress: (index: number) => { status: string };
        errorIndex: number | null;
    };
};


export function TrailCanvas({ positions, game }: TrailCanvasProps) {
    return (
        <>
            {game.lines.map((l, idx) => (
                <TrailLine key={String(idx)} {...l} positions={positions} />
            ))}

            {positions.map((pos, idx) => (
                <TrailPoint
                    key={String(idx)}
                    index={idx}
                    position={pos}
                    total={positions.length}
                    active={idx <= game.prevPoint}
                    isError={idx === game.errorIndex}
                    onPress={() => game.handlePress(idx)}
                />
            ))}
        </>
    );
}
