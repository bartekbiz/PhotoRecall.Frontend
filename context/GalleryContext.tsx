import {createContext, useContext, useEffect, useState} from "react";
import usePhotos from "@/hooks/useUserPhotos";
import {GalleryAsset} from "@/constants/Types";


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
    filter: [],
    setFilter: (value: number[]) => {
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
    const [filter, setFilter] = useState<number[]>();
    const [filteredGalleryAssets, setFilteredGalleryAssets] = useState<GalleryAsset[]>([]);

    useEffect(() => {
        if (galleryAssets === undefined) return;

        if (filter === undefined) {
            setFilteredGalleryAssets(galleryAssets);
            return;
        }

        setFilteredGalleryAssets(galleryAssets.filter((a) => {
            for (let i = 0; i < filter.length; i++) {
                if (a.classes.includes(filter[i])) {
                    return true;
                }
            }

            return false;
        }));
    }, [galleryAssets, filter]);

    const value = {
        galleryAssets: filteredGalleryAssets,
        isPhotosPermission,
        isBottomToTop,
        setBottomToTop: (value: boolean) => setIsBottomToTop(value),
        paddingTop,
        setPaddingTop: (number: number) => setPaddingTop(number),
        isInPhotoMode,
        setIsInPhotoMode: (value: boolean) => setIsInPhotoMode(value),
        filter,
        setFilter,
    };

    return (
        //@ts-ignore
        <GalleryContext.Provider value={value}>
            {children}
        </GalleryContext.Provider>
    );
};
