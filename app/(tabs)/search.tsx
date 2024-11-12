import {StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

import ThemedSearchBar from "@/components/ThemedSearchBar";
import {useState} from "react";

export default function SearchScreen() {
    const [search, setSearch] = useState('');

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Search</ThemedText>
            </ThemedView>
            <ThemedSearchBar
                search={search}
                setSearch={setSearch}
                otherProps={{
                    placeholder: "Try searching dog..."
                }}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
