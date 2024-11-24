import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image} from 'expo-image';
import type {NavParams} from '@/constants/Types';
import {ThemedView} from "@/components/ThemedView";
import Animated, {useAnimatedRef} from "react-native-reanimated";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import {useGallery} from "@/context/GalleryContext";

const getRandomSize = function () {
    const min = 1000;
    const max = 2000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(40)
    .fill(0)
    .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

const {height} = Dimensions.get('window');

export const GalleryHome = () => {
    const {isBottomToTop, paddingTop, setIsInPhotoMode} = useGallery()
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();
    const {navigate} = useNavigation<NavigationProp<NavParams>>();

    const onContentSizeChange = () => {
        if (isBottomToTop) {
            scrollRef.current?.scrollToEnd();
        }
    };

    const onPress = (index: number, images: string[]) => {
        setIsInPhotoMode(true);
        navigate('GalleryPhotoView', {index, images});
    };

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{bottom}}
                contentContainerStyle={{paddingBottom: bottom}}
                onContentSizeChange={onContentSizeChange}>

                <ThemedView style={[
                    styles.content,
                    isBottomToTop ? styles.contentBottomToTop : styles.contentTopToBottom,
                    isBottomToTop ? {paddingBottom: paddingTop} : {paddingTop: paddingTop}
                ]}>
                    {images.map((path, index) => (
                        <TouchableWithoutFeedback
                            key={path}
                            onPress={() => onPress(index, images)}
                        >
                            <Image source={path} style={styles.image}/>
                        </TouchableWithoutFeedback>
                    ))}
                </ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '32.99%',
        height: (height / images.length) * (images.length / 10) * 1.5,
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
});