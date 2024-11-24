import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import React, {useState} from "react";
import {Modal, ScrollView, StyleSheet, useColorScheme,} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {Colors} from '@/constants/Colors'
import {FieldStyles, ScreenStyles, TextStyles, ZIndexes} from "@/constants/Common";
import {DropdownItemType} from "@/constants/Types";
import {BlurView} from "expo-blur";
import DropdownItem from "@/components/Dropdown/DropdownItem";
import {dropdownStyles} from "@/constants/Dropdown";
import ThemedDivider from "@/components/ThemedDivider";
import {useDropdown} from "@/hooks/useDropdown";


export type DropdownBaseProps = {
    data: DropdownItemType[];
    title: string;
    isMultiselect: boolean;
    // setData: (data: MultiselectItemType[]) => void;
};

export default function Dropdown({data, title, isMultiselect}: DropdownBaseProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const [items, setItems] = useState(data)

    const {
        isOpened, openClose, close,
        dropdownLayout, setDropdownLayout,
        top,
    } = useDropdown();

    const onChangeSelection = () => {
        if (isMultiselect) return;

        let newItems = items.map(x => x);
        newItems.forEach(x => x.selected = false);
        setItems(newItems);
    }

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

    const renderModal = () => {
        return (
            <>
                {isOpened && dropdownLayout !== undefined &&
                    <Modal
                        transparent={true}
                        onRequestClose={close}
                        animationType={'fade'}
                        visible={isOpened}
                    >
                        <BlurView
                            style={[styles.blurView, {width: '100%', height: '100%'}]}
                            onTouchStart={close}
                        />

                        <ThemedView
                            style={{
                                position: 'absolute',
                                top: top + dropdownLayout.y - 14,
                                left: 0,
                                width: '100%',
                                paddingHorizontal: ScreenStyles.items.padding,
                                backgroundColor: 'transparent'
                            }}
                        >
                            {renderButton({
                                    zIndex: ZIndexes.modalItem.zIndex
                                }
                            )}
                        </ThemedView>

                        <ThemedView style={styles.menuContainer}>
                            <ScrollView style={[styles.menuStyle,
                                {
                                    top: top + dropdownLayout.y + FieldStyles.common.height,
                                    left: dropdownLayout.x
                                },
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
                                                items={items}
                                                onChangeSelection={onChangeSelection}
                                            />

                                            {index !== items.length - 1 && <ThemedDivider/>}
                                        </ThemedView>
                                    );
                                })}
                            </ScrollView>
                        </ThemedView>

                    </Modal>
                }
            </>
        );
    }

    return (
        <>
            <ThemedView
                style={styles.container}
                onLayout={(event) => {
                    setDropdownLayout(event.nativeEvent.layout);
                }}
            >{renderButton()}
            </ThemedView>

            {renderModal()}
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: ZIndexes.modal.zIndex
    },
    menuContainer: {
        width: '100%',
        paddingHorizontal: ScreenStyles.items.padding,
    },
    menuStyle: {
        position: 'absolute',
        marginTop: 2,
        overflow: 'hidden',
        width: '100%',
        borderRadius: FieldStyles.common.borderRadius,
        zIndex: ZIndexes.modalItem.zIndex,
        maxHeight: FieldStyles.common.height * 6.5,
    },
});
