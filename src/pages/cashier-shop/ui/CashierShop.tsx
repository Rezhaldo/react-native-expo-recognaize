import { useSession } from '@/app/ctx';
import { Text } from '@/components';
import { Container, TextStyle } from '@/shared';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CashierGame } from '../components/CashierGame';
import styles from './styles';

export function CashierShop() {

    const textStyle = TextStyle();
    const { session } = useSession();

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        setFirstLoad(false);
    }, []);

    return (
        <Container gradientTheme='grocery-shopping'>
            <View style={styles.spacer} />
            <View style={styles.headerContainer}>
                <Text font='plusJakartaBold' style={[textStyle.small, styles.demoTitle]}>Demo</Text>
                <Text font='plusJakartaBold' style={[textStyle.small, styles.demoTitle]}>Demo</Text>
            </View>
            <CashierGame budget={27.3} />
        </Container>
    );
}
