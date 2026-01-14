import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { FilledCircle } from "./TrailCircle";

type TrailPointProps = {
    index: number;
    onPress: (index: number) => void;
    active: boolean;
    position: { x: number; y: number };
    total: number;
    isError?: boolean;
};

export function TrailPoint({
    index,
    active,
    position,
    total,
    isError,
    onPress,
}: TrailPointProps) {
    const bg = useRef(new Animated.Value(0)).current;

    const isFilledCircle = index % 2 === 1;
    const number = Math.ceil((index + 1) / 2);
    const percent = (index + 1) / total;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <Animate red flash on wrong tap>
    useEffect(() => {
        if (!isError) return;

        Animated.sequence([
            Animated.timing(bg, {
                toValue: 1,
                duration: 120,
                useNativeDriver: false,
            }),
            Animated.timing(bg, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
            }),
        ]).start();
    }, [isError]);

    const backgroundColor = bg.interpolate({
        inputRange: [0, 1],
        outputRange: ["#FFFFFF", "#FDEDED"], // white → red flash
    });

    return (
        <Pressable onPress={() => onPress(index)} style={{ position: "absolute", left: position.x, top: position.y }}>
            <Animated.View
                style={[
                    styles.point,
                    {
                        backgroundColor,
                        opacity: active ? 0.6 : 1,
                    },
                    !isFilledCircle && {
                        borderWidth: 4,
                        borderColor: '#02865E',
                    },
                    isError && { borderColor: 'red' },
                ]}
            >
                {isFilledCircle ? (
                    <FilledCircle percent={percent} isError={isError} />
                ) : (
                    <Text style={[styles.text, isError && { color: 'red' }]}>{number}</Text>
                )}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    point: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    },
});
