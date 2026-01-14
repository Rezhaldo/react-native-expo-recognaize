import { useSession } from '@/app/ctx';
import BluePlaneIcon from '@/assets/icons/airplane-game/blue-plane.svg';
import OrangePlaneIcon from '@/assets/icons/airplane-game/orange-plane.svg';
import { Text } from '@/components';
import { Container, TextStyle } from '@/shared';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import styles from './styles';

type SpawnEdge = 'top' | 'bottom' | 'left' | 'right';

type PlaneConfig = {
    edge: SpawnEdge;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    rotation: number;
};

function getRandomEdge(): SpawnEdge {
    const edges: SpawnEdge[] = ['top', 'bottom', 'left', 'right'];
    return edges[Math.floor(Math.random() * edges.length)];
}

function getSpawnPosition(
    edge: SpawnEdge,
    width: number,
    height: number
): PlaneConfig {
    const OFFSET = 40; // half plane size (48 / 2 ≈ 24, padded)

    switch (edge) {
        case 'top': {
            const x = Math.random() * (width - OFFSET * 2) + OFFSET;
            return {
                edge,
                startX: x,
                startY: -OFFSET,
                endX: x,
                endY: height + OFFSET,
                rotation: 180,
            };
        }

        case 'bottom': {
            const x = Math.random() * (width - OFFSET * 2) + OFFSET;
            return {
                edge,
                startX: x,
                startY: height + OFFSET,
                endX: x,
                endY: -OFFSET,
                rotation: 0,
            };
        }

        case 'left': {
            const y = Math.random() * (height - OFFSET * 2) + OFFSET;
            return {
                edge,
                startX: -OFFSET,
                startY: y,
                endX: width + OFFSET,
                endY: y,
                rotation: 90,
            };
        }

        case 'right': {
            const y = Math.random() * (height - OFFSET * 2) + OFFSET;
            return {
                edge,
                startX: width + OFFSET,
                startY: y,
                endX: -OFFSET,
                endY: y,
                rotation: -90,
            };
        }
    }
}

function PlaneItem({
    config,
    isTarget,
    seed,
}: {
    config: PlaneConfig;
    isTarget: boolean;
    seed: boolean;
}) {
    const translateX = useSharedValue(config.startX);
    const translateY = useSharedValue(config.startY);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (config.edge === 'top' || config.edge === 'bottom') {
            translateY.value = withRepeat(
                withTiming(config.endY, { duration: 3500 }),
                -1,
                false
            );
        } else {
            translateX.value = withRepeat(
                withTiming(config.endX, { duration: 3500 }),
                -1,
                false
            );
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${config.rotation}deg` },
        ],
    }));

    const PlaneIcon = isTarget
        ? seed
            ? BluePlaneIcon
            : OrangePlaneIcon
        : seed
            ? OrangePlaneIcon
            : BluePlaneIcon;

    return (
        <Animated.View
            style={[styles.plane, animatedStyle, isTarget && styles.targetPlane]}
        >
            <PlaneIcon width={48} height={48} />
        </Animated.View>
    );
}

export function AirPlaneGame() {
    const textStyle = TextStyle();
    const { session } = useSession();

    const planes = 5;
    const target = 2;
    const seed = true;

    const [gameSize, setGameSize] = useState({ width: 0, height: 0 });
    const [planeConfigs, setPlaneConfigs] = useState<PlaneConfig[]>([]);

    useEffect(() => {
        if (!gameSize.width || !gameSize.height) return;

        setPlaneConfigs(
            Array.from({ length: planes }).map(() =>
                getSpawnPosition(getRandomEdge(), gameSize.width, gameSize.height)
            )
        );
    }, [gameSize.width, gameSize.height]);

    return (
        <Container gradientTheme="airplane-game">
            <View style={styles.spacer} />

            <View style={styles.headerContainer}>
                <Text font="plusJakartaBold" style={[textStyle.small, styles.demoTitle]}>
                    Demo
                </Text>
                <Text font="plusJakartaBold" style={[textStyle.small, styles.demoTitle]}>
                    Demo
                </Text>
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 16,
                    justifyContent: 'space-evenly',
                }}
            >
                <View
                    style={styles.gameArea}
                    onLayout={(e) => {
                        const { width, height } = e.nativeEvent.layout;
                        setGameSize({ width, height });
                    }}
                >
                    {planeConfigs.map((config, idx) => (
                        <PlaneItem
                            key={String(idx)}
                            config={config}
                            isTarget={idx === target}
                            seed={seed}
                        />
                    ))}
                </View>
            </View>
        </Container>
    );
}
