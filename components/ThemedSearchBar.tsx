import {SearchBar} from "react-native-elements";
import {StyleSheet, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import {FieldStyles} from "@/constants/Common";

export type ThemedSearchBarProps = {
    search: any;
    setSearch: (search: string) => void;
    additionalStyles?: {};
    otherProps?: any;
};

export default function ThemedSearchBar({search, setSearch, additionalStyles, otherProps}: ThemedSearchBarProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <SearchBar
            onChangeText={setSearch}
            value={search}
            platform="default"
            containerStyle={[styles.searchContainer, additionalStyles]}
            inputContainerStyle={colorScheme === 'dark' ?
                styles.searchInputContainerDark : styles.searchInputContainerLight}
            placeholderTextColor={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}
            style={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}}
            searchIcon={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}}
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
        backgroundColor: Colors.light.field,
        color: Colors.light.text,
        borderRadius: FieldStyles.common.borderRadius,
    },
    searchInputContainerDark: {
        backgroundColor: Colors.dark.field,
        color: Colors.dark.text,
        borderRadius: FieldStyles.common.borderRadius,
    },
});