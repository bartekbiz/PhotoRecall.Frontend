import {SearchBar} from "react-native-elements";
import {StyleSheet, useColorScheme, type ViewProps} from "react-native";
import {Colors} from "@/constants/Colors";
import {useState} from "react";
import {string} from "prop-types";

export type ThemedSearchBarProps = {
    search: any;
    setSearch: (search: string) => void;
    otherProps?: any;
};

export default function ThemedSearchBar({search, setSearch, otherProps}: ThemedSearchBarProps) {
    const colorScheme = useColorScheme() ?? 'light';

    const updateSearch = (text: string) => {
        setSearch(text);
    };

    return (
        <SearchBar
            // @ts-ignore
            onChangeText={updateSearch}
            value={search}
            platform="default"
            containerStyle={styles.searchContainer}
            inputContainerStyle={colorScheme === 'dark' ?
                styles.searchInputContainerDark : styles.searchInputContainerLight}
            // placeholderTextColor="gray"
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingHorizontal: 0,
        paddingTop: 0,
        marginVertical: 10,
    },
    searchInputContainerLight: {
        backgroundColor: '#FFF',
        borderColor: Colors.light.border,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
    },
    searchInputContainerDark: {
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
});