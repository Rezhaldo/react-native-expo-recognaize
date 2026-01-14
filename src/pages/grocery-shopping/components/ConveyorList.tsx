import * as Crypto from "expo-crypto";
import React, { useEffect, useState, } from "react";
import { type ImageSourcePropType, StyleSheet, View } from "react-native";
import { ConveyorItem } from "./ConveyorItem";

interface Props {
    shoppingListGroup: ImageSourcePropType[][];
    onItemClick: (src: ImageSourcePropType) => boolean;
    onItemDrop: (src: ImageSourcePropType) => boolean;
}


type ConveyorItemData = {
    id: string;
    src: ImageSourcePropType;
    group: number;
};

const SPEED = 5500; // ✅ steady speed (ms)

export function Conveyor({
    shoppingListGroup,
    onItemClick,
    onItemDrop,
}: Props) {
    const [queue, setQueue] = useState<ConveyorItemData[]>([]);
    const [current, setCurrent] = useState<ConveyorItemData | null>(null);

    // pick random item from a group
    const createItem = (group: number): ConveyorItemData => {
        const items = shoppingListGroup[group];
        const src = items[Math.floor(Math.random() * items.length)];

        return {
            id: Crypto.randomUUID(),
            src,
            group,
        };
    }

    const spawnNext = () => {
        const group = Math.floor(Math.random() * shoppingListGroup.length);
        setCurrent(createItem(group));
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (shoppingListGroup.length) {
            spawnNext(); // start conveyor
        }
    }, [shoppingListGroup]);

    useEffect(() => {
        const initial = shoppingListGroup.flatMap((group, idx) =>
            group.map((src) => ({
                id: Crypto.randomUUID(), // ✅ Expo-native UUID
                src,
                group: idx,
            }))
        );
        setQueue(initial);
    }, [shoppingListGroup]);

    if (!current) return null;

    return (
        <View style={styles.container}>
            <ConveyorItem
                key={current.id}
                item={current}
                duration={SPEED}
                onPress={(src) => {
                    const ok = onItemClick(src);
                    return ok;
                }}
                onDrop={() => {
                    onItemDrop(current.src);
                    spawnNext();
                }}
                onFinish={spawnNext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 320,
        backgroundColor: "#333",
        overflow: "hidden",
        borderRadius: 12,
    },
});
