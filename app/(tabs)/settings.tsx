import {StyleSheet} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import {AppTheme} from "@/constants/Enums";
import React from "react";
import ThemedDropdown from "@/components/ThemedDropdown";
import {DropdownItem} from "@/constants/Types";

const appThemes: DropdownItem[] = [
    {title: AppTheme[AppTheme.system], value: AppTheme.system},
    {title: AppTheme[AppTheme.dark], value: AppTheme.dark},
    {title: AppTheme[AppTheme.light], value: AppTheme.light},
];

export default function SettingsScreen() {
    const {appTheme, setAppTheme} = useSettings();

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>

            <ThemedDropdown
                data={appThemes}
                title={"App theme: "}
                currentItem={AppTheme[appTheme]}
                setItem={setAppTheme}
            />

            <Collapsible title="File-based routing">
                <ThemedText>
                    This app has two screens:{' '}
                    <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
                    <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
                </ThemedText>
                <ThemedText>
                    The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
                    sets up the tab navigator.
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/router/introduction">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 2,
    },
});


