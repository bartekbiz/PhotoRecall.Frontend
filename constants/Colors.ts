/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import {StyleSheet} from "react-native";

const tintColorLight = '#000000'; // '#0a7ea4'
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#11181C',
        textSecondary: '#a5a5a5',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        border: '#ECEDEE',
        field: '#E9ECEF'
    },
    dark: {
        text: '#ECEDEE',
        textSecondary: '#989898',
        background: '#151718',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        field: '#282b2b'
    },
};
