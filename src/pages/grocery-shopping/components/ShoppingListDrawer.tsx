import { Text } from '@/components';
import { TextStyle } from '@/shared';
import { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

type ShoppingItem = {
    id: string;
    icon: ImageSourcePropType;
    picked: boolean;
};
type Props = {
    items: ShoppingItem[];
    gameStarted: boolean;
    onStart: () => void;
};

export function ShoppingListDrawer({
    items,
    gameStarted,
    onStart,
}: Props) {
    const textStyle = TextStyle();

    const [expanded, setExpanded] = useState(!gameStarted);
    const height = useSharedValue(gameStarted ? 72 : 420);
    const bodyHeight = useSharedValue(gameStarted ? 0 : 320);


    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        height.value = withTiming(expanded ? 420 : 72, { duration: 300 });
        bodyHeight.value = withTiming(
            expanded || !gameStarted ? 320 : 0,
            { duration: 300 }
        );
    }, [expanded, gameStarted]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
    }));

    const bodyStyle = useAnimatedStyle(() => ({
        height: bodyHeight.value,
        overflow: 'hidden',
    }));

    function handleToggle() {
        if (!gameStarted) {
            onStart();
            return;
        }
        setExpanded((v) => !v);
    }

    return (
        <Animated.View style={[styles.overlay, animatedStyle]}>
            <View style={styles.content}>
                {/* PRE-GAME CONTENT */}
                <Animated.View style={bodyStyle}>
                    {/* PRE-GAME CONTENT */}
                    {!gameStarted && (
                        <View style={styles.intro}>
                            <Text font="plusJakartaBold" style={textStyle.headerTitle}>
                                Shopping List
                            </Text>

                            <Text style={styles.helperText}>
                                Remember these items. You can refer back later.
                            </Text>
                        </View>
                    )}

                    {/* ITEMS */}
                    <View style={styles.itemsGrid}>
                        {items.map((item) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.item,
                                    item.picked && styles.itemPicked,
                                ]}
                            >
                                <Image
                                    source={item.icon}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                    </View>
                </Animated.View>
                {/* FOOTER */}
                <View style={styles.footer}>
                    {gameStarted ? (
                        <Pressable onPress={handleToggle}>
                            <Text style={styles.toggleText}>
                                Shopping List
                            </Text>
                            <Text style={[styles.toggleText, { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', color: '#FE8E44' }]}>
                                {expanded ? '▲' : '▼'}
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.readyBtn} onPress={handleToggle}>
                            <Text style={styles.readyText}>Ready</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        zIndex: 10,
        borderRadius: 20,
        backgroundColor: '#FDFDFD',
        overflow: 'hidden',
    },
    content: {
        padding: 16,
        flex: 1,
    },
    intro: {
        alignItems: 'center',
        marginBottom: 12,
    },
    helperText: {
        textAlign: 'center',
        color: '#777',
        marginTop: 6,
    },
    itemsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
        flex: 1,
    },
    item: {
        width: '45%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#eee',
        alignItems: 'center',
    },
    itemPicked: {
        opacity: 0.4,
    },
    footer: {
        paddingTop: 12,
        alignItems: 'center',
    },
    toggleText: {
        fontWeight: '600',
    },
    readyBtn: {
        width: '100%',
        height: 52,
        borderRadius: 12,
        backgroundColor: '#FE8E44',
        justifyContent: 'center',
        alignItems: 'center',
    },
    readyText: {
        color: '#fff',
        fontWeight: '700',
    },
    itemImage: {
        width: 64,
        height: 64,
    },
});