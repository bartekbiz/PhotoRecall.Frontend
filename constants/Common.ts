import {StyleSheet} from "react-native";

export const ScreenStyles = StyleSheet.create({
    items: {padding: 32}
})

export const ZIndexes = StyleSheet.create({
    modal: {zIndex: 1000},
    modalItem: {zIndex: 1001}
})

export const BlurStyles = StyleSheet.create({
    blurredTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
    },
});

export const FieldStyles = StyleSheet.create({
    common: {
        height: 48,
        borderRadius: 10,
        paddingBottom: 2,
        paddingHorizontal: 18
    }
})

export const TextStyles = StyleSheet.create({
    default: {
        fontSize: 17,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
})
