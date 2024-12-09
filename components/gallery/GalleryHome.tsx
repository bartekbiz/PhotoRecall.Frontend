import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image} from 'expo-image';
import type {GalleryAsset, NavParams} from '@/constants/Types';
import {ThemedView} from "@/components/ThemedView";
import Animated, {useAnimatedRef} from "react-native-reanimated";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import {useGallery} from "@/context/GalleryContext";
import {ThemedText} from "@/components/ThemedText";


const {height} = Dimensions.get('window');

export const GalleryHome = () => {
    const {isBottomToTop, paddingTop, galleryAssets} = useGallery()
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();
    const {navigate} = useNavigation<NavigationProp<NavParams>>();

    const onContentSizeChange = () => {
        if (isBottomToTop) {
            scrollRef.current?.scrollToEnd();
        }
    };

    const onPress = (index: number, assets: GalleryAsset[]) => {
        navigate('GalleryPhotoView', {index, assets});
    };

    return (
        <>
            {galleryAssets !== undefined ?
                <ThemedView style={styles.container}>
                    <Animated.ScrollView
                        ref={scrollRef}
                        scrollEventThrottle={16}
                        scrollIndicatorInsets={{bottom}}
                        contentContainerStyle={{paddingBottom: bottom}}
                        onContentSizeChange={onContentSizeChange}
                    >
                        <ThemedView style={[
                            styles.content,
                            isBottomToTop ? styles.contentBottomToTop : styles.contentTopToBottom,
                            isBottomToTop ? {paddingBottom: paddingTop} : {paddingTop: paddingTop}
                        ]}>
                            {galleryAssets.map((asset: GalleryAsset, index) => {
                                let uri = asset.localUri;

                                return (
                                    <TouchableWithoutFeedback
                                        key={uri}
                                        onPress={() => onPress(index, galleryAssets)}
                                    >
                                        <Image
                                            source={uri}
                                            style={[styles.image,
                                                {height: (height / galleryAssets.length) *
                                                        (galleryAssets.length / 10) * 1.5}
                                            ]}
                                        />
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </ThemedView>
                    </Animated.ScrollView>
                </ThemedView>
                :
                <ThemedView style={styles.loadingContainer}>
                    <ThemedText>Loading...</ThemedText>
                </ThemedView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '32.99%',
    },
    content: {
        flex: 1,
        padding: 0,
        gap: 2,
        overflow: 'hidden',
    },
    contentBottomToTop: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap-reverse',
        paddingTop: 36,
    },
    contentTopToBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 36,
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    }
});