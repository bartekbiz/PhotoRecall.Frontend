import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';

import ThemedSearchBar from "@/components/ThemedSearchBar";
import * as React from "react";
import {useEffect, useState} from "react";
import {GalleryNavigator} from "@/components/gallery/GalleryNavigator";
import TitleView from "@/components/TitleView";
import {GalleryProvider, useGallery} from "@/context/GalleryContext";
import {ThemedView} from "@/components/ThemedView";
import {BlurView} from "expo-blur";
import {BlurStyles} from "@/constants/Common"

export default function SearchScreenWrapper() {
    return (
        <GalleryProvider>
            <SearchScreen/>
        </GalleryProvider>
    );
}

function SearchScreen() {
    const [search, setSearch] = useState('');
    const {setBottomToTop, setPaddingTop, isInPhotoMode} = useGallery();

    useEffect(() => {
        setBottomToTop(false);
        setPaddingTop(234)
    }, []);

    return (
        <TitleView
            titleContent={<SearchTitle/>}
            titleBackground={<BlurView style={BlurStyles.blurredTop}/>}
            hideTitle={isInPhotoMode}
        >
            <ThemedView style={styles.container}>
                <GalleryNavigator/>
            </ThemedView>
        </TitleView>
    );
}

function SearchTitle() {
    const [search, setSearch] = useState('');

    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Search</ThemedText>

            <ThemedSearchBar
                search={search}
                setSearch={setSearch}
                additionalStyles={styles.searchBar}
                otherProps={{
                    placeholder: "Try searching dog..."
                }}
            />
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
    searchBar: {
        paddingTop: 16,
    }
});
