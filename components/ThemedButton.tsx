import {Button, type TextProps, useColorScheme, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {FieldStyles} from "@/constants/Common";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";
import * as Haptics from "expo-haptics";


export type ThemedButtonProps = TextProps & {
    title: string;
    onPress?: () => void;
    roundCorners?: boolean;
    titleColor?: string;
    otherProps?: any;
};

export default function ThemedButton({title, onPress, roundCorners = true, titleColor, otherProps}: ThemedButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const [touchStart, setTouchStart] = useState<boolean>(false);

    const onTouchStart = () => {
        setTouchStart(true);
    }

    const onTouchEnd = () => {
        setTouchStart(false);

        if (onPress !== undefined)
            onPress();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    return (
        <ThemedView
            style={[styles.button, FieldStyles.common,
                {backgroundColor: colorScheme === 'dark' ?
                        touchStart ? Colors.dark.pressed : Colors.dark.field
                        :
                        touchStart ? Colors.light.pressed : Colors.light.field},
                !roundCorners && {borderRadius: 'none'}
            ]}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            {...otherProps}
        ><ThemedText style={titleColor && {color: titleColor}}>{title}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})