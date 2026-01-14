import { BackButton } from "@/components";
import { TextStyle } from "@/shared";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../ctx";

export default function RootLayout() {

    // #region hooks
    const { session, isLoading, signOut } = useSession();
    const textStyle = TextStyle()
    // #endregion

    console.log('Session in RootLayout:', session);

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    return <Stack
        screenOptions={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitleStyle: textStyle.headerTitle,
            headerBackTitle: '',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: 'transparent',
            },
            headerLeft: () => <BackButton onPress={() => navigation?.goBack(null)} />,
        })}
    >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="matching-symbol" options={{ headerShown: false }} />
        <Stack.Screen name="trail-making" options={{ headerShown: false }} />
        <Stack.Screen name="airplane-game" options={{ headerShown: false }} />
        <Stack.Screen name="grocery-shopping" options={{ headerShown: false }} />
        <Stack.Screen name="cashier-shop" options={{ headerShown: false }} />
        <Stack.Screen
            name="create-patient"
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }} />
        <Stack.Screen
            name="patient-report"
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }} />
        <Stack.Screen
            name="new-assessment"
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }} />
        <Stack.Screen
            name="pre-test-instructions"
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }} />
        <Stack.Screen
            name="health-questionnaire"
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }} />
    </Stack>;
}