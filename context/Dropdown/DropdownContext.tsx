import {createContext, useContext, useEffect, useState} from "react";
import {LayoutRectangle} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";


interface IDropdownContext {
    isOpened: boolean,
    openClose: () => void,
    close: () => void,

    dropdownLayout: LayoutRectangle | undefined,
    setDropdownLayout: any,

    top: number,
}

export const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext);

export const useDropdown = () => {
    return useContext(DropdownContext);
};

export type DropdownProviderProps = {
    children: React.ReactNode;
};

export const DropdownProvider = ({children}: DropdownProviderProps) => {
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

    const value = {
        isOpened, openClose, close,
        dropdownLayout, setDropdownLayout,
        top,
    };

    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    );
};