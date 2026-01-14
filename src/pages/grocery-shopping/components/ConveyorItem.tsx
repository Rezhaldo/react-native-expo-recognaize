import { CorrectCircleIcon, WrongCircleIcon } from "@/assets/icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    type ImageSourcePropType,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

type Result = "success" | "error" | null;

type ConveyorItemData = {
    id: string;
    src: ImageSourcePropType;
    group: number;
};

interface Props {
    item: {
        id: string;
        src: ImageSourcePropType;
        group: number;
    };
    onPress: (src: ImageSourcePropType) => boolean;
    onDrop: () => void;
    onFinish: () => void;
    duration?: number;
}

export function ConveyorItem({
    item,
    onPress,
    onDrop,
    onFinish,
    duration = 4000,
}: Props) {
    const translateX = useRef(new Animated.Value(-150)).current;
    const [result, setResult] = useState<Result>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 500,
            duration,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished && !result) {
                onDrop();
                onFinish();
            }
        });
    }, []);

    function handlePress() {
        if (result) return;

        const ok = onPress(item.src);
        setResult(ok ? "success" : "error");

        setTimeout(() => {
            onFinish();
        }, 600);
    }

    return (
        <Animated.View
            style={[
                styles.item,
                { transform: [{ translateX }] },
            ]}
        >
            <Pressable onPress={handlePress}>
                <Image source={item.src} style={styles.image} />
                {result && (
                    <View style={styles.overlay}>
                        {result === "success" ? (
                            <CorrectCircleIcon width={96} height={96} />
                        ) : (
                            <WrongCircleIcon width={96} height={96} />
                        )}
                    </View>
                )}
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    item: {
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -64 }],
    },
    image: {
        width: 128,
        height: 128,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    resultIcon: {
        width: 96,
        height: 96,
    },
});
