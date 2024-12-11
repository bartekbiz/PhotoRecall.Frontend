import {createContext, useContext, useEffect, useState} from "react";
import {GalleryAsset} from "@/constants/Types";
import useUserPhotos from "@/hooks/useUserPhotos";
import usePhotosAI from "@/hooks/usePhotosAI";
import {useSettings} from "@/context/SettingsContext";


export const PhotosContext = createContext({
    galleryAssets: [],
    isPhotosPermission: false,
});

export const usePhotos = () => {
    return useContext(PhotosContext);
};

export const PhotosProvider = ({children}: { children: React.ReactNode; }) => {
    const {yoloModelsDropdown} = useSettings()
    const {galleryAssets, setGalleryAssets, isPhotosPermission} = useUserPhotos();
    const [selectedModels, setSelectedModels] = useState<string[]>(["yolo11x.pt"])

    usePhotosAI({galleryAssets, setGalleryAssets, selectedModels});

    useEffect(() => {
        setSelectedModels(yoloModelsDropdown
            .filter(f => f.selected)
            .map(m => m.value));
    }, [yoloModelsDropdown]);

    const value = {
        galleryAssets,
        isPhotosPermission,
    };

    return (
        //@ts-ignore
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    );
};
