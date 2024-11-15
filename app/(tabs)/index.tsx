import '@/gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {GalleryNavigator} from "@/components/gallery/GalleryNavigator";

export default function PhotosScreen() {
    return (
        // <ParallaxScrollView>
        //     <ThemedView style={styles.titleContainer}>
        //         <ThemedText type="title">Photos</ThemedText>
        //     </ThemedView>
        // </ParallaxScrollView>

        <GalleryNavigator/>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
