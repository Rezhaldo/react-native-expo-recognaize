import { HomeIcon } from '@/assets/icons';
import { Tabs } from "expo-router";
import { Fragment } from "react";

export default function TabLayout() {
    return (
        <Fragment>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        headerTitleAlign: 'left',
                        tabBarLabel: 'Home',
                        headerRightContainerStyle: { paddingRight: 10 },
                        tabBarIcon: ({ color }) => <HomeIcon fill={color} width={24} height={24} />,
                    }} />
            </Tabs>
        </Fragment>
    )
}