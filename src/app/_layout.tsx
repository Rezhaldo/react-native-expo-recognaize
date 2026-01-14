import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SessionProvider } from './ctx';


SplashScreen.preventAutoHideAsync(); // keep splash screen visible until ready


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'PlusJakartaSans-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'PlusJakartaSans-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'PlusJakartaSans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        Lora: require('../assets/fonts/Lora-Regular.ttf'),
        'Lora-Medium': require('../assets/fonts/Lora-Medium.ttf'),
        'Lora-SemiBold': require('../assets/fonts/Lora-SemiBold.ttf'),
        'Lora-Bold': require('../assets/fonts/Lora-Bold.ttf'),
    });

    // Hide the splash screen once fonts are loaded
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // show a loading indicator while fonts are loading
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SessionProvider>
            <Stack
                initialRouteName="(app)"
                screenOptions={({ navigation }) => ({
                    headerShadowVisible: false,
                    headerBackTitle: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        // backgroundColor: Colors.light.background,
                    },
                    // headerLeft: () => <BackButton onPress={() => navigation?.goBack(null)} />,
                })}
            >
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SessionProvider>
    );
}
