import {Button, StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import React from "react";
import ThemedDropdown from "@/components/Dropdown/ThemedDropdown";
import ThemedButton from "@/components/ThemedButton";
import ThemedSlider from "@/components/ThemedSlider";


export default function SettingsScreen() {
    const {
        themesDropdown, setThemesDropdown,
        models, setModels,
        setRefreshAssets,
        agreeRatio, setAgreeRatio
    } = useSettings();

    const onRefresh = () => {
        setRefreshAssets(true);
    }

    const onAgreeRatioSlide = (value: number) => {
        setAgreeRatio(Math.round(value));
    }

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Settings</ThemedText>
            </ThemedView>

            <ThemedDropdown
                items={models}
                setItems={setModels}
                title={"Yolo models"}
                isMultiselect={true}
            />

            <ThemedSlider
                title={`Agree ratio: ${agreeRatio}%`}
                min={0}
                max={100}
                onValueChange={onAgreeRatioSlide}
                value={agreeRatio}
            />

            <ThemedButton
                onPress={onRefresh}
                title="Refresh Assets"
            />

            {/*<ThemedDropdown*/}
            {/*    items={themesDropdown}*/}
            {/*    setItems={setThemesDropdown}*/}
            {/*    title={"App theme"}*/}
            {/*    isMultiselect={false}*/}
            {/*/>*/}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
});


