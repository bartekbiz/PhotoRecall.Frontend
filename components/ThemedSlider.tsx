import Slider from "@react-native-community/slider";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, type TextProps, useColorScheme} from "react-native";
import {FieldStyles, ScreenStyles} from "@/constants/Common";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import * as Haptics from "expo-haptics";

export type ThemedSliderProps = TextProps & {
    title: string;
    min: number;
    max: number;
    onValueChange: (value: number) => void;
    value: number
    otherProps?: any;
};

export default function ThemedSlider({title, min, max, onValueChange, value, otherProps}: ThemedSliderProps) {
    const colorScheme = useColorScheme() ?? 'light';

    const onTouch = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    return (
        <ThemedView
            style={[styles.container,
                {backgroundColor: colorScheme === 'dark' ?
                        Colors.dark.field : Colors.light.field}
            ]}
        >
            <ThemedText>
                {title}
            </ThemedText>

            <Slider
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                minimumTrackTintColor={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}
                maximumTrackTintColor={colorScheme === 'dark' ? Colors.dark.textSecondary : Colors.light.textSecondary}
                onValueChange={onValueChange}
                onTouchStart={onTouch}
                onTouchEnd={onTouch}
                value={value}
                {...otherProps}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        borderRadius: FieldStyles.common.borderRadius,
        paddingTop: 14,
        paddingBottom: 8,
        paddingHorizontal: FieldStyles.common.paddingHorizontal,
    },
    slider: {
        width: '100%'
    }
})