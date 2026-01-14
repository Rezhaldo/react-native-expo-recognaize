import type React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface HeartProps {
    filled?: boolean;
    size?: number;
}

export const Heart: React.FC<HeartProps> = ({
    filled = false,
    size = 24,
}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={styles.shadow}
        >
            <Path
                d="M12.5 21.35L11.05 20.03C5.9 15.36 2.5 12.27 2.5 8.5C2.5 5.41 4.92 3 8 3C9.74 3 11.41 3.81 12.5 5.08C13.59 3.81 15.26 3 17 3C20.08 3 22.5 5.41 22.5 8.5C22.5 12.27 19.1 15.36 13.95 20.03L12.5 21.35Z"
                fill={filled ? "url(#heartGradient)" : "#FFFFFF"}
            />
            <Defs>
                <LinearGradient
                    id="heartGradient"
                    x1="12.5"
                    y1="3"
                    x2="12.5"
                    y2="21"
                >
                    <Stop offset="0" stopColor="#FF0000" />
                    <Stop offset="1" stopColor="#990000" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

const styles = StyleSheet.create({
    shadow: {
        elevation: 3, // Android
        shadowColor: "#000", // iOS
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
});
