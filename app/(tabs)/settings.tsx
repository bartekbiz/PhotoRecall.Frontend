import {StyleSheet} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import {AppTheme} from "@/constants/Enums";
import React, {useState} from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import {DropdownItemType} from "@/constants/Types";
import {ToTitleCase} from "@/utils/Utils";

const appThemes: DropdownItemType[] = [
    {title: ToTitleCase(AppTheme[AppTheme.system]), value: AppTheme.system, selected: true},
    {title: ToTitleCase(AppTheme[AppTheme.dark]), value: AppTheme.dark, selected: false},
    {title: ToTitleCase(AppTheme[AppTheme.light]), value: AppTheme.light, selected: false},
];

const yoloModels: DropdownItemType[] = [
    {title: 'yolov7x.pt', value: 'yolov7x.pt', selected: true},
    {title: 'yolo11x.pt', value: 'yolo11x.pt', selected: true},
    {title: 'yolov9e.pt', value: 'yolov9e.pt', selected: true},
];

export default function SettingsScreen() {
    const {appTheme, setAppTheme} = useSettings();
    const [yoloModelsList, setYoloModelsList] = useState<DropdownItemType[]>(yoloModels);

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>

            <Dropdown
                data={appThemes}
                title={"App themes"}
                isMultiselect={false}
            />

            <Dropdown
                data={yoloModelsList}
                title={"Yolo models"}
                isMultiselect={true}
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
    titleContainer: {
        flexDirection: 'row',
        gap: 2,
    },
});


