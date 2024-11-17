import '@/gesture-handler';
import {StyleSheet} from 'react-native';
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
