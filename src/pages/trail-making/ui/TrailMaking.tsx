import { useSession } from '@/app/ctx';
import { Text } from '@/components';
import { Container, TextStyle } from '@/shared';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TrailCanvas } from '../component/TrailCanvas';
import { useTrailGame } from '../hook/useTrailGame';
import styles from './styles';

export function TrailMaking() {

    const MOCK_POSITIONS = [
        { x: 40, y: 100 },
        { x: 200, y: 140 },
        { x: 100, y: 260 },
        { x: 260, y: 320 },
        { x: 80, y: 420 },
    ];
    const game = useTrailGame({
        pointCount: MOCK_POSITIONS.length,
        positions: MOCK_POSITIONS,
        onSuccess: () => console.log("✅ correct"),
        onError: () => console.log("❌ wrong"),
        onComplete: () => console.log("🎉 completed"),
    });



    const textStyle = TextStyle();
    const { session } = useSession();

    const [firstLoad, setFirstLoad] = useState(true);
    const [randomList, setRandomList] = useState<number[]>([]);
    const [value, setValue] = useState("");

    const handlePress = (num: string) => {
        setValue((prev) => prev + num);
    }

    useEffect(() => {

    }, []);

    return (
        <Container gradientTheme='trail-making'>
            <View style={styles.spacer} />
            <View style={styles.headerContainer}>
                <View />
                <Text font='plusJakartaBold' style={[textStyle.small, styles.demoTitle]}>Demo</Text>
            </View>
            <TrailCanvas game={game} positions={MOCK_POSITIONS} />
        </Container>
    );
}
