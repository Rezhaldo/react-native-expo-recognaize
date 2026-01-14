import React from "react";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

interface HomeButtonProps {
    title: string;
    icon: any; // PNG require() or SVG JSX
    onPress?: () => void;
}

export const HomeButton: React.FC<HomeButtonProps> = ({ title, icon, onPress }) => {
    const { width } = useWindowDimensions();

    const maxWidth =
        width >= 1440 ? 800 :
            width >= 1024 ? 600 :
                width >= 768 ? 480 :
                    336;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { maxWidth, opacity: pressed ? 0.9 : 1 }
            ]}
        >
            <Text style={styles.title}>{title}</Text>

            {/** 🔥 If icon is JSX (SVG), render it directly */}
            {React.isValidElement(icon) ? (
                icon
            ) : (
                /** 🔥 If icon is PNG (require), render with RN Image */
                <Image
                    source={icon}
                    style={styles.icon}
                    resizeMode="contain"
                />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 51,
        paddingHorizontal: 28,
        borderRadius: 9999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: "500",
        color: "#3A3A3A",
    },

    icon: {
        width: 24,
        height: 24,
    },
});
