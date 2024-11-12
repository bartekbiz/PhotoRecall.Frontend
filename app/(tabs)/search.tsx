import {Image, StyleSheet} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {SearchBar} from "react-native-elements";
import {useState} from "react";

export default function SearchScreen() {
    const [search, setSearch] = useState('');

    const updateSearch = (text: string) => {
        setSearch(text);
    };

    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Search</ThemedText>
            </ThemedView>
            <SearchBar
                placeholder="Try searching dog..."
                // @ts-ignore
                onChangeText={updateSearch}
                value={search}
                platform="default"
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInput}
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
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingHorizontal: 0,
        paddingTop: 0,
        marginVertical: 10,
    },
    searchInput: {
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
});
