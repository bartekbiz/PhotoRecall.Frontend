import {createContext, useContext} from "react";
import {DropdownItemType} from "@/constants/Types";
import {DropdownProvider} from "@/context/Dropdown/DropdownContext";


interface IItemsDropdownContext {
    items: DropdownItemType[];
    setItems: (items: DropdownItemType[]) => void;
    title: string;
    isMultiselect: boolean;
}

export const ItemsDropdownContext = createContext<IItemsDropdownContext>({} as IItemsDropdownContext);

export const useItemsDropdown = () => {
    return useContext(ItemsDropdownContext);
};

export type ItemsDropdownProviderProps = {
    children: React.ReactNode;
    items: DropdownItemType[];
    setItems: (items: DropdownItemType[]) => void;
    title: string;
    isMultiselect: boolean;
};

export const ItemsDropdownProvider = (
    {children, items, setItems, title, isMultiselect}: ItemsDropdownProviderProps) => {

    const value = {
        items, setItems,
        title,
        isMultiselect,
    };

    return (
        <ItemsDropdownContext.Provider value={value}>
            <DropdownProvider>
                {children}
            </DropdownProvider>
        </ItemsDropdownContext.Provider>
    );
};