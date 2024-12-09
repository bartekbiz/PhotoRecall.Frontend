import {createContext, useContext, useState} from "react";
import usePhotos from "@/hooks/usePhotos";


export const GalleryContext = createContext({
    galleryAssets: [],
    isPhotosPermission: false,
    isBottomToTop: true,
    setBottomToTop: (value: boolean) => {
    },
    paddingTop: 0,
    setPaddingTop: (number: number) => {
    },
    isInPhotoMode: false,
    setIsInPhotoMode: (value: boolean) => {
    },
});

export const useGallery = () => {
    return useContext(GalleryContext);
};

export const GalleryProvider = ({children}: { children: React.ReactNode; }) => {
    const {galleryAssets, isPhotosPermission} = usePhotos();
    const [isBottomToTop, setIsBottomToTop] = useState(true);
    const [paddingTop, setPaddingTop] = useState(0);
    const [isInPhotoMode, setIsInPhotoMode] = useState(false);

    const value = {
        galleryAssets,
        isPhotosPermission,
        isBottomToTop,
        setBottomToTop: (value: boolean) => setIsBottomToTop(value),
        paddingTop,
        setPaddingTop: (number: number) => setPaddingTop(number),
        isInPhotoMode,
        setIsInPhotoMode: (value: boolean) => setIsInPhotoMode(value),
    };

    return (
        //@ts-ignore
        <GalleryContext.Provider value={value}>
            {children}
        </GalleryContext.Provider>
    );
};
