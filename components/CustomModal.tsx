import {BlurView} from "expo-blur";
import React from "react";
import {StyleSheet} from "react-native";
import {ZIndexes} from "@/constants/Common";
import Modal from "react-native-modal";


export type CustomModalProps = {
    children: React.ReactNode;
    isVisible: boolean,
    close: () => void,
};

export default function CustomModal({children, isVisible, close}: CustomModalProps) {
    return (
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
            isVisible={isVisible}
            supportedOrientations={['portrait']}
            backdropTransitionOutTiming={0}
            coverScreen={true}
            style={{margin:0}}
        >{children}
        </Modal>
    );
}

const styles = StyleSheet.create({
    blurView: {
        flex: 1,
        zIndex: ZIndexes.modal.zIndex
    },
});