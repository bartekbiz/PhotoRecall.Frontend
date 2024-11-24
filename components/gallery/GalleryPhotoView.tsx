import {NavigationProp, RouteProp, useIsFocused, useNavigation, useRoute,} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View,} from 'react-native';
import AwesomeGallery, {GalleryRef, RenderItemInfo,} from 'react-native-awesome-gallery';
import {Image} from 'expo-image';
import {NavParams} from "@/constants/Types";
import * as Haptics from "expo-haptics";
import {Colors} from "@/constants/Colors";
import {useTabBar} from "@/context/TabBarContext";
import {useGallery} from "@/context/GalleryContext";

const renderItem = ({item, setImageDimensions,}: RenderItemInfo<{ path: string }>) => {
    return (
        <Image
            source={item.path}
            style={StyleSheet.absoluteFillObject}
            contentFit="contain"
            onLoad={(e: any) => {
                const {width, height} = e.source;
                setImageDimensions({width, height});
            }}
        />
    );
};

export const GalleryPhotoView = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const {setIsInPhotoMode} = useGallery()
    const {showTabBar, hideTabBar} = useTabBar();
    const {setParams, goBack} = useNavigation<NavigationProp<NavParams, 'GalleryPhotoView'>>();
    const isFocused = useIsFocused();
    const {params} = useRoute<RouteProp<NavParams, 'GalleryPhotoView'>>();
    const gallery = useRef<GalleryRef>(null);
    const statusBarAnimation = 'slide';

    const [isFocusMode, setIsFocusMode] = useState(false);

    const onIndexChange = useCallback(
        (index: number) => {
            isFocused && setParams({index});
        },
        [isFocused, setParams]
    );

    useEffect(() => {
        if (isFocusMode) {
            StatusBar.setHidden(true, statusBarAnimation);
            hideTabBar();
        } else {
            StatusBar.setHidden(false, statusBarAnimation);
            showTabBar();
        }
    }, [isFocusMode]);

    const onTap = () => {
        setIsFocusMode(!isFocusMode);
    };

    const onScaleStart = () => {
        setIsFocusMode(true);
    }

    const onScaleEnd = (scale: number) => {
        if (scale < 0.7) {
            setIsFocusMode(false);
            onClose();
        } else if (scale >= 0.7 && scale <= 1) {
            setIsFocusMode(false);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
            setIsFocusMode(true);
        }
    }

    const onDoubleTap = (toScale: any) => {
        if (toScale === 1) {
            setIsFocusMode(false);
        } else {
            setIsFocusMode(true);
        }
    }

    const onClose = () => {
        setIsInPhotoMode(false);
        goBack();
    }

    return (
        <View style={styles.container}>
            <AwesomeGallery
                ref={gallery}
                data={params.images.map((path: any) => ({path}))}
                keyExtractor={(item) => item.path}
                renderItem={renderItem}
                initialIndex={params.index}
                numToRender={3}
                doubleTapInterval={150}
                onIndexChange={onIndexChange}
                onSwipeToClose={onClose}
                onTap={onTap}
                loop
                onScaleStart={onScaleStart}
                onScaleEnd={onScaleEnd}
                onDoubleTap={onDoubleTap}
                style={colorScheme === 'dark' ?
                    styles.galleryDark : styles.galleryLight}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    galleryDark: {
        backgroundColor: Colors.dark.background,
    },
    galleryLight: {
        backgroundColor: Colors.light.background
    }
});
