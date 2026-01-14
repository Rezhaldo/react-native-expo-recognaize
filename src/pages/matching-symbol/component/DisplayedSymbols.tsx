import { useEffect } from "react";
import { type ImageSourcePropType, StyleSheet } from "react-native";
import Animated, {
    type SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";

type Props = {
    activeEle: number;
    refreshKey: number;
    src: ImageSourcePropType | SharedValue<ImageSourcePropType | undefined> | undefined; // require(...)
    highlight?: boolean;
};

export function DisplayedSymbol({ activeEle, refreshKey, src, highlight }: Props) {
    const offset = useSharedValue(250);         // start right
    const size = useSharedValue(0.25);          // 25%
    const shake = useSharedValue(0);
    const shakeSlow = useSharedValue(0);


    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        offset.value = withSpring(0);
        size.value = withTiming(1, { duration: 250 });

        // simple shake animation (optional)
        shake.value = withSpring(1, { damping: 2, stiffness: 200 }, () => {
            shake.value = withTiming(0, { duration: 100 });
        });
    }, [activeEle, refreshKey]);

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value },
                { scale: highlight ? 1.15 : size.value },
                { rotate: `${shake.value * 8}deg` },
            ],
            opacity: highlight ? 1 : 0.85,
        };
    });

    return (
        <Animated.Image
            key={activeEle * 100 + refreshKey}
            source={src}
            style={[styles.image, style, highlight && styles.highlightItem,
            ]}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 120,
        alignSelf: "center",
        marginBottom: 20,
    },

    highlightItem: {
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 16,
        transform: [{ scale: 1.1 }],
    },
});
