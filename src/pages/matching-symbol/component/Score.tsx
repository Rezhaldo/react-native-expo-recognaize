import { Text } from "@/components";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

type ScoreProps = {
    score: number;
    style?: object;
};

export function Score({ score, style }: ScoreProps) {
    const prevScore = useRef(score);
    const translateY = useSharedValue(0);
    const colorValue = useSharedValue(0);

    const isIncrease = score > prevScore.current;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (score === prevScore.current) return;

        // Slide animation (up/down)
        translateY.value = isIncrease ? 15 : -15;
        translateY.value = withSpring(0, { damping: 12 });

        // Color animation (green or red back to black)
        colorValue.value = 1;
        colorValue.value = withTiming(0, { duration: 300 });

        prevScore.current = score;
    }, [score]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            color: interpolateColor(
                colorValue.value,
                [0, 1],
                ["#630092", isIncrease ? "#10B981" : "#EF4444"] // back to black
            ),
        };
    });

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label} font="plusJakartaBold">Score:</Text>
            <Animated.Text style={[styles.score, animatedStyle]}>
                {score}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        color: '#630092'
    },
    score: {
        marginLeft: 8,
        fontSize: 20,
        fontWeight: "700",
    },
});
