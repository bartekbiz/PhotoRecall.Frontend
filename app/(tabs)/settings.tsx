import {StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSettings} from "@/context/SettingsContext";
import React, {useEffect, useState} from "react";
import ItemsDropdown from "@/components/dropdown/ItemsDropdown";
import ThemedButton from "@/components/ThemedButton";
import ThemedSlider from "@/components/ThemedSlider";
import {usePhotos} from "@/context/PhotosContext";


export default function SettingsScreen() {
    const {
        themesDropdown, setThemesDropdown,
        models, setModels,
        refreshAssets,
        setRefreshAssets,
        agreeRatio, setAgreeRatio
    } = useSettings();
    const {galleryAssets} = usePhotos()

    const [processedLength, setProcessedLength] = useState(0);
    const [length, setLength] = useState(0);

    useEffect(() => {
        setProcessedLength(galleryAssets.filter(a => !a.isBeingProcessed).length);
        setLength(galleryAssets.length);
    }, [galleryAssets]);

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

            <ItemsDropdown
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

            {(processedLength !== length) ?
                <ThemedText>
                    Photos are being processed: {processedLength}/{length}.
                </ThemedText>
                :
                <ThemedText>
                    Processing is done.
                </ThemedText>
            }
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
});


