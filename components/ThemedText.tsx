import {StyleSheet, Text, type TextProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';
import {TextStyles} from "@/constants/Common";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
                               style,
                               lightColor,
                               darkColor,
                               type = 'default',
                               ...rest
                           }: ThemedTextProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return (
        <Text
            style={[
                {color},
                type === 'default' ? TextStyles.default : undefined,
                type === 'title' ? TextStyles.title : undefined,
                type === 'defaultSemiBold' ? TextStyles.defaultSemiBold : undefined,
                type === 'subtitle' ? TextStyles.subtitle : undefined,
                type === 'link' ? TextStyles.link : undefined,
                style,
            ]}
            {...rest}
        />
    );
}
