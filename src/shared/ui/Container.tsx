import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, View } from "react-native";

export function Container({
    zeroPadding,
    children,
    gradientTheme
}: {
    zeroPadding?: boolean;
    children: React.ReactNode;
    gradientTheme?: 'trail-making' | 'matching-symbol' | 'airplane-game' | 'grocery-shopping';
}) {
    const padding = zeroPadding ? 0 : 20;
    let themeBackground = Colors.light.gradient;

    switch (gradientTheme) {
        case 'matching-symbol':
            themeBackground = Colors.light.matchingSymbolGradient;
            break;
        case 'trail-making':
            themeBackground = Colors.light.trailMakingGradient;
            break;
        case 'airplane-game':
            themeBackground = Colors.light.airplaneGameGradient;
            break;
        case 'grocery-shopping':
            themeBackground = Colors.light.groceryShoppingGradient;
            break;
        default:
            themeBackground = Colors.light.gradient;
            // use default gradient colors
            break;
    }

    return (
        <LinearGradient
            colors={[
                themeBackground.end,
                themeBackground.base,
                themeBackground.end,
            ]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, padding }}>
                    {children}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}
