import '@/gesture-handler';
import {StyleSheet} from 'react-native';
import {GalleryNavigator} from "@/components/gallery/GalleryNavigator";

export default function PhotosScreen() {
    return (
        <GalleryNavigator/>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
