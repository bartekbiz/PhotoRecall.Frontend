import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import * as React from "react";


export default function BlurredTop() {
    return (
        <MaskedView
            style={styles.upperBlurContainer}
            maskElement={
                <LinearGradient
                    colors={['rgba(0, 0, 0, 1)', 'rgba(0,0,0, 0.9)',
                        'rgba(0,0,0, 0.8)', 'transparent']}
                    style={styles.upperBlur}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}/>
            }
        >
            <BlurView style={styles.upperBlur}/>
        </MaskedView>
    );
}

const styles = StyleSheet.create({
    upperBlurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '16%',
        zIndex: 1000,
    },
    upperBlur: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});