import {Divider} from "react-native-elements";
import React from "react";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";


export default function ThemedDivider() {
    const colorScheme = useColorScheme();

    return (
        <Divider color={colorScheme === 'dark' ? Colors.dark.divider : Colors.light.divider}/>
    );
}