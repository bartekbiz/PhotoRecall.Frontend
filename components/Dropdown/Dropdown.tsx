import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import React from "react";
import {ScrollView, StyleSheet, useColorScheme,} from "react-native";
import Modal from "react-native-modal";
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
    items: DropdownItemType[];
    setItems: (items: DropdownItemType[]) => void;
    title: string;
    isMultiselect: boolean;
};

export default function Dropdown({items, setItems, title, isMultiselect}: DropdownBaseProps) {
    const colorScheme = useColorScheme() ?? 'light';

    const {
        isOpened, openClose, close,
        dropdownLayout, setDropdownLayout,
        top,
    } = useDropdown();

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
                        customBackdrop={
                        <BlurView
                            style={[styles.blurView]}
                            onTouchStart={close}
                        />}
                        backdropOpacity={1}
                        useNativeDriver={true}
                        hideModalContentWhileAnimating={true}
                        animationIn={"fadeIn"}
                        animationOut={'fadeOut'}
                        isVisible={isOpened}
                        supportedOrientations={['portrait']}
                        backdropTransitionOutTiming={0}
                        coverScreen={true}
                        style={{margin:0}}
                    >
                        <ThemedView style={{
                            position: 'absolute',
                            top: dropdownLayout.y + top - 14,
                            left: 0,
                            width: '100%',
                            paddingHorizontal: ScreenStyles.items.padding,
                            backgroundColor: 'transparent'
                        }}>
                            {renderButton({
                                    zIndex: ZIndexes.modalItem.zIndex
                                }
                            )}

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
                    </Modal>
                }
            </>
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
