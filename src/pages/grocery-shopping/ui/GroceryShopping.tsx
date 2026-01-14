import { useSession } from '@/app/ctx';
import { Text } from '@/components';
import { Container, TextStyle } from '@/shared';
import { useEffect, useMemo, useState } from 'react';
import { type ImageSourcePropType, View } from 'react-native';
import { Conveyor } from '../components/ConveyorList';
import { LivesTracker } from '../components/LivesTracker';
import { ProgressBar } from '../components/ProgressBar';
import { ShoppingListDrawer } from '../components/ShoppingListDrawer';
import styles from './styles';

export function GroceryShopping() {

    const textStyle = TextStyle();
    const { session } = useSession();

    const [firstLoad, setFirstLoad] = useState(true);

    const [gameStarted, setGameStarted] = useState(false);

    const [shoppingItems, setShoppingItems] = useState([
        {
            id: 'milk',
            icon: require("@/assets/icons/grocery-shopping/level-1/image1.png"),
            picked: false,
        },
        {
            id: 'bread',
            icon: require("@/assets/icons/grocery-shopping/level-1/image2.png"),
            picked: false,
        },
        {
            id: 'apple',
            icon: require("@/assets/icons/grocery-shopping/level-1/image3.png"),
            picked: false,
        },
        {
            id: 'banana',
            icon: require("@/assets/icons/grocery-shopping/level-1/image4.png"),
            picked: false,
        },
    ]);

    // ✅ Hard-coded conveyor groups
    const conveyorGroups = useMemo(
        () => [
            [
                require("@/assets/icons/grocery-shopping/level-1/image1.png"),
                require("@/assets/icons/grocery-shopping/level-1/image2.png"),
            ],
            [
                require("@/assets/icons/grocery-shopping/level-1/image3.png"),
                require("@/assets/icons/grocery-shopping/level-1/image4.png"),
            ],
        ],
        []
    );

    function handleItemClick(src: string | ImageSourcePropType) {
        console.log("Clicked item:", src);
        return true; // change to false to test ❌
    }

    function handleItemDrop(src: string | ImageSourcePropType) {
        console.log("Dropped item:", src);
        return true;
    }

    useEffect(() => {
        setFirstLoad(false);
    }, []);

    return (
        <Container gradientTheme='grocery-shopping'>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 16, justifyContent: 'space-evenly' }}>
                <ShoppingListDrawer
                    items={shoppingItems}
                    gameStarted={gameStarted}
                    onStart={() => setGameStarted(true)}
                />
            </View>
            <View style={{ justifyContent: 'center' }}>
                <View style={[styles.headerContainer]}>
                    <LivesTracker lives={3} avlLives={3} />
                    <Text font='plusJakartaBold' style={[textStyle.small, styles.demoTitle]}>Demo</Text>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 8, alignItems: 'center', padding: 8, flexDirection: 'row', gap: 8 }}>
                    <Text font='plusJakartaBold' style={[textStyle.smallBold, { marginBottom: 4 }]}>0/2</Text>
                    <ProgressBar progress={70} />
                </View>
            </View>
            {/* Conveyor in this below */}
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 16 }}>
                <Conveyor
                    shoppingListGroup={conveyorGroups}
                    onItemClick={handleItemClick}
                    onItemDrop={handleItemDrop}
                />
            </View>
        </Container>
    );
}
