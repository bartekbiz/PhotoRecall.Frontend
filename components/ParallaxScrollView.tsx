import {StyleSheet} from 'react-native';
import Animated, {useAnimatedRef} from 'react-native-reanimated';

import {ThemedView} from '@/components/ThemedView';
import {useBottomTabOverflow} from '@/components/ui/TabBarBackground';
import {ScreenStyles} from "@/constants/Common";


export default function ParallaxScrollView({children}: any) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{bottom}}
                contentContainerStyle={{paddingBottom: bottom}}>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
    },
    content: {
        flex: 1,
        padding: ScreenStyles.items.padding,
        gap: ScreenStyles.items.gap,
        // overflow: 'hidden',
    },
});
