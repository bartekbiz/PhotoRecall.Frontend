import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {Platform} from "react-native";
import {Tabs} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TabBar from "@/components/ui/TabBar";
import {IconStyles} from "@/constants/Common";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
            tabBar={(props) => {
                return <TabBar {...props} />;
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Photos',
                    tabBarIcon: ({color}) =>
                        <MaterialIcons name="photo-library" size={IconStyles.normal.fontSize} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({color}) =>
                        <MaterialIcons name="image-search" size={IconStyles.normal.fontSize} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({color}) =>
                        <MaterialIcons name="settings" size={IconStyles.normal.fontSize} color={color}/>,
                }}
            />
        </Tabs>
    );
}
