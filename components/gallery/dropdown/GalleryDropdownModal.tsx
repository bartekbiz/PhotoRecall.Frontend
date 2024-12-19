import {ThemedView} from "@/components/ThemedView";
import {FieldStyles, ScreenStyles, ZIndexes} from "@/constants/Common";
import {ScrollView, StyleSheet, useColorScheme, View} from "react-native";
import {Colors} from "@/constants/Colors";
import React, {useEffect} from "react";
import {useDropdown} from "@/context/Dropdown/DropdownContext";
import CustomModal from "@/components/CustomModal";
import {DropdownModalProps} from "@/components/dropdown/ItemsDropdownModal";
import ThemedDivider from "@/components/ThemedDivider";
import {dropdownStyles} from "@/constants/Dropdown";
import {ThemedText} from "@/components/ThemedText";
import {useGalleryDropdown} from "@/context/Dropdown/GalleryDropdownContext";
import ThemedButton from "@/components/ThemedButton";


export default function GalleryDropdownModal({renderButton}: DropdownModalProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const {isOpened, dropdownLayout, close} = useDropdown();
    const {asset} = useGalleryDropdown();

    const renderItem = (children: React.ReactNode, onTouchEnd?: () => void) => {
        return (
            <ThemedView
                style={[dropdownStyles.buttonCommon, styles.detectedClassList,
                    {backgroundColor: colorScheme === 'dark' ?
                            Colors.dark.field : Colors.light.field}
                ]}
                onTouchEnd={onTouchEnd}
            >{children}
            </ThemedView>
        );
    }

    return (
        <>
            {isOpened && dropdownLayout !== undefined &&
                <CustomModal
                    isVisible={isOpened}
                    close={close}
                >
                    <ThemedView style={[styles.container, {top: dropdownLayout.y}]}>
                        {renderButton({zIndex: ZIndexes.modalItem.zIndex})}

                        <ScrollView style={[styles.menuStyle,
                            colorScheme === 'dark' ?
                                {backgroundColor: Colors.dark.field} :
                                {backgroundColor: Colors.light.field}
                        ]}
                        >
                            {renderItem(
                                <ThemedText>
                                    Detected classes: [ {asset.classNames.join(", ")} ]
                                </ThemedText>
                            )}
                            <ThemedDivider/>
                            {renderItem(
                                <ThemedText>
                                    Processed by: [ {asset.processedBy.join(", ")} ]
                                </ThemedText>
                            )}
                            <ThemedDivider/>
                            <ThemedButton
                                title={"Delete"}
                                roundCorners={false}
                                titleColor={Colors.common.warning}
                            />
                        </ScrollView>
                    </ThemedView>
                </CustomModal>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: '100%',
        paddingHorizontal: ScreenStyles.items.padding,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
    },
    menuStyle: {
        marginTop: ScreenStyles.items.gap,
        overflow: 'hidden',
        maxWidth: '70%',
        borderRadius: FieldStyles.common.borderRadius,
        zIndex: ZIndexes.modalItem.zIndex,
        maxHeight: FieldStyles.common.height * 6.5,
    },
    detectedClassList: {
        height: 'auto',
        paddingVertical: dropdownStyles.optional.paddingVertical,
        paddingBottom: dropdownStyles.optional.paddingVertical + 2
    },
});
