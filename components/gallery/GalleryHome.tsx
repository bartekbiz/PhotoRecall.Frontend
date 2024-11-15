import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, useColorScheme, View,} from 'react-native';
import {Image} from 'expo-image';
import type {NavParams} from '@/constants/Types';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Colors} from "@/constants/Colors"
import {ThemedView} from "@/components/ThemedView";
import Animated, {useAnimatedRef, useScrollViewOffset} from "react-native-reanimated";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";

const {height} = Dimensions.get('window');

const getRandomSize = function () {
    const min = 400;
    const max = 800;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(30)
    .fill(0)
    .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

export const GalleryHome = () => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const {navigate} = useNavigation<NavigationProp<NavParams>>();

    return (
        <ThemedView style={styles.container}>
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
    image: {
        width: '49.7%',
        height: (height / images.length) * (images.length / 10) * 2,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0,
        gap: 2,
        overflow: 'hidden',
    },
});