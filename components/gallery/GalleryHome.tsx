import * as React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import {Image} from 'expo-image';
import type {NavParams} from '@/constants/Types';
import ParallaxScrollView from "@/components/ParallaxScrollView";

const {height} = Dimensions.get('window');

const getRandomSize = function () {
    const min = 400;
    const max = 800;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(10)
    .fill(0)
    .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

export const GalleryHome = () => {
    const {navigate} = useNavigation<NavigationProp<NavParams>>();

    return (
        <View style={styles.container}>
            <ParallaxScrollView>
                {images.map((uri, index) => (
                    <TouchableWithoutFeedback
                        key={uri}
                        onPress={() => navigate('Photos', {index, images})}
                    >
                        <Image source={uri} style={styles.image}/>
                    </TouchableWithoutFeedback>
                ))}
            </ParallaxScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: '50%',
        height: (height / images.length) * 2,
    },
});