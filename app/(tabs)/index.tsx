import '@/gesture-handler';
import {StyleSheet} from 'react-native';
import {GalleryNavigator} from "@/components/gallery/GalleryNavigator";
import {ThemedView} from "@/components/ThemedView";
import * as React from "react";
import {useEffect} from "react";
import {ThemedText} from "@/components/ThemedText";
import {GalleryProvider, useGallery} from "@/context/GalleryContext";
import TitleView from "@/components/TitleView";
import {BlurView} from "expo-blur";
import {BlurStyles} from "@/constants/Common"

export default function Index() {
    return (
        <GalleryProvider>
            <PhotosScreen/>
        </GalleryProvider>
    );
}

function PhotosScreen() {
    const {setBottomToTop, setPaddingTop, isInPhotoMode} = useGallery();

    useEffect(() => {
        setBottomToTop(true);
        setPaddingTop(140);
    }, []);

    return (
        <TitleView
            titleContent={<PhotosTitle/>}
            titleBackground={<BlurView style={BlurStyles.blurredTop}/>}
            hideTitle={isInPhotoMode}
        >
            <ThemedView style={[styles.container]}>
                <GalleryNavigator/>
            </ThemedView>
        </TitleView>
    );
}

function PhotosTitle() {
    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Photos</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
