import React, { memo, useMemo } from "react";
import Svg, { Defs, G, Path, RadialGradient, Stop } from "react-native-svg";

interface Props {
    percent: number; // 0 → 1
    size?: number;
    isError?: boolean;
}

function draw(alpha: number) {
    if (alpha === 2) {
        return "M 0 0 v -18 A 18 18 1 1 1 -0.0001 -18 z";
    }

    const r = alpha * Math.PI;
    const x = Math.sin(r) * 18;
    const y = Math.cos(r) * -18;
    const mid = alpha > 1 ? 1 : 0;

    return `M 0 0 v -18 A 18 18 1 ${mid} 1 ${x} ${y} z`;
}

export const FilledCircle = memo(({ percent, size = 52, isError }: Props) => {
    const id = useMemo(() => `circle-gradient-${Math.random()}`, []);

    // Override gradient colors if error
    const startColor = isError ? "#CF5B5B" : "#5BCFAC";
    const endColor = isError ? "#860202" : "#02865E";

    return (
        <Svg width={size} height={size} viewBox="0 0 36 36">
            <Defs>
                <RadialGradient
                    id={id}
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(-180) scale(20.75)"
                >
                    <Stop offset="0" stopColor={startColor} />
                    <Stop offset="1" stopColor={endColor} />
                </RadialGradient>
            </Defs>

            <G transform="translate(18, 18)">
                {/* background circle */}
                <Path
                    d="M 0 0 v -18 A 18 18 1 1 1 -0.0001 -18 z"
                    fill="#ffffff77"
                />

                {/* progress circle */}
                <Path d={draw(percent * 2)} fill={`url(#${id})`} />
            </G>
        </Svg>
    );
});
