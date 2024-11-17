import * as React from 'react';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import type {NavParams} from '@/constants/Types';
import {GalleryHome} from '@/components/gallery/GalleryHome'
import {GalleryPhotoView} from '@/components/gallery/GalleryPhotoView';

const Stack = createStackNavigator<NavParams>();

export const GalleryNavigator = () => {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name="GalleryHome"
                        component={GalleryHome}
                    />
                    <Stack.Screen
                        name="GalleryPhotoView"
                        component={GalleryPhotoView}
                        options={{
                            cardStyleInterpolator: ({current}) => ({
                                cardStyle: {
                                    opacity: current.progress,
                                },
                            }),
                            gestureEnabled: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
};
