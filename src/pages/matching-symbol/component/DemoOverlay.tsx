import { Text } from "@/components";
import { Pressable, StyleSheet, View } from "react-native";

export type DemoOverlayPlacement = "top" | "center" | "bottom";

export type DemoOverlayProps = {
    text: string;
    onNext?: () => void;
    onPrevious?: () => void;
    placement: DemoOverlayPlacement
    isPrevious?: boolean;
    isNextBlocked?: boolean;
};
export function DemoOverlay({ text, onNext, onPrevious, placement, isPrevious, isNextBlocked }: DemoOverlayProps) {
    return (
        <View style={[styles.container, styles[placement]]}>
            <Text style={styles.text}>{text}</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
                {isPrevious && onPrevious && <Pressable onPress={onPrevious} style={styles.buttonPrev}>
                    <Text style={[styles.buttonText, { color: "#8735AC" }]}>Previous</Text>
                </Pressable>}
                {onNext && !isNextBlocked && <Pressable onPress={onNext} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 180, // 👈 roughly below DisplayedSymbol
        zIndex: 100,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        width: "80%",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        marginBottom: 12,
    },
    button: {
        flex: 1,
        backgroundColor: "#8735AC",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 12,
    },
    buttonPrev: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#8735AC",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
    },

    container: {
        position: "absolute",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "white",
        maxWidth: "85%",
    },

    top: {
        top: "20%",
        alignSelf: "center",
    },

    center: {
        top: "48%",
        alignSelf: "center",
    },

    bottom: {
        top: "38%",
        alignSelf: "center",
    },
});
