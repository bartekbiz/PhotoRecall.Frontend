import {StyleSheet} from "react-native";
import {FieldStyles} from "@/constants/Common";

export const dropdownStyles = StyleSheet.create({
    buttonCommon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: FieldStyles.common.height,
        paddingHorizontal: 18,
    },
    optional: {
        paddingVertical: 11,
    }
})