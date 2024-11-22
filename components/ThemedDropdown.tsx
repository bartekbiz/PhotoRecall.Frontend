import {ThemedText} from "@/components/ThemedText";
import SelectDropdown from "react-native-select-dropdown";
import {ThemedView} from "@/components/ThemedView";
import React from "react";
import {StyleSheet, useColorScheme} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from "expo-haptics";
import {Colors} from '@/constants/Colors'
import {FieldStyles, TextStyles} from "@/constants/Common";

export type DropdownProps = {
    data: any[];
    title: string;
    currentItem: string;
    setItem: (item: any) => void;
};

export default function ThemedDropdown({data, title, currentItem, setItem}: DropdownProps) {
    const colorScheme = useColorScheme() ?? 'light';

    const onSelect = (selectedItem: any , index: number) => {
        setItem(selectedItem.value);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    return (
        <ThemedView
            style={[styles.container, {backgroundColor: colorScheme === 'dark' ?
                    Colors.dark.field : Colors.light.field}]}
        >
            <ThemedText style={styles.title}>{title}</ThemedText>
            <SelectDropdown
                data={data}
                onSelect={onSelect}

                renderButton={(selectedItem, isOpened) => {
                    return (
                        <ThemedView style={styles.dropdownButtonStyle}>
                            <ThemedText style={styles.dropdownButtonTxtStyle}>
                                {currentItem || 'select'}
                            </ThemedText>

                            <Entypo
                                name={isOpened ? 'chevron-thin-up' : 'chevron-thin-down'}
                                style={[styles.dropdownButtonArrowStyle,
                                    {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
                            />
                        </ThemedView>
                    );
                }}

                renderItem={(item, index, isSelected) => {
                    return (
                        <ThemedView
                            style={{...styles.dropdownItemStyle,
                            ...(isSelected && {backgroundColor: colorScheme === 'dark' ?
                                    Colors.dark.field : Colors.light.field
                            })}}
                        >
                            <ThemedText style={styles.dropdownItemTxtStyle}>{item.title}</ThemedText>
                        </ThemedView>
                    );
                }}

                showsVerticalScrollIndicator={false}
                dropdownStyle={colorScheme === 'dark' ?
                    styles.dropdownMenuStyleDark : styles.dropdownMenuStyleLight}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: FieldStyles.common.borderRadius,
        marginVertical: 10,
    },
    title: {
        paddingLeft: FieldStyles.common.paddingHorizontal,
        paddingBottom: FieldStyles.common.paddingBottom,
    },
    dropdownButtonStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        height: FieldStyles.common.height,
        borderRadius: FieldStyles.common.borderRadius,
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        fontSize: TextStyles.default.fontSize,
        paddingBottom: FieldStyles.common.paddingBottom,
        paddingRight: FieldStyles.common.paddingHorizontal,
    },
    dropdownButtonArrowStyle: {
        fontSize: TextStyles.default.fontSize,
        paddingRight: 7,
    },
    dropdownMenuStyleLight: {
        borderRadius: FieldStyles.common.borderRadius,
        backgroundColor: Colors.light.background,
    },
    dropdownMenuStyleDark: {
        borderRadius: FieldStyles.common.borderRadius,
        backgroundColor: Colors.dark.background,
    },
    dropdownItemStyle: {
        width: '100%',
        height: FieldStyles.common.height,
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
    },
});
