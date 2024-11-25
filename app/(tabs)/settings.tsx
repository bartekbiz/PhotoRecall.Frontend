import {StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import React, {useEffect, useState} from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import {DropdownItemType} from "@/constants/Types";


export default function SettingsScreen() {
    const {themesDropdown, setThemesDropdown, yoloModelsDropdown, setYoloModelsDropdown} = useSettings();

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>

            <Dropdown
                items={themesDropdown}
                setItems={setThemesDropdown}
                title={"App themes"}
                isMultiselect={false}
            />

            <Dropdown
                items={yoloModelsDropdown}
                setItems={setYoloModelsDropdown}
                title={"Yolo models"}
                isMultiselect={true}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 2,
    },
});


