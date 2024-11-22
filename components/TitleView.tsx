import {ThemedView} from "@/components/ThemedView";
import * as React from "react";
import {StyleSheet} from "react-native";


export type TitleViewProps = {
    titleContent: any;
    titleBackground?: any;
    hideTitle?: boolean;
    children: any;
};

export default function TitleView({titleContent, titleBackground, hideTitle, children}: TitleViewProps) {
    return (
        <ThemedView style={styles.container}>
            {!hideTitle ?
                <ThemedView style={styles.titleContainer}>
                    <ThemedView style={styles.title}>
                        {titleContent}
                    </ThemedView>

                    {titleBackground}
                </ThemedView>
                :
                null
            }

            <ThemedView style={styles.container}>
                {children}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        paddingTop: 77,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        zIndex: 1001,
    },
});