import {createContext, useContext} from "react";
import {DropdownItemType, GalleryAsset} from "@/constants/Types";
import {DropdownProvider} from "@/context/Dropdown/DropdownContext";


interface IGalleryDropdownContext {
    asset: GalleryAsset;
}

export const GalleryDropdownContext = createContext<IGalleryDropdownContext>(
    {} as IGalleryDropdownContext);

export const useGalleryDropdown = () => {
    return useContext(GalleryDropdownContext);
};

export type GalleryDropdownProviderProps = {
    children: React.ReactNode;
    asset: GalleryAsset;
};

export const GalleryDropdownProvider = (
    {children, asset}: GalleryDropdownProviderProps) => {

    const value = {
        asset
    };

    return (
        <GalleryDropdownContext.Provider value={value}>
            <DropdownProvider>
                {children}
            </DropdownProvider>
        </GalleryDropdownContext.Provider>
    );
};