import {DropdownItemType} from "@/constants/Types";
import {StyleSheet, useColorScheme} from "react-native";
import React, {useEffect, useState} from "react";
import * as Haptics from "expo-haptics";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import {Feather} from "@expo/vector-icons";
import {ThemedText} from "@/components/ThemedText";
import {TextStyles} from "@/constants/Common";
import {dropdownStyles} from "@/constants/Dropdown";

type DropdownItemProps = {
    item: DropdownItemType;
    onChangeSelection: (item: DropdownItemType) => void;
    isMultiselect: boolean;
};

export default function DropdownItem({item, onChangeSelection, isMultiselect}: DropdownItemProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const [_, setSelected] = useState<boolean>(item.selected)
    const [cancelSelect, setCancelSelect] = useState<boolean>(false)

    const onTouchEnd = () => {
        if (cancelSelect) return;

        if (!isMultiselect)
            item.selected = true
        else
            item.selected = !item.selected;

        onChangeSelection(item);
        setSelected(item.selected);

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <ThemedView
            style={[dropdownStyles.buttonCommon,
                {
                    paddingVertical: 8, backgroundColor: colorScheme === 'dark' ?
                        Colors.dark.field : Colors.light.field
                }
            ]}
            onTouchEnd={onTouchEnd}
            onTouchStart={() => setCancelSelect(false)}
            onTouchMove={() => setCancelSelect(true)}
        >
            <ThemedView style={{backgroundColor: 'transparent'}}>
                <ThemedText style={styles.itemTxtStyle}>{item.title}</ThemedText>
            </ThemedView>

            <ThemedView style={{backgroundColor: 'transparent'}}>
                {item.selected &&
                    <Feather
                        name={'check'}
                        style={[styles.itemIconStyle,
                            {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
                    />
                }
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    itemIconStyle: {
        fontSize: TextStyles.default.fontSize,
    },
    itemTxtStyle: {
        flex: 1,
    },
});