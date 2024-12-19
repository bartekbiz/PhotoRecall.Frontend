import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import React from "react";
import {StyleSheet, useColorScheme,} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {Colors} from '@/constants/Colors'
import {FieldStyles, ScreenStyles, TextStyles, ZIndexes} from "@/constants/Common";
import {DropdownItemType} from "@/constants/Types";
import {dropdownStyles} from "@/constants/Dropdown";
import ItemsDropdownModal from "@/components/dropdown/ItemsDropdownModal";
import {useDropdown} from "@/context/Dropdown/DropdownContext";
import {ItemsDropdownProvider, useItemsDropdown} from "@/context/Dropdown/ItemsDropdownContext";


export type DropdownBaseProps = {
    items: DropdownItemType[];
    setItems: (items: DropdownItemType[]) => void;
    title: string;
    isMultiselect: boolean;
};

export default function ItemsDropdown(
    {items, setItems, title, isMultiselect}: DropdownBaseProps) {

    return (
        <ItemsDropdownProvider
            items={items}
            setItems={setItems}
            title={title}
            isMultiselect={isMultiselect}
        >
            <Dropdown/>
        </ItemsDropdownProvider>
    );
}

function Dropdown() {
    const colorScheme = useColorScheme() ?? 'light';
    const {openClose, isOpened, setDropdownLayout} = useDropdown()
    const {title} = useItemsDropdown();

    const renderButton = (style?: any) => {
        return (
            <ThemedView
                style={[dropdownStyles.buttonCommon, {
                    borderRadius: FieldStyles.common.borderRadius,
                    backgroundColor: colorScheme === 'dark' ?
                        Colors.dark.field : Colors.light.field
                }, style
                ]}

                onTouchEnd={openClose}
            >
                <ThemedText style={styles.title}>{title}</ThemedText>

                <Entypo
                    name={isOpened ? 'chevron-thin-up' : 'chevron-thin-down'}
                    style={[styles.buttonArrowStyle,
                        {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
                />
            </ThemedView>
        );
    }

    return (
        <>
            <ThemedView
                style={styles.container}
                onLayout={(event: any) => {
                    setDropdownLayout(event.nativeEvent.layout);
                }}
            >{renderButton()}
            </ThemedView>

            <ItemsDropdownModal renderButton={renderButton}/>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        paddingBottom: FieldStyles.common.paddingBottom,
    },
    buttonArrowStyle: {
        fontSize: TextStyles.default.fontSize,
    },
    blurView: {
        flex: 1,
        zIndex: ZIndexes.modal.zIndex
    },
    menuStyle: {
        marginTop: ScreenStyles.items.gap,
        overflow: 'hidden',
        width: '100%',
        borderRadius: FieldStyles.common.borderRadius,
        zIndex: ZIndexes.modalItem.zIndex,
        maxHeight: FieldStyles.common.height * 6.5,
    },
});
