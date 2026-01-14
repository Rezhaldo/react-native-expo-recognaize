import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { matchingSymbolAssets } from "../component/utils";

export const IconList = Object.keys(matchingSymbolAssets);

type Props = {
    randomList: number[];
    highlightIndex?: number;
};

export function SymbolsList({ randomList, highlightIndex }: Props) {
    return (
        <View style={styles.container}>
            {Array.from({ length: 10 }).map((_, idx) => {
                const iconKey = IconList[randomList[idx]];
                const isHighlighted = idx === highlightIndex;
                const isDisabled =
                    (highlightIndex !== undefined && !isHighlighted);

                return (
                    <View
                        key={String(idx)}
                        style={[
                            styles.item,
                            isHighlighted && styles.highlightItem,
                            ...(isDisabled ? [styles.disabledButton] : []),

                        ]}
                    >
                        <Text style={styles.indexText}>{idx}</Text>

                        <Animated.Image
                            source={matchingSymbolAssets[iconKey as keyof typeof matchingSymbolAssets]}
                            style={[
                                styles.icon,
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                );
            })}
        </View>
    );
}

export function randomNumbersArr(length: number, max: number, min = 0) {
    const nums = [];

    for (let i = min; i <= max; i++) nums.push(i);

    nums.sort(() => 0.5 - Math.random());

    return nums.slice(0, length);
}


export function genRandomIconList(tiles: number, firstLoad: boolean) {
    if (firstLoad) {
        return [...Array(tiles)].map((_, idx) => idx);
    }
    return randomNumbersArr(tiles, tiles - 1);
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING_H = 16;
const GAP = 12;
const NUM_COLS = 6;

const TILE_SIZE =
    (SCREEN_WIDTH - PADDING_H * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: PADDING_H,
        paddingVertical: 12,
        borderRadius: 40,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GAP,
        backgroundColor: "rgba(255,255,255,0.3)",
        paddingLeft: 28
    },

    item: {
        width: TILE_SIZE,
        alignItems: "center",
    },

    indexText: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 30,
        textAlign: "center",
    },

    icon: {
        width: TILE_SIZE * 0.6,
        height: TILE_SIZE * 0.6,
        marginTop: 4,
    },

    highlightItem: {
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 16,
        transform: [{ scale: 1.1 }],
    },

    disabledButton: {
        opacity: 0.3,
    },
});