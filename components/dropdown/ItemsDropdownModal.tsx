import {ThemedView} from "@/components/ThemedView";
import {FieldStyles, ScreenStyles, ZIndexes} from "@/constants/Common";
import {ScrollView, StyleSheet, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import DropdownItem from "@/components/dropdown/DropdownItem";
import ThemedDivider from "@/components/ThemedDivider";
import React from "react";
import {useDropdown} from "@/context/Dropdown/DropdownContext";
import CustomModal from "@/components/CustomModal";
import {DropdownItemType} from "@/constants/Types";
import {useItemsDropdown} from "@/context/Dropdown/ItemsDropdownContext";


export type DropdownModalProps = {
    renderButton: (style?: any) => React.ReactNode;
};

export default function ItemsDropdownModal({renderButton}: DropdownModalProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const {isOpened, dropdownLayout, close, top} = useDropdown()
    const {items, setItems, isMultiselect} = useItemsDropdown();

    const onChangeSelection = (item: DropdownItemType) => {
        setItems(items.map(x => {
            if (x.value === item.value) {
                x.selected = item.selected;
            }
            else if (!isMultiselect){
                x.selected = false;
            }

            return x;
        }));
    }

    return (
        <>
            {isOpened && dropdownLayout !== undefined &&
                <CustomModal
                    isVisible={isOpened}
                    close={close}
                >
                    <ThemedView style={[styles.content, {top: dropdownLayout.y + top - 14}]}>
                        {renderButton({zIndex: ZIndexes.modalItem.zIndex})}

                        <ScrollView style={[styles.menuStyle,
                            colorScheme === 'dark' ?
                                {backgroundColor: Colors.dark.field} :
                                {backgroundColor: Colors.light.field}
                        ]}
                        >
                            {items.map((item: any, index: number) => {
                                return (
                                    <ThemedView key={index}>
                                        <DropdownItem
                                            item={item}
                                            onChangeSelection={onChangeSelection}
                                            isMultiselect={isMultiselect}
                                        />

                                        {index !== items.length - 1 && <ThemedDivider/>}
                                    </ThemedView>
                                );
                            })}
                        </ScrollView>
                    </ThemedView>
                </CustomModal>
            }
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        left: 0,
        width: '100%',
        paddingHorizontal: ScreenStyles.items.padding,
        backgroundColor: 'transparent'
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
