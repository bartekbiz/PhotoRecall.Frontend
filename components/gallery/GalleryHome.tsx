import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, TouchableWithoutFeedback,} from 'react-native';
import {Image} from 'expo-image';
import type {NavParams} from '@/constants/Types';
import {ThemedView} from "@/components/ThemedView";
import Animated, {useAnimatedRef, useScrollViewOffset} from "react-native-reanimated";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import {ThemedText} from "@/components/ThemedText";
import BlurredTop from "@/components/gallery/BlurredTop";

const {height} = Dimensions.get('window');

const getRandomSize = function () {
    const min = 400;
    const max = 800;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(40)
    .fill(0)
    .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

export const GalleryHome = () => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const {navigate} = useNavigation<NavigationProp<NavParams>>();

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Photos</ThemedText>
            </ThemedView>

            <BlurredTop/>

            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{bottom}}
                contentContainerStyle={{paddingBottom: bottom}}>

                <ThemedView style={styles.content}>
                    {images.map((uri, index) => (
                        <TouchableWithoutFeedback
                            key={uri}
                            onPress={() => navigate('Photos', {index, images})}
                        >
                            <Image source={uri} style={styles.image}/>
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
    titleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '16%',
        zIndex: 1001,
        padding: 32,
        paddingTop: 77,
        backgroundColor: 'transparent',
        alignItems: 'center',
        gap: 8,
        flexDirection: 'row',
    },
    image: {
        width: '32.99%',
        height: (height / images.length) * (images.length / 10) * 1.5,
    },
    content: {
        flex: 1,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap-reverse',
        padding: 0,
        gap: 2,
        overflow: 'hidden',
        paddingBottom: 140,
        paddingTop: 36,
    },
});