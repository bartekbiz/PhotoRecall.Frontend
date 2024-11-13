import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { NavParams } from '@/constants/Types';
import { GalleryHome }  from '@/components/gallery/GalleryHome'
import { Photos } from '@/components/gallery/GalleryPhotos';

const Stack = createStackNavigator<NavParams>();

export const GalleryNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={GalleryHome} />
                <Stack.Screen
                    name="Photos"
                    component={Photos}
                    options={{
                        cardStyleInterpolator: ({ current }) => ({
                            cardStyle: {
                                opacity: current.progress,
                            },
                        }),
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};