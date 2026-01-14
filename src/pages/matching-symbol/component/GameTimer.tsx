import { Text } from "@/components";
import { TextStyle } from "@/shared";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

type Props = {
    duration: number; // seconds
    isRunning: boolean;
    onFinish?: () => void;
};

export function GameTimer({
    duration,
    isRunning,
    onFinish,
}: Props) {
    const textStyle = TextStyle();
    const [timeLeft, setTimeLeft] = useState(duration);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (!isRunning) return;

        setTimeLeft(duration);

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    onFinish?.();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, duration]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <View style={{ alignItems: "center", flexDirection: 'row' }}>
            <Image source={require("@/assets/icons/matching-symbol/timer-rounded.png")} style={{ width: 20, height: 20, marginRight: 4 }} />
            <Text font="plusJakartaBold" style={textStyle.small}>
                {minutes}:{seconds.toString().padStart(2, "0")}
            </Text>
        </View>
    );
}
