import { LinearGradient } from "expo-linear-gradient";
import type React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
    progress: number; // 0–100
    color?: string;
    backgroundColor?: string;
    height?: number;
    width?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = "#FF0000",
    backgroundColor = "#E4E4E7",
    height = 12,
    width = 300,
}) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <View
            style={[
                styles.container,
                { backgroundColor, height, width },
            ]}
        >
            <View style={{ width: `${clampedProgress}%` }}>
                <LinearGradient
                    colors={[`${color}88`, color]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.bar, { height }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    bar: {
        borderRadius: 999,
    },
});
