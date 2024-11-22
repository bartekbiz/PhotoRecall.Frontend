import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import * as React from "react";


export default function BlurredTop({style}: any) {
    return (
        <MaskedView
            style={style}
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
    upperBlur: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});