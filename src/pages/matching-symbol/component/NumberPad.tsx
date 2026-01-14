import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    onPress: (value: string) => void;
    buttonSize?: number; // optional button size
    highlightedValue?: string;
    disabled?: boolean;
    isError?: boolean;
};

const NUMBER_LAYOUT = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", ""],
];

export function NumberPad({ onPress, buttonSize = 70, highlightedValue, disabled, isError }: Props) {
    return (
        <View style={[styles.container, isError && styles.error]}>
            {NUMBER_LAYOUT.map((row, rowIndex) => (
                <View key={String(rowIndex)} style={styles.row}>
                    {row.map((num, colIndex) => {
                        if (!num) {
                            return (
                                <View
                                    key={String(colIndex)}
                                    style={{ width: buttonSize, height: buttonSize, marginHorizontal: 8 }}
                                />
                            );
                        }

                        const isHighlighted = num === highlightedValue;
                        const isDisabled =
                            disabled || (highlightedValue && !isHighlighted);

                        return (
                            <TouchableOpacity
                                key={String(colIndex)}
                                style={[
                                    styles.button,
                                    { width: buttonSize, height: buttonSize },
                                    ...(isHighlighted ? [styles.highlightButton] : []),
                                    ...(isDisabled ? [styles.disabledButton] : []),
                                ]}
                                onPress={() => onPress(num)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>{num}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 40,
        marginVertical: 16,
        paddingVertical: 12,
        marginTop: 40,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 4,
    },
    button: {
        borderRadius: 90,
        backgroundColor: "#8735AC",
        marginHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    highlightButton: {
        backgroundColor: "#FE8E44",
        transform: [{ scale: 1.1 }],
    },
    disabledButton: {
        opacity: 0.3,
    },
    error: {
        borderColor: "#F12534",
        borderWidth: 2,
    }
});
