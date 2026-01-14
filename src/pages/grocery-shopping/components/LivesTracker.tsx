import type React from "react";
import { StyleSheet, View } from "react-native";
import { Heart } from "./HeartIcon";

export interface LivesTrackerProps {
    lives: number;
    avlLives: number;
    size?: number;
}

export const LivesTracker: React.FC<LivesTrackerProps> = ({
    lives,
    avlLives,
    size = 24,
}) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: lives }).map((_, index) => (
                <Heart
                    key={String(index)}
                    size={size}
                    filled={index < avlLives}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8, // RN ≥ 0.71
    },
});
