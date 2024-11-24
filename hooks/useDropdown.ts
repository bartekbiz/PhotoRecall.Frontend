import {useState} from "react";
import * as Haptics from "expo-haptics";
import {LayoutRectangle} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type useDropdownReturn = {
    isOpened: boolean,
    openClose: () => void,
    close: () => void,

    dropdownLayout: LayoutRectangle | undefined,
    setDropdownLayout: any,

    top: number,
}

export function useDropdown(): useDropdownReturn {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle | undefined>(undefined);
    const {top} = useSafeAreaInsets()

    const openClose = () => {
        setIsOpened(!isOpened);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }

    const close = () => {
        setIsOpened(false);
    }

    return {
        isOpened, openClose, close,
        dropdownLayout, setDropdownLayout,
        top,
    }
}