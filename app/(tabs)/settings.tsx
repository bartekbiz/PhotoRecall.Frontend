import {Button, StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import React from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import ThemedButton from "@/components/ThemedButton";


export default function SettingsScreen() {
    const {themesDropdown, setThemesDropdown, models, setModels, setRefreshAssets} = useSettings();

    const onRefresh = () => {
        setRefreshAssets(true);
    }

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>

            <ThemedButton
                onPress={onRefresh}
                title="Refresh Assets"
            />

            <Dropdown
                items={models}
                setItems={setModels}
                title={"Yolo models"}
                isMultiselect={true}
            />

            <Dropdown
                items={themesDropdown}
                setItems={setThemesDropdown}
                title={"App theme"}
                isMultiselect={false}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
});


