import {createContext, useContext, useState} from "react";

export const GalleryContext = createContext({
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
    const [isBottomToTop, setIsBottomToTop] = useState(true);
    const [paddingTop, setPaddingTop] = useState(0);
    const [isInPhotoMode, setIsInPhotoMode] = useState(false);

    const value = {
        isBottomToTop,
        setBottomToTop: (value: boolean) => setIsBottomToTop(value),
        paddingTop,
        setPaddingTop: (number: number) => setPaddingTop(number),
        isInPhotoMode,
        setIsInPhotoMode: (value: boolean) => setIsInPhotoMode(value),
    };

    return (
        <GalleryContext.Provider value={value}>
            {children}
        </GalleryContext.Provider>
    );
};
