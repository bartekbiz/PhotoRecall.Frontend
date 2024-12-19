import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, useColorScheme,} from "react-native";
import React from "react";
import {ScreenStyles, ZIndexes} from "@/constants/Common";
import AntDesign from '@expo/vector-icons/AntDesign';
import {Colors} from "@/constants/Colors";
import {useDropdown} from "@/context/Dropdown/DropdownContext";
import GalleryDropdownModal from "@/components/gallery/dropdown/GalleryDropdownModal";
import {GalleryAsset} from "@/constants/Types";
import {GalleryDropdownProvider} from "@/context/Dropdown/GalleryDropdownContext";


export default function GalleryDropdown({asset}: { asset: GalleryAsset }) {
    return (
        <GalleryDropdownProvider asset={asset}>
            <Dropdown/>
        </GalleryDropdownProvider>
    );
}

function Dropdown() {
    const colorScheme = useColorScheme() ?? 'light';

    const {
        isOpened, openClose, close,
        dropdownLayout, setDropdownLayout,
        top,
    } = useDropdown();

    const renderButton = () => {
        return (
            <ThemedView
                style={[styles.button,
                    {backgroundColor: colorScheme === 'dark' ? Colors.dark.field : Colors.light.field}
                ]}
                onTouchEnd={openClose}
            >
                <AntDesign
                    name="ellipsis1"
                    style={[styles.icon,
                        {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
                />
            </ThemedView>
        );
    }

    return (
        <>
            <ThemedView
                style={[styles.container, {top: top + 10}]}
                onLayout={(event: any) => {
                    setDropdownLayout(event.nativeEvent.layout);
                }}
            >{renderButton()}
            </ThemedView>

            <GalleryDropdownModal renderButton={renderButton}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: ZIndexes.modal.zIndex,
        position: 'absolute',
        right: ScreenStyles.items.padding,
        backgroundColor: 'transparent'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 37,
        height: 37,
        borderRadius: 37/2,
    },
    icon: {
        fontSize: 24,
    },
})
